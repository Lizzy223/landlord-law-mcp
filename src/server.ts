import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { createContextMiddleware } from '@ctxprotocol/sdk';
import { loadLegalData } from './ingestion.js';
import { legalCache } from './cache.js';
import { registerTool as registerDepositRules } from './tools/get-deposit-rules.js';
import { registerTool as registerEvictionTimeline } from './tools/get-eviction-timeline.js';
import { registerTool as registerEntryRequirements } from './tools/get-entry-requirements.js';
import { registerTool as registerLateFeeRules } from './tools/get-late-fee-rules.js';
import { registerTool as registerRentIncreaseRules } from './tools/get-rent-increase-rules.js';
import { registerTool as registerHabitabilityStandards } from './tools/get-habitability-standards.js';
import { registerTool as registerLeaseTerminationRules } from './tools/get-lease-termination-rules.js';
import { registerTool as registerRequiredDisclosures } from './tools/get-required-disclosures.js';

const PORT = process.env.PORT || 3001;

// Output schemas - MUST be z.object() for CTX Protocol compliance
const OUTPUT_SCHEMAS = {
  get_deposit_rules: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      max_deposit: z.string().optional(),
      return_deadline_days: z.number().optional(),
      itemized_deductions_required: z.boolean().optional(),
      interest_required: z.boolean().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    max_deposit: z.string().optional(),
    furnished_limit: z.string().optional(),
    unfurnished_limit: z.string().optional(),
    return_deadline_days: z.number().optional(),
    itemized_deductions_required: z.boolean().optional(),
    allowed_deductions: z.string().optional(),
    interest_required: z.boolean().optional(),
    interest_details: z.string().optional(),
    penalty_for_late_return: z.string().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),

  get_eviction_timeline: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      nonpayment_notice_days: z.number().optional(),
      nonpayment_notice_type: z.string().optional(),
      cure_period_allowed: z.boolean().optional(),
      just_cause_required: z.boolean().optional(),
      estimated_court_timeline_days: z.string().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    nonpayment_notice_days: z.number().optional(),
    nonpayment_notice_type: z.string().optional(),
    cure_period_allowed: z.boolean().optional(),
    lease_violation_notice_days: z.number().optional(),
    lease_violation_cure_days: z.number().optional(),
    month_to_month_termination_days: z.number().optional(),
    unconditional_quit_available: z.boolean().optional(),
    unconditional_quit_conditions: z.string().optional(),
    just_cause_required: z.boolean().optional(),
    just_cause_details: z.string().optional(),
    court_filing_required: z.boolean().optional(),
    estimated_court_timeline_days: z.string().optional(),
    tenant_right_to_cure: z.boolean().optional(),
    illegal_eviction_penalties: z.string().optional(),
    special_protections: z.string().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),

  get_entry_requirements: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      notice_required: z.boolean().optional(),
      notice_hours: z.number().optional(),
      notice_must_be_written: z.boolean().optional(),
      emergency_entry_allowed: z.boolean().optional(),
      entry_hours_restriction: z.string().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    notice_required: z.boolean().optional(),
    notice_hours: z.number().optional(),
    notice_must_be_written: z.boolean().optional(),
    permitted_entry_reasons: z.string().optional(),
    emergency_entry_allowed: z.boolean().optional(),
    entry_hours_restriction: z.string().optional(),
    tenant_can_deny_entry: z.boolean().optional(),
    penalty_for_illegal_entry: z.string().optional(),
    key_change_rules: z.string().optional(),
    showing_to_prospective_tenants: z.string().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),

  get_late_fee_rules: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      late_fee_cap: z.string().optional(),
      grace_period_days: z.number().optional(),
      grace_period_required_by_law: z.boolean().optional(),
      must_be_in_lease: z.boolean().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    late_fee_cap: z.string().optional(),
    grace_period_days: z.number().optional(),
    grace_period_required_by_law: z.boolean().optional(),
    must_be_in_lease: z.boolean().optional(),
    reasonableness_standard: z.string().optional(),
    nsf_check_fee_limit: z.string().optional(),
    late_fee_on_late_fee_allowed: z.boolean().optional(),
    special_rules: z.string().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),

  get_rent_increase_rules: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      rent_control_exists: z.boolean().optional(),
      max_annual_increase: z.string().optional(),
      notice_required_days: z.number().optional(),
      exempt_properties: z.string().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    rent_control_exists: z.boolean().optional(),
    max_annual_increase: z.string().optional(),
    notice_required_days: z.number().optional(),
    local_ordinance_cap: z.string().optional(),
    exempt_properties: z.string().optional(),
    just_cause_for_increase_required: z.boolean().optional(),
    banking_allowed: z.boolean().optional(),
    vacancy_decontrol: z.boolean().optional(),
    retaliation_protections: z.boolean().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),

  get_habitability_standards: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      implied_warranty_exists: z.boolean().optional(),
      repair_and_deduct_allowed: z.boolean().optional(),
      rent_withholding_allowed: z.boolean().optional(),
      repair_timeline_days: z.string().optional(),
      tenant_remedies: z.string().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    implied_warranty_exists: z.boolean().optional(),
    statutory_basis: z.string().optional(),
    minimum_requirements: z.string().optional(),
    heat_required: z.boolean().optional(),
    heat_minimum_temp: z.string().optional(),
    hot_water_required: z.boolean().optional(),
    pest_control_responsibility: z.string().optional(),
    mold_disclosure_required: z.boolean().optional(),
    smoke_detector_required: z.boolean().optional(),
    carbon_monoxide_detector_required: z.boolean().optional(),
    lead_paint_compliance: z.string().optional(),
    repair_request_process: z.string().optional(),
    repair_timeline_days: z.string().optional(),
    rent_withholding_allowed: z.boolean().optional(),
    repair_and_deduct_allowed: z.boolean().optional(),
    repair_and_deduct_limit: z.string().optional(),
    code_enforcement_available: z.boolean().optional(),
    tenant_remedies: z.string().optional(),
    retaliation_protection: z.boolean().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),

  get_lease_termination_rules: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      landlord_duty_to_mitigate: z.boolean().optional(),
      military_termination_right: z.boolean().optional(),
      domestic_violence_termination: z.boolean().optional(),
      month_to_month_tenant_notice_days: z.number().optional(),
      month_to_month_landlord_notice_days: z.number().optional(),
      abandonment_timeline_days: z.number().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    early_termination_allowed: z.boolean().optional(),
    early_termination_penalty: z.string().optional(),
    landlord_duty_to_mitigate: z.boolean().optional(),
    military_termination_right: z.boolean().optional(),
    military_notice_days: z.number().optional(),
    domestic_violence_termination: z.boolean().optional(),
    domestic_violence_notice_days: z.string().optional(),
    domestic_violence_documentation: z.string().optional(),
    month_to_month_tenant_notice_days: z.number().optional(),
    month_to_month_landlord_notice_days: z.number().optional(),
    fixed_term_auto_renewal_rules: z.string().optional(),
    abandonment_definition: z.string().optional(),
    abandonment_timeline_days: z.number().optional(),
    abandoned_property_rules: z.string().optional(),
    subletting_default_rule: z.string().optional(),
    death_of_tenant_rules: z.string().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),

  get_required_disclosures: z.object({
    comparison_mode: z.boolean().optional(),
    states: z.array(z.object({
      state: z.string(),
      lead_paint_required: z.boolean().optional(),
      mold_disclosure_required: z.boolean().optional(),
      flood_zone_disclosure_required: z.boolean().optional(),
      bed_bug_history_required: z.boolean().optional(),
      landlord_identity_disclosure_required: z.boolean().optional(),
      statute_reference: z.string().optional(),
      rule_summary: z.string().optional(),
      error: z.string().optional(),
    })).optional(),
    state: z.string().optional(),
    city_override: z.string().nullable().optional(),
    lead_paint_required: z.boolean().optional(),
    lead_paint_statute: z.string().optional(),
    mold_disclosure_required: z.boolean().optional(),
    flood_zone_disclosure_required: z.boolean().optional(),
    sex_offender_registry_disclosure: z.boolean().optional(),
    sex_offender_disclosure_details: z.string().optional(),
    bed_bug_history_required: z.boolean().optional(),
    asbestos_disclosure_required: z.boolean().optional(),
    shared_utility_disclosure_required: z.boolean().optional(),
    move_in_checklist_required: z.boolean().optional(),
    landlord_identity_disclosure_required: z.boolean().optional(),
    known_defects_disclosure_required: z.boolean().optional(),
    demolition_plans_disclosure: z.boolean().optional(),
    death_on_premises_disclosure: z.boolean().optional(),
    smoking_policy_disclosure: z.boolean().optional(),
    military_ordnance_disclosure: z.boolean().optional(),
    additional_state_disclosures: z.string().optional(),
    statute_reference: z.string().optional(),
    rule_summary: z.string().optional(),
    full_details: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    effective_date: z.string().optional(),
    confidence: z.enum(['statute', 'regulation', 'case_law']).optional(),
    notes: z.string().optional(),
    last_updated: z.string().optional(),
    error: z.string().optional(),
    supported_states: z.array(z.string()).optional(),
    message: z.string().optional(),
  }),
};

