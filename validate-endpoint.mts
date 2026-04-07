#!/usr/bin/env node
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const ENDPOINT_URL = process.env.ENDPOINT_URL || 'http://localhost:3001/mcp';

interface ToolValidation {
  name: string;
  description: string;
  inputSchema: any;
  outputSchema: any;
  _meta: any;
  schemaOk: boolean;
  schemaIssues: string[];
  smokeTestResult?: {
    pass: boolean;
    responseTime?: number;
    error?: string;
    responseContent?: any;
  };
}

async function main() {
  console.log('🔍 Step 2: Direct Endpoint Validation\n');
  console.log(`Connecting to: ${ENDPOINT_URL}\n`);

  // Step 2.1: Connection + Tool Discovery
  const client = new Client(
    {
      name: 'validator-client',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  const transport = new StreamableHTTPClientTransport(
    new URL(ENDPOINT_URL)
  );

  try {
    await client.connect(transport);
    console.log('✅ Connection successful');
    console.log(`Session ID: ${transport.sessionId}\n`);

    // List all tools
    const toolsList = await client.listTools();
    console.log(`📋 Discovered ${toolsList.tools.length} tools:\n`);

    const validations: ToolValidation[] = [];

    // Step 2.2: Schema Quality Audit
    for (const tool of toolsList.tools) {
      const validation: ToolValidation = {
        name: tool.name,
        description: tool.description || '',
        inputSchema: tool.inputSchema,
        outputSchema: (tool as any).outputSchema,
        _meta: (tool as any)._meta,
        schemaOk: true,
        schemaIssues: [],
      };

      // Check inputSchema
      if (!tool.inputSchema) {
        validation.schemaOk = false;
        validation.schemaIssues.push('Missing inputSchema');
      } else {
        const props = (tool.inputSchema as any).properties;
        if (!props || Object.keys(props).length === 0) {
          validation.schemaIssues.push('inputSchema has no properties');
        }

        // Check for descriptions, types, defaults, examples
        for (const [key, value] of Object.entries(props || {})) {
          const prop = value as any;
          if (!prop.description) {
            validation.schemaIssues.push(`inputSchema.${key} missing description`);
          }
          if (!prop.type && !prop.enum && !prop.anyOf && !prop.oneOf) {
            validation.schemaIssues.push(`inputSchema.${key} missing type`);
          }
        }
      }

      // Check outputSchema (CRITICAL for Data Broker Standard)
      if (!validation.outputSchema) {
        validation.schemaOk = false;
        validation.schemaIssues.push('❌ CRITICAL: Missing outputSchema (Data Broker Standard violation)');
      } else {
        const props = (validation.outputSchema as any).properties;
        if (!props || Object.keys(props).length === 0) {
          validation.schemaIssues.push('outputSchema has no properties');
        }
      }

      // Check _meta
      if (!validation._meta) {
        validation.schemaIssues.push('Missing _meta');
      } else {
        if (!validation._meta.surface) {
          validation.schemaIssues.push('_meta.surface not set');
        }
        if (validation._meta.queryEligible === undefined) {
          validation.schemaIssues.push('_meta.queryEligible not set');
        }
        if (!validation._meta.latencyClass) {
          validation.schemaIssues.push('_meta.latencyClass not set');
        }
        if (!validation._meta.pricing?.executeUsd) {
          validation.schemaIssues.push('_meta.pricing.executeUsd not set');
        }
        if (!validation._meta.rateLimit) {
          validation.schemaIssues.push('_meta.rateLimit not set');
        }
      }

      validations.push(validation);
    }

    // Print schema audit results
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('SCHEMA QUALITY AUDIT');
    console.log('═══════════════════════════════════════════════════════════════\n');

    for (const v of validations) {
      console.log(`Tool: ${v.name}`);
      console.log(`  Description: ${v.description.substring(0, 80)}...`);
      console.log(`  outputSchema: ${v.outputSchema ? '✅' : '❌ MISSING'}`);
      console.log(`  _meta: ${v._meta ? '✅' : '❌ MISSING'}`);
      if (v._meta) {
        console.log(`    - surface: ${v._meta.surface || '❌ missing'}`);
        console.log(`    - queryEligible: ${v._meta.queryEligible !== undefined ? v._meta.queryEligible : '❌ missing'}`);
        console.log(`    - latencyClass: ${v._meta.latencyClass || '❌ missing'}`);
        console.log(`    - pricing.executeUsd: ${v._meta.pricing?.executeUsd || '❌ missing'}`);
        console.log(`    - rateLimit: ${v._meta.rateLimit ? '✅' : '❌ missing'}`);
      }

      if (v.schemaIssues.length > 0) {
        console.log(`  ⚠️  Issues (${v.schemaIssues.length}):`);
        for (const issue of v.schemaIssues) {
          console.log(`    - ${issue}`);
        }
      } else {
        console.log(`  ✅ Schema quality: PASS`);
      }
      console.log('');
    }

    // Step 2.3: Smoke Test Every Tool
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('SMOKE TESTING ALL TOOLS');
    console.log('═══════════════════════════════════════════════════════════════\n');

    for (const v of validations) {
      // Generate sample input
      const sampleInput = generateSampleInput(v.inputSchema);
      console.log(`Testing: ${v.name}`);
      console.log(`  Input: ${JSON.stringify(sampleInput, null, 2).substring(0, 200)}`);

      const startTime = Date.now();
      try {
        const result = await client.callTool({
          name: v.name,
          arguments: sampleInput,
        });

        const responseTime = Date.now() - startTime;

        // Validate response
        const hasContent = result.content && result.content.length > 0;
        const firstContent = result.content[0];
        const hasText = firstContent && 'text' in firstContent && firstContent.text;

        let responseContent: any = null;
        if (hasText) {
          try {
            responseContent = JSON.parse((firstContent as any).text);
          } catch {
            responseContent = (firstContent as any).text;
          }
        }

        const pass = hasContent && hasText && !result.isError;

        v.smokeTestResult = {
          pass,
          responseTime,
          responseContent,
          error: result.isError ? JSON.stringify(result.content) : undefined,
        };

        console.log(`  ✅ Response time: ${responseTime}ms`);
        console.log(`  Content: ${hasContent ? '✅ has content' : '❌ empty'}`);
        console.log(`  Status: ${pass ? '✅ PASS' : '❌ FAIL'}`);

        if (responseContent) {
          console.log(`  Sample response: ${JSON.stringify(responseContent, null, 2).substring(0, 300)}...`);
        }

      } catch (error) {
        v.smokeTestResult = {
          pass: false,
          error: error instanceof Error ? error.message : String(error),
        };
        console.log(`  ❌ FAIL: ${v.smokeTestResult.error}`);
      }
      console.log('');
    }

    // Summary Table
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('VALIDATION SUMMARY');
    console.log('═══════════════════════════════════════════════════════════════\n');

    console.log('| Tool Name                      | Schema OK | Smoke Test | Query Ready | Execute Ready | Notes |');
    console.log('|--------------------------------|-----------|------------|-------------|---------------|-------|');

    for (const v of validations) {
      const schemaOk = v.schemaIssues.length === 0 ? '✅' : '❌';
      const smokeTest = v.smokeTestResult?.pass ? '✅' : '❌';
      const queryReady = v._meta?.queryEligible && v.outputSchema && v.smokeTestResult?.pass ? '✅' : '❌';
      const executeReady = v._meta?.surface === 'execute' || v._meta?.surface === 'both' ? '✅' : '❌';
      const notes = v.schemaIssues.length > 0 ? `${v.schemaIssues.length} issues` :
                    v.smokeTestResult?.error ? 'Error' : 'OK';

      console.log(`| ${v.name.padEnd(30)} | ${schemaOk.padEnd(9)} | ${smokeTest.padEnd(10)} | ${queryReady.padEnd(11)} | ${executeReady.padEnd(13)} | ${notes.padEnd(5)} |`);
    }

    console.log('\n✅ Validation complete\n');

    // Export results
    console.log('Writing validation results to validation-results.json...');
    const fs = await import('fs');
    fs.writeFileSync(
      'validation-results.json',
      JSON.stringify({ validations, timestamp: new Date().toISOString() }, null, 2)
    );
    console.log('✅ Results saved\n');

    await client.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Connection failed:', error);
    console.error('\nFix guidance:');
    console.error('- Check that the endpoint is accessible');
    console.error('- Verify CORS headers are set correctly');
    console.error('- Ensure the transport type matches (HTTP Streaming)');
    process.exit(1);
  }
}

function generateSampleInput(inputSchema: any): Record<string, any> {
  if (!inputSchema || !inputSchema.properties) {
    return {};
  }

  const input: Record<string, any> = {};

  for (const [key, schema] of Object.entries(inputSchema.properties)) {
    const prop = schema as any;

    // Use default if provided
    if (prop.default !== undefined) {
      input[key] = prop.default;
      continue;
    }

    // Use example if provided
    if (prop.examples && prop.examples.length > 0) {
      input[key] = prop.examples[0];
      continue;
    }

    // Use enum if provided
    if (prop.enum && prop.enum.length > 0) {
      input[key] = prop.enum[0];
      continue;
    }

    // Generate based on type
    if (prop.type === 'string') {
      input[key] = 'CA'; // Default state for this server
    } else if (prop.type === 'boolean') {
      input[key] = false;
    } else if (prop.type === 'number' || prop.type === 'integer') {
      input[key] = 0;
    } else if (prop.type === 'array') {
      input[key] = [];
    } else if (prop.type === 'object') {
      input[key] = {};
    }
  }

  // Smart defaults for landlord law queries
  if (!input.state && inputSchema.properties.state) {
    input.state = 'CA';
  }

  return input;
}

main().catch(console.error);
