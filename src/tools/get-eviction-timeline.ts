import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { legalCache } from '../cache.js';

const SUPPORTED_STATES = ['CA', 'TX', 'NY', 'FL', 'IL'];

// inputSchema = raw Zod SHAPE (NOT z.object())
const Schema = {
  state: z.string().default("CA").describe("US state code e.g. 'CA', 'TX', 'NY', 'FL', 'IL'. Default: CA"),
  city: z.string().optional().describe("City name for local overrides e.g. 'Los Angeles', 'Chicago', 'New York City'"),
  compare_states: z.boolean().default(false).describe("If true, return eviction timeline rules for all 5 covered states for comparison"),
};

export function registerTool(server: McpServer): void {
  server.tool(
    "get_eviction_timeline",
    "Get eviction notice periods and procedures for a US state. Returns: { state, nonpayment_notice_days, cure_period_allowed, just_cause_required, estimated_court_timeline, statute_reference, rule_summary, full_details, last_updated }",
    Schema,
    async ({ state, city, compare_states }) => {
      const stateCode = state.toUpperCase();

      // Compare mode: return all states
      if (compare_states) {
        const comparison = SUPPORTED_STATES.map(s => {
          const rules = legalCache.get('eviction_notice', s);
          const stateRule = rules.find(r => !r.city_override);

          if (!stateRule) {
            return {
              state: s,
              error: "No data available for this state"
            };
          }

          return {
            state: s,
            nonpayment_notice_days: stateRule.rule_details.nonpayment_notice_days,
            nonpayment_notice_type: stateRule.rule_details.nonpayment_notice_type,
            cure_period_allowed: stateRule.rule_details.cure_period_allowed,
            just_cause_required: stateRule.rule_details.just_cause_required,
            estimated_court_timeline_days: stateRule.rule_details.estimated_court_timeline_days,
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
      const rules = legalCache.get('eviction_notice', stateCode);

      if (rules.length === 0) {
        const error = {
          error: `No eviction notice rules found for ${stateCode}`,
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
        const cityRule = legalCache.getWithCity('eviction_notice', stateCode, city);
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
        nonpayment_notice_days: selectedRule.rule_details.nonpayment_notice_days,
        nonpayment_notice_type: selectedRule.rule_details.nonpayment_notice_type,
        cure_period_allowed: selectedRule.rule_details.cure_period_allowed,
        lease_violation_notice_days: selectedRule.rule_details.lease_violation_notice_days,
        lease_violation_cure_days: selectedRule.rule_details.lease_violation_cure_days,
        month_to_month_termination_days: selectedRule.rule_details.month_to_month_termination_days,
        unconditional_quit_available: selectedRule.rule_details.unconditional_quit_available,
        unconditional_quit_conditions: selectedRule.rule_details.unconditional_quit_conditions,
        just_cause_required: selectedRule.rule_details.just_cause_required,
        just_cause_details: selectedRule.rule_details.just_cause_details,
        court_filing_required: selectedRule.rule_details.court_filing_required,
        estimated_court_timeline_days: selectedRule.rule_details.estimated_court_timeline_days,
        tenant_right_to_cure: selectedRule.rule_details.tenant_right_to_cure,
        illegal_eviction_penalties: selectedRule.rule_details.illegal_eviction_penalties,
        special_protections: selectedRule.rule_details.special_protections,
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
