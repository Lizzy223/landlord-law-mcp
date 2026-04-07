import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { legalCache } from '../cache.js';

const SUPPORTED_STATES = ['CA', 'TX', 'NY', 'FL', 'IL'];

// inputSchema = raw Zod SHAPE (NOT z.object())
const Schema = {
  state: z.string().default("CA").describe("US state code e.g. 'CA', 'TX', 'NY', 'FL', 'IL'. Default: CA"),
  city: z.string().optional().describe("City name for local overrides e.g. 'Los Angeles', 'San Francisco', 'New York City'"),
  compare_states: z.boolean().default(false).describe("If true, return rent increase rules for all 5 covered states for comparison"),
};

export function registerTool(server: McpServer): void {
  server.tool(
    "get_rent_increase_rules",
    "Get rent increase caps, notice periods, and rent control rules for a US state. Returns: { state, rent_control_exists, max_annual_increase, notice_required_days, exempt_properties, retaliation_protections, statute_reference, rule_summary, full_details, last_updated }",
    Schema,
    async ({ state, city, compare_states }) => {
      const stateCode = state.toUpperCase();

      // Compare mode: return all states
      if (compare_states) {
        const comparison = SUPPORTED_STATES.map(s => {
          const rules = legalCache.get('rent_increase', s);
          const stateRule = rules.find(r => !r.city_override);

          if (!stateRule) {
            return {
              state: s,
              error: "No data available for this state"
            };
          }

          return {
            state: s,
            rent_control_exists: stateRule.rule_details.rent_control_exists,
            max_annual_increase: stateRule.rule_details.max_annual_increase,
            notice_required_days: stateRule.rule_details.notice_required_days,
            exempt_properties: stateRule.rule_details.exempt_properties,
            statute_reference: stateRule.statute_reference,
            rule_summary: stateRule.rule_summary,
          };
        });

        const response = {
          comparison_mode: true,
          states: comparison,
          last_updated: legalCache.timestamp,
        };

        return {
          content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
          structuredContent: response,
        };
      }

      // Validate state
      if (!SUPPORTED_STATES.includes(stateCode)) {
        const error = {
          error: `State '${stateCode}' not supported`,
          supported_states: SUPPORTED_STATES,
          message: "Please use one of the supported state codes: CA, TX, NY, FL, IL"
        };

        return {
          content: [{ type: "text" as const, text: JSON.stringify(error, null, 2) }],
          structuredContent: error,
        };
      }

      // Query cache
      const rules = legalCache.get('rent_increase', stateCode);

      if (rules.length === 0) {
        const error = {
          error: `No rent increase rules found for ${stateCode}`,
          supported_states: SUPPORTED_STATES,
        };

        return {
          content: [{ type: "text" as const, text: JSON.stringify(error, null, 2) }],
          structuredContent: error,
        };
      }

      // Check for city override first
      let selectedRule = rules.find(r => !r.city_override); // Default to state-level

      if (city) {
        const cityRule = legalCache.getWithCity('rent_increase', stateCode, city);
        if (cityRule) {
          selectedRule = cityRule;
        }
      }

      if (!selectedRule) {
        selectedRule = rules[0]; // Fallback to first rule
      }

      const response = {
        state: stateCode,
        city_override: selectedRule.city_override || null,
        rent_control_exists: selectedRule.rule_details.rent_control_exists,
        max_annual_increase: selectedRule.rule_details.max_annual_increase,
        notice_required_days: selectedRule.rule_details.notice_required_days,
        local_ordinance_cap: selectedRule.rule_details.local_ordinance_cap,
        exempt_properties: selectedRule.rule_details.exempt_properties,
        just_cause_for_increase_required: selectedRule.rule_details.just_cause_for_increase_required,
        banking_allowed: selectedRule.rule_details.banking_allowed,
        vacancy_decontrol: selectedRule.rule_details.vacancy_decontrol,
        retaliation_protections: selectedRule.rule_details.retaliation_protections,
        statute_reference: selectedRule.statute_reference,
        rule_summary: selectedRule.rule_summary,
        full_details: selectedRule.rule_details,
        effective_date: selectedRule.effective_date,
        confidence: selectedRule.confidence,
        notes: selectedRule.notes,
        last_updated: legalCache.timestamp,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
        structuredContent: response,
      };
    }
  );
}