// CTX Protocol metadata for all tools
const TOOL_META_TEMPLATE = {
  surface: 'both' as const,
  queryEligible: true,
  latencyClass: 'instant' as const,
  pricing: {
    executeUsd: '0.001',
  },
  rateLimit: {
    maxRequestsPerMinute: 120,
    maxConcurrency: 10,
    cooldownMs: 500,
    notes: 'Reads from local pre-built legal database. No external API calls.',
  },
};

const TOOL_META: Record<string, typeof TOOL_META_TEMPLATE> = {
  get_deposit_rules: TOOL_META_TEMPLATE,
  get_eviction_timeline: TOOL_META_TEMPLATE,
  get_entry_requirements: TOOL_META_TEMPLATE,
  get_late_fee_rules: TOOL_META_TEMPLATE,
  get_rent_increase_rules: TOOL_META_TEMPLATE,
  get_habitability_standards: TOOL_META_TEMPLATE,
  get_lease_termination_rules: TOOL_META_TEMPLATE,
  get_required_disclosures: TOOL_META_TEMPLATE,
};

function createServer(): McpServer {
  const server = new McpServer(
    {
      name: 'landlordlaw-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register all tools
  registerDepositRules(server);
  registerEvictionTimeline(server);
  registerEntryRequirements(server);
  registerLateFeeRules(server);
  registerRentIncreaseRules(server);
  registerHabitabilityStandards(server);
  registerLeaseTerminationRules(server);
  registerRequiredDisclosures(server);

  // Inject _meta and outputSchema via _registeredTools loop (CTX Protocol requirement)
  const serverAny = server as any;
  if (serverAny._registeredTools && typeof serverAny._registeredTools === 'object') {
    for (const [name, tool] of Object.entries(serverAny._registeredTools)) {
      if (tool && typeof tool === 'object') {
        const meta = TOOL_META[name as keyof typeof TOOL_META];
        if (meta) (tool as any)._meta = meta;

        const outputSchema = OUTPUT_SCHEMAS[name as keyof typeof OUTPUT_SCHEMAS];
        if (outputSchema) (tool as any).outputSchema = outputSchema;
      }
    }
  }

  return server;
}

async function main() {
  // Initialize legal data cache BEFORE starting server
  await loadLegalData();

  const app = express();
  app.use(express.json());

  // CORS headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, mcp-session-id, Accept');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Session management (per-request transport pattern)
  const sessions = new Map<string, { transport: StreamableHTTPServerTransport; server: McpServer }>();

  // Context Protocol auth middleware (required for paid tools)
  app.use('/mcp', createContextMiddleware());

  // Health endpoint
  app.get('/health', (req, res) => {
    const allRules = legalCache.getAll();
    const jurisdictions = new Set<string>();

    for (const rule of allRules) {
      jurisdictions.add(rule.jurisdiction);
      if (rule.city_override) {
        jurisdictions.add(`${rule.jurisdiction}:${rule.city_override}`);
      }
    }

    res.json({
      status: 'ok',
      server: 'landlordlaw-mcp',
      version: '1.0.0',
      cache: {
        total_rules: allRules.length,
        jurisdictions_covered: jurisdictions.size,
        last_updated: legalCache.timestamp,
      },
      sessions: sessions.size,
      uptime_seconds: process.uptime(),
    });
  });

  // MCP endpoint with per-session transport
  app.post('/mcp', async (req, res) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;

    // Existing session
    if (sessionId && sessions.has(sessionId)) {
      const { transport } = sessions.get(sessionId)!;
      await transport.handleRequest(req, res, req.body);
      return;
    }

    // New session
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });
    const server = createServer();
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);

    const newSessionId = res.getHeader('mcp-session-id') as string | undefined;
    if (newSessionId) {
      sessions.set(newSessionId, { transport, server });
      transport.onclose = () => {
        console.log(`Session closed: ${newSessionId}`);
        sessions.delete(newSessionId);
      };
      console.log(`Session initialized: ${newSessionId}`);
    }
  });

  // DELETE /mcp - close session
  app.delete('/mcp', async (req, res) => {
    const sessionId = req.headers['mcp-session-id'] as string;
    if (sessionId && sessions.has(sessionId)) {
      const { transport } = sessions.get(sessionId)!;
      await transport.handleRequest(req, res, req.body);
      sessions.delete(sessionId);
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  });

  // Start Express server
  app.listen(PORT, () => {
    console.log(`LandlordLaw MCP server running on port ${PORT}`);
    console.log(`Health endpoint: http://localhost:${PORT}/health`);
    console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
    console.log(`Cache loaded: ${legalCache.getAll().length} rules`);
  });
}

main().catch(console.error);
