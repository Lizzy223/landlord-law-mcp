import { legalCache } from './cache.js';
import { seedData } from './data/seed.js';

export async function loadLegalData(): Promise<void> {
  console.log('Loading legal data into cache...');

  legalCache.rebuild(seedData);

  // Calculate unique jurisdictions
  const jurisdictions = new Set<string>();
  for (const rule of seedData) {
    jurisdictions.add(rule.jurisdiction);
    if (rule.city_override) {
      jurisdictions.add(`${rule.jurisdiction}:${rule.city_override}`);
    }
  }

  console.log(`Loaded ${seedData.length} legal rules`);
  console.log(`Covering ${jurisdictions.size} unique jurisdictions`);
}
