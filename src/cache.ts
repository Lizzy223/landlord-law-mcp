import { LegalRule } from './types.js';

export class LegalCache {
  private cache: Map<string, LegalRule[]> = new Map();
  public timestamp: string = new Date().toISOString();

  /**
   * Atomically rebuilds the cache with new data
   * Creates new Map, populates it, then swaps (no .clear() between operations)
   */
  rebuild(rules: LegalRule[]): void {
    const newCache = new Map<string, LegalRule[]>();

    for (const rule of rules) {
      const key = `${rule.topic}:${rule.jurisdiction.toUpperCase()}`;

      if (!newCache.has(key)) {
        newCache.set(key, []);
      }

      newCache.get(key)!.push(rule);
    }

    // Atomic swap
    this.cache = newCache;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Get all rules for a specific topic and state
   */
  get(topic: string, state: string): LegalRule[] {
    const key = `${topic}:${state.toUpperCase()}`;
    return this.cache.get(key) || [];
  }

  /**
   * Get city-level override if it exists, otherwise undefined
   */
  getWithCity(topic: string, state: string, city: string): LegalRule | undefined {
    const rules = this.get(topic, state);
    const normalized = city.toLowerCase();

    return rules.find(
      rule => rule.city_override?.toLowerCase() === normalized
    );
  }

  /**
   * Get all rules across all jurisdictions
   */
  getAll(): LegalRule[] {
    const all: LegalRule[] = [];

    for (const rules of this.cache.values()) {
      all.push(...rules);
    }

    return all;
  }

  /**
   * Get all rules for a specific state (across all topics)
   */
  getByState(state: string): LegalRule[] {
    const normalized = state.toUpperCase();
    const results: LegalRule[] = [];

    for (const [key, rules] of this.cache.entries()) {
      if (key.endsWith(`:${normalized}`)) {
        results.push(...rules);
      }
    }

    return results;
  }
}

// Singleton instance
export const legalCache = new LegalCache();
