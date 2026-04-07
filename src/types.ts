export interface LegalRule {
  topic: "security_deposit" | "eviction_notice" | "entry_requirements" | "late_fees" | "rent_increase" | "habitability" | "lease_termination" | "required_disclosures";
  jurisdiction: string;        // e.g. "CA", "TX", "NY", "FL", "IL"
  city_override?: string;      // e.g. "Los Angeles", "New York City" (for local ordinances)
  rule_summary: string;        // plain English summary
  rule_details: Record<string, string | number | boolean>;  // structured key-value pairs
  statute_reference: string;   // e.g. "Cal. Civ. Code § 1950.5"
  effective_date: string;      // ISO 8601
  last_verified: string;       // ISO 8601
  confidence: "statute" | "regulation" | "case_law";
  notes?: string;
}

export interface JurisdictionQuery {
  state: string;
  city?: string;
}
