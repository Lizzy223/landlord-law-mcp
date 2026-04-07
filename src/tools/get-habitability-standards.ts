import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { legalCache } from '../cache.js';

const SUPPORTED_STATES = ['CA', 'TX', 'NY', 'FL', 'IL'];

// inputSchema = raw Zod SHAPE (NOT z.object())
const Schema = {
  state: z.string().default("CA").describe("US state code e.g. 'CA', 'TX', 'NY', 'FL', 'IL'. Default: CA"),
  city: z.string().optional().describe("City name for local overrides e.g. 'Los Angeles', 'Chicago', 'New York City'"),
  compare_states: z.boolean().default(false).describe("If true, return habitability standards for all 5 covered states for comparison"),
};

export function registerTool(server: McpServer): void {
  server.tool(
    "get_habitability_standards",
    "Get implied warranty of habitability requirements and tenant remedies for a US state. Returns: { state, implied_warranty_exists, repair_and_deduct_allowed, rent_withholding_allowed, repair_timeline_days, tenant_remedies, statute_reference, rule_summary, full_details, last_updated }",
    Schema,
    async ({ state, city, compare_states }) => {
      const stateCode = state.toUpperCase();

      // Compare mode: return all states
      if (compare_states) {
        const comparison = SUPPORTED_STATES.map(s => {
          const rules = legalCache.get('habitability', s);
          const stateRule = rules.find(r => !r.city_override);

          if (!stateRule) {
            return {
              state: s,
              error: "No data available for this state"
            };
          }

          return {
            state: s,
            implied_warranty_exists: stateRule.rule_details.implied_warranty_exists,
            repair_and_deduct_allowed: stateRule.rule_details.repair_and_deduct_allowed,
            rent_withholding_allowed: stateRule.rule_details.rent_withholding_allowed,
            repair_timeline_days: stateRule.rule_details.repair_timeline_days,
            tenant_remedies: stateRule.rule_details.tenant_remedies,
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
      const rules = legalCache.get('habitability', stateCode);

      if (rules.length === 0) {
        const error = {
          error: `No habitability standards found for ${stateCode}`,
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
        const cityRule = legalCache.getWithCity('habitability', stateCode, city);
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
        implied_warranty_exists: selectedRule.rule_details.implied_warranty_exists,
        statutory_basis: selectedRule.rule_details.statutory_basis,
        minimum_requirements: selectedRule.rule_details.minimum_requirements,
        heat_required: selectedRule.rule_details.heat_required,
        heat_minimum_temp: selectedRule.rule_details.heat_minimum_temp,
        hot_water_required: selectedRule.rule_details.hot_water_required,
        pest_control_responsibility: selectedRule.rule_details.pest_control_responsibility,
        mold_disclosure_required: selectedRule.rule_details.mold_disclosure_required,
        smoke_detector_required: selectedRule.rule_details.smoke_detector_required,
        carbon_monoxide_detector_required: selectedRule.rule_details.carbon_monoxide_detector_required,
        lead_paint_compliance: selectedRule.rule_details.lead_paint_compliance,
        repair_request_process: selectedRule.rule_details.repair_request_process,
        repair_timeline_days: selectedRule.rule_details.repair_timeline_days,
        rent_withholding_allowed: selectedRule.rule_details.rent_withholding_allowed,
        repair_and_deduct_allowed: selectedRule.rule_details.repair_and_deduct_allowed,
        repair_and_deduct_limit: selectedRule.rule_details.repair_and_deduct_limit,
        code_enforcement_available: selectedRule.rule_details.code_enforcement_available,
        tenant_remedies: selectedRule.rule_details.tenant_remedies,
        retaliation_protection: selectedRule.rule_details.retaliation_protection,
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
