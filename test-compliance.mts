#!/usr/bin/env node

/**
 * CTX Protocol Data Broker Standard Compliance Test
 *
 * Verifies that landlordlaw-mcp server meets CTX Protocol requirements:
 * - outputSchema present on all tools (must be z.object())
 * - _meta present with required fields
 * - structuredContent in all responses
 * - Proper error handling
 * - City override support
 * - Compare states mode
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const SERVER_URL = 'http://localhost:3001/mcp';
const SUPPORTED_STATES = ['CA', 'TX', 'NY', 'FL', 'IL'];

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function test(name: string, passed: boolean, message: string) {
  results.push({ name, passed, message });
  const status = passed ? '✓ PASS' : '✗ FAIL';
  const color = passed ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${status}\x1b[0m ${name}`);
  if (!passed) {
    console.log(`  ${message}`);
  }
}

async function runTests() {
  console.log('\n🧪 CTX Protocol Data Broker Compliance Test\n');
  console.log(`Connecting to: ${SERVER_URL}\n`);

  let client: Client | null = null;

  try {
    // Initialize client
    const transport = new StreamableHTTPClientTransport(SERVER_URL);
    client = new Client({
      name: 'compliance-test-client',
      version: '1.0.0',
    }, {
      capabilities: {},
    });

    await client.connect(transport);
    console.log('✓ Connected to MCP server\n');

    // ========================================
    // TEST 1: List tools and verify metadata
    // ========================================
    console.log('📋 Testing tool registration and metadata...\n');

    const { tools } = await client.listTools();

    test(
      'Server exposes 8 tools',
      tools.length === 8,
      `Expected 8 tools, got ${tools.length}`
    );

    const expectedTools = [
      'get_deposit_rules',
      'get_eviction_timeline',
      'get_entry_requirements',
      'get_late_fee_rules',
      'get_rent_increase_rules',
      'get_habitability_standards',
      'get_lease_termination_rules',
      'get_required_disclosures',
    ];

    for (const expectedTool of expectedTools) {
      const tool = tools.find(t => t.name === expectedTool);
      test(
        `Tool ${expectedTool} is registered`,
        !!tool,
        `Tool ${expectedTool} not found`
      );

      if (tool) {
        // Check outputSchema
        const hasOutputSchema = !!(tool as any).outputSchema;
        test(
          `${expectedTool} has outputSchema`,
          hasOutputSchema,
          'outputSchema is undefined (CTX Protocol requires z.object())'
        );

        // Check _meta
        const meta = (tool as any)._meta;
        const hasMeta = !!meta;
        test(
          `${expectedTool} has _meta`,
          hasMeta,
          '_meta is undefined'
        );

        if (hasMeta) {
          test(
            `${expectedTool}._meta has surface`,
            meta.surface === 'both',
            `Expected surface="both", got "${meta.surface}"`
          );

          test(
            `${expectedTool}._meta has queryEligible`,
            meta.queryEligible === true,
            `Expected queryEligible=true, got ${meta.queryEligible}`
          );

          test(
            `${expectedTool}._meta has latencyClass`,
            meta.latencyClass === 'instant',
            `Expected latencyClass="instant", got "${meta.latencyClass}"`
          );

          test(
            `${expectedTool}._meta has pricing`,
            !!meta.pricing && meta.pricing.executeUsd === '0.001',
            `Expected pricing.executeUsd="0.001", got ${meta.pricing?.executeUsd}`
          );

          test(
            `${expectedTool}._meta has rateLimit`,
            !!meta.rateLimit &&
            meta.rateLimit.maxRequestsPerMinute === 120 &&
            meta.rateLimit.maxConcurrency === 10,
            `rateLimit missing or incorrect`
          );
        }
      }
    }

    console.log('\n');

    // ========================================
    // TEST 2: Call each tool with defaults
    // ========================================
    console.log('🔧 Testing tool execution with default args...\n');

    for (const toolName of expectedTools) {
      try {
        const response = await client.callTool({
          name: toolName,
          arguments: {},
        });

        test(
          `${toolName} executes with default args`,
          !!response,
          'No response received'
        );

        const hasStructuredContent = !!(response as any).structuredContent;
        test(
          `${toolName} returns structuredContent`,
          hasStructuredContent,
          'structuredContent is undefined (CTX Data Broker Standard requires it)'
        );

        if (hasStructuredContent) {
          const structured = (response as any).structuredContent;
          test(
            `${toolName} structuredContent has state field`,
            structured.state === 'CA',
            `Expected default state="CA", got "${structured.state}"`
          );
        }
      } catch (error) {
        test(
          `${toolName} executes with default args`,
          false,
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    console.log('\n');

    // ========================================
    // TEST 3: California deposit rules
    // ========================================
    console.log('🏛️  Testing California deposit rules...\n');

    try {
      const caResponse = await client.callTool({
        name: 'get_deposit_rules',
        arguments: { state: 'CA' },
      });

      const caData = (caResponse as any).structuredContent;

      test(
        'CA deposit rules: state is CA',
        caData.state === 'CA',
        `Expected CA, got ${caData.state}`
      );

      test(
        'CA deposit rules: max_deposit is "1 month\'s rent"',
        caData.max_deposit === "1 month's rent",
        `Expected "1 month's rent", got "${caData.max_deposit}"`
      );

      test(
        'CA deposit rules: return_deadline_days is 21',
        caData.return_deadline_days === 21,
        `Expected 21 days, got ${caData.return_deadline_days}`
      );

      test(
        'CA deposit rules: has statute_reference',
        caData.statute_reference?.includes('Cal. Civ. Code'),
        `Expected California statute reference, got "${caData.statute_reference}"`
      );

      test(
        'CA deposit rules: has last_updated timestamp',
        !!caData.last_updated,
        'last_updated is missing'
      );
    } catch (error) {
      test(
        'CA deposit rules query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 4: Los Angeles city override
    // ========================================
    console.log('🌆 Testing Los Angeles city override...\n');

    try {
      const laResponse = await client.callTool({
        name: 'get_deposit_rules',
        arguments: { state: 'CA', city: 'Los Angeles' },
      });

      const laData = (laResponse as any).structuredContent;

      test(
        'LA city override: state is CA',
        laData.state === 'CA',
        `Expected CA, got ${laData.state}`
      );

      test(
        'LA city override: city_override is "Los Angeles"',
        laData.city_override === 'Los Angeles',
        `Expected "Los Angeles", got "${laData.city_override}"`
      );

      test(
        'LA city override: rule_summary mentions Los Angeles',
        laData.rule_summary?.toLowerCase().includes('los angeles'),
        'Expected LA-specific rule summary'
      );
    } catch (error) {
      test(
        'LA city override query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 5: Compare states mode
    // ========================================
    console.log('📊 Testing compare_states mode...\n');

    try {
      const compareResponse = await client.callTool({
        name: 'get_deposit_rules',
        arguments: { compare_states: true },
      });

      const compareData = (compareResponse as any).structuredContent;

      test(
        'Compare mode: comparison_mode is true',
        compareData.comparison_mode === true,
        `Expected true, got ${compareData.comparison_mode}`
      );

      test(
        'Compare mode: returns all 5 states',
        compareData.states?.length === 5,
        `Expected 5 states, got ${compareData.states?.length}`
      );

      if (compareData.states) {
        const stateCodesReturned = compareData.states.map((s: any) => s.state);
        for (const expectedState of SUPPORTED_STATES) {
          test(
            `Compare mode: includes ${expectedState}`,
            stateCodesReturned.includes(expectedState),
            `${expectedState} not found in comparison`
          );
        }
      }

      test(
        'Compare mode: has last_updated',
        !!compareData.last_updated,
        'last_updated is missing'
      );
    } catch (error) {
      test(
        'Compare states mode',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 6: Invalid state error handling
    // ========================================
    console.log('❌ Testing invalid state error handling...\n');

    try {
      const errorResponse = await client.callTool({
        name: 'get_deposit_rules',
        arguments: { state: 'ZZ' },
      });

      const errorData = (errorResponse as any).structuredContent;

      test(
        'Invalid state: returns error field',
        !!errorData.error,
        'Error field is missing'
      );

      test(
        'Invalid state: lists supported_states',
        Array.isArray(errorData.supported_states) && errorData.supported_states.length === 5,
        `Expected array of 5 states, got ${errorData.supported_states?.length}`
      );

      test(
        'Invalid state: error mentions ZZ',
        errorData.error?.includes('ZZ'),
        'Error message should mention the invalid state code'
      );

      test(
        'Invalid state: provides helpful message',
        !!errorData.message,
        'Helpful message is missing'
      );
    } catch (error) {
      test(
        'Invalid state error handling',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 7: Other tool data validation
    // ========================================
    console.log('⚖️  Testing other tools for data accuracy...\n');

    try {
      const evictionResponse = await client.callTool({
        name: 'get_eviction_timeline',
        arguments: { state: 'TX' },
      });

      const txEviction = (evictionResponse as any).structuredContent;

      test(
        'TX eviction: nonpayment_notice_days is 3',
        txEviction.nonpayment_notice_days === 3,
        `Expected 3, got ${txEviction.nonpayment_notice_days}`
      );

      test(
        'TX eviction: just_cause_required is false',
        txEviction.just_cause_required === false,
        `Expected false (TX has no just cause requirement), got ${txEviction.just_cause_required}`
      );
    } catch (error) {
      test(
        'TX eviction timeline query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    try {
      const entryResponse = await client.callTool({
        name: 'get_entry_requirements',
        arguments: { state: 'FL' },
      });

      const flEntry = (entryResponse as any).structuredContent;

      test(
        'FL entry: notice_hours is 12',
        flEntry.notice_hours === 12,
        `Expected 12, got ${flEntry.notice_hours}`
      );

      test(
        'FL entry: emergency_entry_allowed is true',
        flEntry.emergency_entry_allowed === true,
        `Expected true, got ${flEntry.emergency_entry_allowed}`
      );
    } catch (error) {
      test(
        'FL entry requirements query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    try {
      const lateFeeResponse = await client.callTool({
        name: 'get_late_fee_rules',
        arguments: { state: 'IL', city: 'Chicago' },
      });

      const chicagoLateFee = (lateFeeResponse as any).structuredContent;

      test(
        'Chicago late fees: city_override is "Chicago"',
        chicagoLateFee.city_override === 'Chicago',
        `Expected "Chicago", got "${chicagoLateFee.city_override}"`
      );

      test(
        'Chicago late fees: grace_period_days is 5',
        chicagoLateFee.grace_period_days === 5,
        `Expected 5, got ${chicagoLateFee.grace_period_days}`
      );

      test(
        'Chicago late fees: late_fee_cap mentions formula',
        chicagoLateFee.late_fee_cap?.includes('$10'),
        `Expected Chicago's specific formula, got "${chicagoLateFee.late_fee_cap}"`
      );
    } catch (error) {
      test(
        'Chicago late fee rules query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 10: Rent increase rules - California
    // ========================================
    console.log('📈 Testing rent increase rules...\n');

    try {
      const caRentResponse = await client.callTool({
        name: 'get_rent_increase_rules',
        arguments: { state: 'CA' },
      });

      const caRentData = (caRentResponse as any).structuredContent;

      test(
        'CA rent increase: rent_control_exists is true',
        caRentData.rent_control_exists === true,
        `Expected true (AB 1482), got ${caRentData.rent_control_exists}`
      );

      test(
        'CA rent increase: has max_annual_increase',
        !!caRentData.max_annual_increase,
        'max_annual_increase is missing'
      );

      test(
        'CA rent increase: has statute_reference',
        caRentData.statute_reference?.includes('Cal. Civ. Code'),
        `Expected CA statute reference, got "${caRentData.statute_reference}"`
      );
    } catch (error) {
      test(
        'CA rent increase query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test Texas rent control (should be false - TX prohibits rent control)
    try {
      const txRentResponse = await client.callTool({
        name: 'get_rent_increase_rules',
        arguments: { state: 'TX' },
      });

      const txRentData = (txRentResponse as any).structuredContent;

      test(
        'TX rent increase: rent_control_exists is false',
        txRentData.rent_control_exists === false,
        `Expected false (TX prohibits rent control), got ${txRentData.rent_control_exists}`
      );
    } catch (error) {
      test(
        'TX rent increase query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test NYC city override
    try {
      const nycRentResponse = await client.callTool({
        name: 'get_rent_increase_rules',
        arguments: { state: 'NY', city: 'New York City' },
      });

      const nycRentData = (nycRentResponse as any).structuredContent;

      test(
        'NYC rent increase: has city_override',
        nycRentData.city_override === 'New York City',
        `Expected NYC override, got "${nycRentData.city_override}"`
      );

      test(
        'NYC rent increase: mentions rent-stabilized',
        nycRentData.rule_summary?.toLowerCase().includes('rent-stabilized') ||
        nycRentData.rule_summary?.toLowerCase().includes('rgb'),
        'Expected rent-stabilized/RGB info in summary'
      );
    } catch (error) {
      test(
        'NYC rent increase query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 11: Habitability standards
    // ========================================
    console.log('🏠 Testing habitability standards...\n');

    try {
      const caHabResponse = await client.callTool({
        name: 'get_habitability_standards',
        arguments: { state: 'CA' },
      });

      const caHabData = (caHabResponse as any).structuredContent;

      test(
        'CA habitability: repair_and_deduct_allowed is true',
        caHabData.repair_and_deduct_allowed === true,
        `Expected true, got ${caHabData.repair_and_deduct_allowed}`
      );

      test(
        'CA habitability: implied_warranty_exists is true',
        caHabData.implied_warranty_exists === true,
        `Expected true, got ${caHabData.implied_warranty_exists}`
      );

      test(
        'CA habitability: has tenant_remedies',
        !!caHabData.tenant_remedies,
        'tenant_remedies is missing'
      );

      test(
        'CA habitability: heat_required is true',
        caHabData.heat_required === true,
        `Expected true, got ${caHabData.heat_required}`
      );
    } catch (error) {
      test(
        'CA habitability query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 12: Lease termination rules
    // ========================================
    console.log('📋 Testing lease termination rules...\n');

    try {
      const caLeaseResponse = await client.callTool({
        name: 'get_lease_termination_rules',
        arguments: { state: 'CA' },
      });

      const caLeaseData = (caLeaseResponse as any).structuredContent;

      test(
        'CA lease termination: landlord_duty_to_mitigate is true',
        caLeaseData.landlord_duty_to_mitigate === true,
        `Expected true, got ${caLeaseData.landlord_duty_to_mitigate}`
      );

      test(
        'CA lease termination: domestic_violence_termination is true',
        caLeaseData.domestic_violence_termination === true,
        `Expected true, got ${caLeaseData.domestic_violence_termination}`
      );

      test(
        'CA lease termination: military_termination_right is true',
        caLeaseData.military_termination_right === true,
        `Expected true (SCRA), got ${caLeaseData.military_termination_right}`
      );

      test(
        'CA lease termination: has abandonment_timeline_days',
        typeof caLeaseData.abandonment_timeline_days === 'number',
        `Expected number, got ${typeof caLeaseData.abandonment_timeline_days}`
      );
    } catch (error) {
      test(
        'CA lease termination query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 13: Required disclosures
    // ========================================
    console.log('📜 Testing required disclosures...\n');

    try {
      const caDiscResponse = await client.callTool({
        name: 'get_required_disclosures',
        arguments: { state: 'CA' },
      });

      const caDiscData = (caDiscResponse as any).structuredContent;

      test(
        'CA disclosures: lead_paint_required is true',
        caDiscData.lead_paint_required === true,
        `Expected true (federal requirement), got ${caDiscData.lead_paint_required}`
      );

      test(
        'CA disclosures: mold_disclosure_required is true',
        caDiscData.mold_disclosure_required === true,
        `Expected true, got ${caDiscData.mold_disclosure_required}`
      );

      test(
        'CA disclosures: bed_bug_history_required is true',
        caDiscData.bed_bug_history_required === true,
        `Expected true (AB 551), got ${caDiscData.bed_bug_history_required}`
      );

      test(
        'CA disclosures: has additional_state_disclosures',
        !!caDiscData.additional_state_disclosures,
        'additional_state_disclosures is missing'
      );
    } catch (error) {
      test(
        'CA disclosures query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test Chicago RLTO disclosures
    try {
      const chicagoDiscResponse = await client.callTool({
        name: 'get_required_disclosures',
        arguments: { state: 'IL', city: 'Chicago' },
      });

      const chicagoDiscData = (chicagoDiscResponse as any).structuredContent;

      test(
        'Chicago disclosures: has city_override',
        chicagoDiscData.city_override === 'Chicago',
        `Expected Chicago override, got "${chicagoDiscData.city_override}"`
      );

      test(
        'Chicago disclosures: move_in_checklist_required is true',
        chicagoDiscData.move_in_checklist_required === true,
        `Expected true (RLTO requirement), got ${chicagoDiscData.move_in_checklist_required}`
      );

      test(
        'Chicago disclosures: bed_bug_history_required is true',
        chicagoDiscData.bed_bug_history_required === true,
        `Expected true, got ${chicagoDiscData.bed_bug_history_required}`
      );
    } catch (error) {
      test(
        'Chicago disclosures query',
        false,
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log('\n');

    // ========================================
    // TEST 14: Invalid state error handling
    // ========================================
    console.log('❌ Testing error handling for invalid states...\n');

    const newToolsToTest = [
      'get_rent_increase_rules',
      'get_habitability_standards',
      'get_lease_termination_rules',
      'get_required_disclosures',
    ];

    for (const toolName of newToolsToTest) {
      try {
        const errorResponse = await client.callTool({
          name: toolName,
          arguments: { state: 'ZZ' },
        });

        const errorData = (errorResponse as any).structuredContent;

        test(
          `${toolName} returns error for invalid state`,
          !!errorData.error,
          'Expected error field for invalid state "ZZ"'
        );

        test(
          `${toolName} error includes supported_states list`,
          Array.isArray(errorData.supported_states) &&
          errorData.supported_states.length === 5,
          `Expected 5 supported states, got ${errorData.supported_states?.length}`
        );
      } catch (error) {
        test(
          `${toolName} error handling`,
          false,
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    console.log('\n');

  } catch (error) {
    console.error('\n❌ Fatal error during test execution:');
    console.error(error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }

  // ========================================
  // Print Summary
  // ========================================
  console.log('═'.repeat(60));
  console.log('\n📊 TEST SUMMARY\n');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;

  console.log(`Total tests: ${total}`);
  console.log(`\x1b[32mPassed: ${passed}\x1b[0m`);
  console.log(`\x1b[31mFailed: ${failed}\x1b[0m`);
  console.log(`Success rate: ${((passed / total) * 100).toFixed(1)}%\n`);

  if (failed > 0) {
    console.log('❌ COMPLIANCE TEST FAILED\n');
    console.log('Failed tests:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  - ${r.name}`);
      console.log(`    ${r.message}`);
    });
    console.log('\n');
    process.exit(1);
  } else {
    console.log('✅ ALL COMPLIANCE TESTS PASSED\n');
    console.log('🎉 landlordlaw-mcp is CTX Protocol Data Broker Standard compliant!\n');
    process.exit(0);
  }
}

// Check if server is running
async function checkServerHealth() {
  try {
    const response = await fetch('http://localhost:3001/health');
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Server health: ${data.status}`);
    console.log(`Cache loaded: ${data.cache.total_rules} rules`);
    console.log(`Jurisdictions: ${data.cache.jurisdictions_covered}\n`);
    return true;
  } catch (error) {
    console.error('\n❌ Server is not running or not reachable at http://localhost:3001');
    console.error('Please start the server first: npm run dev\n');
    process.exit(1);
  }
}

// Main execution
console.log('🚀 Starting CTX Protocol Compliance Test...\n');

checkServerHealth()
  .then(() => runTests())
  .catch(error => {
    console.error('\n❌ Test execution failed:');
    console.error(error);
    process.exit(1);
  });
