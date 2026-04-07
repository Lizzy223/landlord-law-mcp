import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { legalCache } from '../cache.js';

const SUPPORTED_STATES = ['CA', 'TX', 'NY', 'FL', 'IL'];

// inputSchema = raw Zod SHAPE (NOT z.object())
const Schema = {
  state: z.string().default("CA").describe("US state code e.g. 'CA', 'TX', 'NY', 'FL', 'IL'. Default: CA"),
  city: z.string().optional().describe("City name for local overrides e.g. 'Los Angeles', 'Chicago', 'New York City'"),
  compare_states: z.boolean().default(false).describe("If true, return required disclosures for all 5 covered states for comparison"),
};

export function registerTool(server: McpServer): void {
  server.tool(
    "get_required_disclosures",
    "Get required landlord disclosures (lead paint, mold, flood, sex offenders, bed bugs) for a US state. Returns: { state, lead_paint_required, mold_disclosure_required, flood_zone_disclosure_required, bed_bug_history_required, landlord_identity_required, additional_disclosures, statute_reference, rule_summary, full_details, last_updated }",
    Schema,
    async ({ state, city, compare_states }) => {
      const stateCode = state.toUpperCase();

      // Compare mode: return all states
      if (compare_states) {
        const comparison = SUPPORTED_STATES.map(s => {
          const rules = legalCache.get('required_disclosures', s);
          const stateRule = rules.find(r => !r.city_override);

          if (!stateRule) {
            return {
              state: s,
              error: "No data available for this state"
            };
          }

          return {
            state: s,
            lead_paint_required: stateRule.rule_details.lead_paint_required,
            mold_disclosure_required: stateRule.rule_details.mold_disclosure_required,
            flood_zone_disclosure_required: stateRule.rule_details.flood_zone_disclosure_required,
            bed_bug_history_required: stateRule.rule_details.bed_bug_history_required,
            landlord_identity_disclosure_required: stateRule.rule_details.landlord_identity_disclosure_required,
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
      const rules = legalCache.get('required_disclosures', stateCode);

      if (rules.length === 0) {
        const error = {
          error: `No required disclosures found for ${stateCode}`,
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
        const cityRule = legalCache.getWithCity('required_disclosures', stateCode, city);
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
        lead_paint_required: selectedRule.rule_details.lead_paint_required,
        lead_paint_statute: selectedRule.rule_details.lead_paint_statute,
        mold_disclosure_required: selectedRule.rule_details.mold_disclosure_required,
        flood_zone_disclosure_required: selectedRule.rule_details.flood_zone_disclosure_required,
        sex_offender_registry_disclosure: selectedRule.rule_details.sex_offender_registry_disclosure,
        sex_offender_disclosure_details: selectedRule.rule_details.sex_offender_disclosure_details,
        bed_bug_history_required: selectedRule.rule_details.bed_bug_history_required,
        asbestos_disclosure_required: selectedRule.rule_details.asbestos_disclosure_required,
        shared_utility_disclosure_required: selectedRule.rule_details.shared_utility_disclosure_required,
        move_in_checklist_required: selectedRule.rule_details.move_in_checklist_required,
        landlord_identity_disclosure_required: selectedRule.rule_details.landlord_identity_disclosure_required,
        known_defects_disclosure_required: selectedRule.rule_details.known_defects_disclosure_required,
        demolition_plans_disclosure: selectedRule.rule_details.demolition_plans_disclosure,
        death_on_premises_disclosure: selectedRule.rule_details.death_on_premises_disclosure,
        smoking_policy_disclosure: selectedRule.rule_details.smoking_policy_disclosure,
        military_ordnance_disclosure: selectedRule.rule_details.military_ordnance_disclosure,
        additional_state_disclosures: selectedRule.rule_details.additional_state_disclosures,
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
