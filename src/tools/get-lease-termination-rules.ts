import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { legalCache } from '../cache.js';

const SUPPORTED_STATES = ['CA', 'TX', 'NY', 'FL', 'IL'];

// inputSchema = raw Zod SHAPE (NOT z.object())
const Schema = {
  state: z.string().default("CA").describe("US state code e.g. 'CA', 'TX', 'NY', 'FL', 'IL'. Default: CA"),
  city: z.string().optional().describe("City name for local overrides e.g. 'Los Angeles', 'Chicago', 'New York City'"),
  compare_states: z.boolean().default(false).describe("If true, return lease termination rules for all 5 covered states for comparison"),
};

export function registerTool(server: McpServer): void {
  server.tool(
    "get_lease_termination_rules",
    "Get lease termination rules including early termination, abandonment, military/DV protections for a US state. Returns: { state, landlord_duty_to_mitigate, military_termination_right, domestic_violence_termination, month_to_month_notice_days, abandonment_timeline_days, statute_reference, rule_summary, full_details, last_updated }",
    Schema,
    async ({ state, city, compare_states }) => {
      const stateCode = state.toUpperCase();

      // Compare mode: return all states
      if (compare_states) {
        const comparison = SUPPORTED_STATES.map(s => {
          const rules = legalCache.get('lease_termination', s);
          const stateRule = rules.find(r => !r.city_override);

          if (!stateRule) {
            return {
              state: s,
              error: "No data available for this state"
            };
          }

          return {
            state: s,
            landlord_duty_to_mitigate: stateRule.rule_details.landlord_duty_to_mitigate,
            military_termination_right: stateRule.rule_details.military_termination_right,
            domestic_violence_termination: stateRule.rule_details.domestic_violence_termination,
            month_to_month_tenant_notice_days: stateRule.rule_details.month_to_month_tenant_notice_days,
            month_to_month_landlord_notice_days: stateRule.rule_details.month_to_month_landlord_notice_days,
            abandonment_timeline_days: stateRule.rule_details.abandonment_timeline_days,
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
      const rules = legalCache.get('lease_termination', stateCode);

      if (rules.length === 0) {
        const error = {
          error: `No lease termination rules found for ${stateCode}`,
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
        const cityRule = legalCache.getWithCity('lease_termination', stateCode, city);
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
        early_termination_allowed: selectedRule.rule_details.early_termination_allowed,
        early_termination_penalty: selectedRule.rule_details.early_termination_penalty,
        landlord_duty_to_mitigate: selectedRule.rule_details.landlord_duty_to_mitigate,
        military_termination_right: selectedRule.rule_details.military_termination_right,
        military_notice_days: selectedRule.rule_details.military_notice_days,
        domestic_violence_termination: selectedRule.rule_details.domestic_violence_termination,
        domestic_violence_notice_days: selectedRule.rule_details.domestic_violence_notice_days,
        domestic_violence_documentation: selectedRule.rule_details.domestic_violence_documentation,
        month_to_month_tenant_notice_days: selectedRule.rule_details.month_to_month_tenant_notice_days,
        month_to_month_landlord_notice_days: selectedRule.rule_details.month_to_month_landlord_notice_days,
        fixed_term_auto_renewal_rules: selectedRule.rule_details.fixed_term_auto_renewal_rules,
        abandonment_definition: selectedRule.rule_details.abandonment_definition,
        abandonment_timeline_days: selectedRule.rule_details.abandonment_timeline_days,
        abandoned_property_rules: selectedRule.rule_details.abandoned_property_rules,
        subletting_default_rule: selectedRule.rule_details.subletting_default_rule,
        death_of_tenant_rules: selectedRule.rule_details.death_of_tenant_rules,
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
