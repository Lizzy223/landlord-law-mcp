import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { legalCache } from '../cache.js';

const SUPPORTED_STATES = ['CA', 'TX', 'NY', 'FL', 'IL'];

// inputSchema = raw Zod SHAPE (NOT z.object())
const Schema = {
  state: z.string().default("CA").describe("US state code e.g. 'CA', 'TX', 'NY', 'FL', 'IL'. Default: CA"),
  city: z.string().optional().describe("City name for local overrides e.g. 'Los Angeles', 'Chicago', 'New York City'"),
  compare_states: z.boolean().default(false).describe("If true, return entry requirement rules for all 5 covered states for comparison"),
};

export function registerTool(server: McpServer): void {
  server.tool(
    "get_entry_requirements",
    "Get landlord entry notification requirements for a US state. Returns: { state, notice_required, notice_hours, permitted_reasons, emergency_entry_allowed, statute_reference, rule_summary, full_details, last_updated }",
    Schema,
    async ({ state, city, compare_states }) => {
      const stateCode = state.toUpperCase();

      // Compare mode: return all states
      if (compare_states) {
        const comparison = SUPPORTED_STATES.map(s => {
          const rules = legalCache.get('entry_requirements', s);
          const stateRule = rules.find(r => !r.city_override);

          if (!stateRule) {
            return {
              state: s,
              error: "No data available for this state"
            };
          }

          return {
            state: s,
            notice_required: stateRule.rule_details.notice_required,
            notice_hours: stateRule.rule_details.notice_hours,
            notice_must_be_written: stateRule.rule_details.notice_must_be_written,
            emergency_entry_allowed: stateRule.rule_details.emergency_entry_allowed,
            entry_hours_restriction: stateRule.rule_details.entry_hours_restriction,
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
      const rules = legalCache.get('entry_requirements', stateCode);

      if (rules.length === 0) {
        const error = {
          error: `No entry requirement rules found for ${stateCode}`,
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
        const cityRule = legalCache.getWithCity('entry_requirements', stateCode, city);
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
        notice_required: selectedRule.rule_details.notice_required,
        notice_hours: selectedRule.rule_details.notice_hours,
        notice_must_be_written: selectedRule.rule_details.notice_must_be_written,
        permitted_entry_reasons: selectedRule.rule_details.permitted_entry_reasons,
        emergency_entry_allowed: selectedRule.rule_details.emergency_entry_allowed,
        entry_hours_restriction: selectedRule.rule_details.entry_hours_restriction,
        tenant_can_deny_entry: selectedRule.rule_details.tenant_can_deny_entry,
        penalty_for_illegal_entry: selectedRule.rule_details.penalty_for_illegal_entry,
        key_change_rules: selectedRule.rule_details.key_change_rules,
        showing_to_prospective_tenants: selectedRule.rule_details.showing_to_prospective_tenants,
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
