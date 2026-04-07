import { LegalRule } from '../types.js';

export const seedData: LegalRule[] = [
  // ========================================
  // CALIFORNIA - Security Deposits
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "CA",
    rule_summary: "California limits security deposits to 1 month's rent for all residential units (changed from 2 months for furnished in 2024). Must return within 21 days with itemized statement.",
    rule_details: {
      max_deposit_amount: "1 month's rent",
      furnished_limit: "1 month's rent",
      unfurnished_limit: "1 month's rent",
      return_deadline_days: 21,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, cleaning beyond normal wear and tear, repairs for tenant damage",
      interest_required: false,
      interest_details: "No statutory requirement to pay interest on deposits",
      penalty_for_late_return: "Bad faith retention may result in up to 2x the deposit amount in statutory damages plus actual damages",
      special_rules: "AB 12 (2024) changed limit from 2 months (furnished) to 1 month for all. Applies to leases signed on/after July 1, 2024."
    },
    statute_reference: "Cal. Civ. Code § 1950.5",
    effective_date: "2024-07-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "AB 12 significantly changed deposit limits in 2024. Prior law allowed 2 months for furnished, 3 months for furnished waterbed units."
  },

  // ========================================
  // CALIFORNIA - Los Angeles City Override
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "CA",
    city_override: "Los Angeles",
    rule_summary: "Los Angeles follows state law (1 month max) but LAHD enforces additional recordkeeping requirements for rent-stabilized units.",
    rule_details: {
      max_deposit_amount: "1 month's rent",
      furnished_limit: "1 month's rent",
      unfurnished_limit: "1 month's rent",
      return_deadline_days: 21,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, cleaning beyond normal wear and tear, repairs for tenant damage",
      interest_required: false,
      interest_details: "No interest required by state or local law",
      penalty_for_late_return: "Bad faith retention may result in up to 2x the deposit amount in statutory damages",
      special_rules: "Rent-stabilized units must maintain detailed records. LAHD may require deposit accounting during inspections."
    },
    statute_reference: "Cal. Civ. Code § 1950.5; LAMC Chapter XV",
    effective_date: "2024-07-01",
    last_verified: "2026-03-22",
    confidence: "statute"
  },

  // ========================================
  // TEXAS - Security Deposits
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "TX",
    rule_summary: "Texas has no statutory limit on deposit amounts. Landlords must return deposits within 30 days with itemized deductions if any are claimed.",
    rule_details: {
      max_deposit_amount: "No statutory limit",
      furnished_limit: "No statutory limit",
      unfurnished_limit: "No statutory limit",
      return_deadline_days: 30,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, damages beyond normal wear and tear, cleaning costs, unpaid utility bills if specified in lease",
      interest_required: false,
      interest_details: "No statutory requirement to pay interest",
      penalty_for_late_return: "Landlord who retains deposit in bad faith liable for $100 + deposit amount + attorney's fees. If tenant prevails in court, landlord liable for 3x deposit plus attorney's fees.",
      special_rules: "Landlord must provide written notice of tenant's right to itemized list within 30 days. Forwarding address must be provided by tenant to receive deposit."
    },
    statute_reference: "Tex. Prop. Code §§ 92.101–92.109",
    effective_date: "1983-09-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Market typically limits deposits to 1-2 months' rent, but no legal cap exists."
  },

  // ========================================
  // NEW YORK - Security Deposits
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "NY",
    rule_summary: "New York limits security deposits to 1 month's rent (HSTPA 2019). Must return within 14 days if no claims, or reasonable time with itemized statement if deductions are made.",
    rule_details: {
      max_deposit_amount: "1 month's rent",
      furnished_limit: "1 month's rent",
      unfurnished_limit: "1 month's rent",
      return_deadline_days: 14,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, damage beyond normal wear and tear",
      interest_required: false,
      interest_details: "Interest not required for most residential tenancies (buildings with 6+ units in NYC have separate rules)",
      penalty_for_late_return: "Tenant may sue for actual damages. Willful violation may result in punitive damages.",
      special_rules: "HSTPA (Housing Stability and Tenant Protection Act of 2019) reduced limit from 1 month's rent. Applies statewide to most residential leases."
    },
    statute_reference: "NY GOL § 7-108",
    effective_date: "2019-06-14",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "14-day return applies when no deductions claimed. If deductions made, reasonable time required with itemized list."
  },

  // ========================================
  // NEW YORK - NYC Override
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "NY",
    city_override: "New York City",
    rule_summary: "NYC follows state 1-month limit. Buildings with 6+ units must hold deposits in interest-bearing accounts and pay annual interest (minus 1% admin fee) to tenants.",
    rule_details: {
      max_deposit_amount: "1 month's rent",
      furnished_limit: "1 month's rent",
      unfurnished_limit: "1 month's rent",
      return_deadline_days: 14,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, damage beyond normal wear and tear",
      interest_required: true,
      interest_details: "Buildings with 6+ units must hold deposits in NY interest-bearing accounts. Annual interest (minus 1% admin fee) due to tenant. Current rate varies by prevailing savings account rates.",
      penalty_for_late_return: "Tenant may sue for actual damages. Failure to pay interest may forfeit right to collect deposit.",
      special_rules: "Rent-stabilized and rent-controlled units have additional protections. Landlord must provide bank account details within 30 days of receiving deposit."
    },
    statute_reference: "NY GOL § 7-103; NYC Admin Code § 26-516",
    effective_date: "2019-06-14",
    last_verified: "2026-03-22",
    confidence: "statute"
  },

  // ========================================
  // FLORIDA - Security Deposits
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "FL",
    rule_summary: "Florida has no statutory limit on deposits. Return deadline is 15 days (no claims) or 30 days (with itemized claims). Must be held in separate account or bonded.",
    rule_details: {
      max_deposit_amount: "No statutory limit",
      furnished_limit: "No statutory limit",
      unfurnished_limit: "No statutory limit",
      return_deadline_days: 15,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, damages beyond normal wear and tear",
      interest_required: false,
      interest_details: "No statutory requirement to pay interest. If interest-bearing account used, interest belongs to landlord unless lease specifies otherwise.",
      penalty_for_late_return: "Landlord who fails to comply forfeits right to withhold any portion of deposit and may be liable for court costs and attorney's fees",
      special_rules: "Deposits must be held in FL financial institution (separate account OR surety bond OR segregated interest-bearing account with interest going to tenant). Landlord must notify tenant within 30 days of receipt which method is used. 30-day deadline applies if landlord makes claim; 15 days if no claim."
    },
    statute_reference: "Fla. Stat. § 83.49",
    effective_date: "1973-07-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Return timeline varies: 15 days if no deductions, 30 days if landlord sends notice of claim for damages/rent."
  },

  // ========================================
  // ILLINOIS - Security Deposits (State)
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "IL",
    rule_summary: "Illinois has no statutory limit on deposit amounts. Return deadline is 30 days (5+ unit buildings) or 45 days (buildings with less than 5 units), with itemized statement.",
    rule_details: {
      max_deposit_amount: "No statutory limit",
      furnished_limit: "No statutory limit",
      unfurnished_limit: "No statutory limit",
      return_deadline_days: 30,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, damages beyond normal wear and tear (receipts required for amounts over $20)",
      interest_required: true,
      interest_details: "Properties with 25+ units in buildings containing 6+ units must pay interest annually or at lease end. Rate set by HUD or passbook savings rate (whichever is lower).",
      penalty_for_late_return: "Landlord who willfully fails to return deposit or provide itemized statement may forfeit deposit claim and be liable for 2x deposit amount plus court costs and attorney's fees",
      special_rules: "45-day return for buildings with <5 units. 30 days for 5+ unit buildings. Itemized statement required within same timeline. Landlords must provide receipts for repairs over $20."
    },
    statute_reference: "765 ILCS 710/1",
    effective_date: "2004-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Interest requirements apply to larger buildings (25+ units in buildings with 6+ units). Smaller properties exempt from interest requirement."
  },

  // ========================================
  // ILLINOIS - Chicago Override (RLTO)
  // ========================================
  {
    topic: "security_deposit",
    jurisdiction: "IL",
    city_override: "Chicago",
    rule_summary: "Chicago's RLTO is stricter than state law. Maximum 1.5x monthly rent for deposits. Interest required on deposits held 6+ months. Must return within 45 days (30 days if less than 6 months occupancy) with itemized statement and interest.",
    rule_details: {
      max_deposit_amount: "1.5x monthly rent",
      furnished_limit: "1.5x monthly rent",
      unfurnished_limit: "1.5x monthly rent",
      return_deadline_days: 45,
      itemized_deductions_required: true,
      allowed_deductions: "Unpaid rent, damages beyond normal wear and tear. Must provide receipts/estimates for all deductions.",
      interest_required: true,
      interest_details: "Interest required if deposit held 6+ months. Rate set annually by City (based on local bank rates). Currently around 0.01%-0.25% depending on year. Interest must be paid annually or at lease termination.",
      penalty_for_late_return: "Landlord who fails to comply liable for 2x deposit amount plus court costs and attorney's fees. Pre-move out inspection required if tenant requests.",
      special_rules: "RLTO applies to most residential rentals in Chicago. 30-day return if tenant lived there <6 months, 45 days if 6+ months. Move-in checklist required. Tenant may request pre-move-out inspection (landlord must provide within 14 days of request)."
    },
    statute_reference: "Chicago RLTO § 5-12-080",
    effective_date: "1987-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Chicago RLTO (Residential Landlord Tenant Ordinance) is significantly more tenant-friendly than state law. Interest rate changes annually - verify current rate with City of Chicago."
  },

  // ========================================
  // CALIFORNIA - Eviction Notice/Timeline
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "CA",
    rule_summary: "California requires 3-day notice for nonpayment, just cause eviction required statewide under AB 1482 (Tenant Protection Act). No-fault evictions require relocation assistance.",
    rule_details: {
      nonpayment_notice_days: 3,
      nonpayment_notice_type: "3-Day Notice to Pay or Quit",
      cure_period_allowed: true,
      lease_violation_notice_days: 3,
      lease_violation_cure_days: 3,
      month_to_month_termination_days: 30,
      unconditional_quit_available: true,
      unconditional_quit_conditions: "Unconditional quit (no cure) allowed for: subleasing without permission, substantial damage to property, illegal activity, repeat violations within 12 months",
      just_cause_required: true,
      just_cause_details: "AB 1482 requires just cause for properties >15 years old with no exemptions. At-fault causes: nonpayment, lease violation, nuisance, illegal activity. No-fault causes: owner move-in, substantial renovation, Ellis Act withdrawal. No-fault evictions require 1 month rent relocation assistance.",
      court_filing_required: true,
      estimated_court_timeline_days: "30-90 days (varies by county; LA/SF often longer)",
      tenant_right_to_cure: true,
      illegal_eviction_penalties: "Self-help evictions (lockouts, utility shutoffs) are illegal. Tenant may sue for actual damages, punitive damages up to $100/day of violation, attorney's fees. Minimum statutory damages often apply.",
      special_protections: "COVID-era protections have expired but eviction moratoria may exist in some cities. Rent control cities (LA, SF, Oakland, etc.) have additional just cause requirements predating AB 1482."
    },
    statute_reference: "Cal. Civ. Code §§ 1946.2 (AB 1482), CCP §§ 1161-1179a",
    effective_date: "2020-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "AB 1482 (2019) applies statewide except exempt properties: built <15 years, single-family homes owned by individuals/LLCs with <3 properties, condos. Local ordinances may be stricter."
  },

  // ========================================
  // CALIFORNIA - Los Angeles Eviction Override
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "CA",
    city_override: "Los Angeles",
    rule_summary: "LA RSO (Rent Stabilization Ordinance) requires just cause for rent-stabilized units (most buildings built before 10/1/1978). Stricter than state law, requires specific notice forms, Ellis Act relocation fees significantly higher.",
    rule_details: {
      nonpayment_notice_days: 3,
      nonpayment_notice_type: "3-Day Notice to Pay or Quit (must use LAHD-approved form)",
      cure_period_allowed: true,
      lease_violation_notice_days: 3,
      lease_violation_cure_days: 3,
      month_to_month_termination_days: 30,
      unconditional_quit_available: true,
      unconditional_quit_conditions: "Same as state law: subleasing without permission, substantial damage, illegal activity, repeat violations",
      just_cause_required: true,
      just_cause_details: "LAMC 151.09 requires just cause for RSO units. At-fault: nonpayment, breach, nuisance, illegal use, refusal of access, unapproved subtenant. No-fault: owner move-in, demolition, substantial remodel, compliance with government order, Ellis Act withdrawal.",
      court_filing_required: true,
      estimated_court_timeline_days: "60-120 days (LA courts heavily backlogged)",
      tenant_right_to_cure: true,
      illegal_eviction_penalties: "RSO violations: tenant may sue for 3x actual damages or $5,000 (whichever greater) plus attorney's fees. LAHD may impose administrative penalties. Retaliation claims have 180-day protection period.",
      special_protections: "RSO units require: LAHD registration, relocation assistance ($8,141-$21,042 for no-fault evictions as of 2024), 60-day notice for seniors/disabled, strict notice format requirements. Non-RSO units follow state AB 1482."
    },
    statute_reference: "LAMC § 151.09 (RSO Just Cause); Cal. Civ. Code § 1946.2",
    effective_date: "1979-05-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "LA RSO only applies to buildings built before Oct 1, 1978 with 2+ units. Single-family homes and newer buildings follow state AB 1482. Relocation fees adjust annually."
  },

  // ========================================
  // TEXAS - Eviction Notice/Timeline
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "TX",
    rule_summary: "Texas is landlord-friendly with no statewide just cause requirement. Standard 3-day notice to vacate for nonpayment (unless lease specifies different timeline). Fast court process.",
    rule_details: {
      nonpayment_notice_days: 3,
      nonpayment_notice_type: "Notice to Vacate (unless lease specifies different timeline or grace period)",
      cure_period_allowed: false,
      lease_violation_notice_days: 3,
      lease_violation_cure_days: 0,
      month_to_month_termination_days: 30,
      unconditional_quit_available: true,
      unconditional_quit_conditions: "Texas notices generally do not offer cure period unless lease requires it. Landlord may terminate for nonpayment, lease violation, holdover, or any reason (month-to-month).",
      just_cause_required: false,
      just_cause_details: "No statewide just cause requirement. Month-to-month tenancies can be terminated with proper notice for any reason (or no reason). Fixed-term leases require breach or expiration.",
      court_filing_required: true,
      estimated_court_timeline_days: "10-30 days (Texas evictions are very fast)",
      tenant_right_to_cure: false,
      illegal_eviction_penalties: "Self-help evictions illegal. Landlord liable for actual damages, $500 statutory damages, 1 month rent + $1,000, plus attorney's fees. Tenant may pursue criminal charges for illegal lockout.",
      special_protections: "Grace periods for rent payment often specified in lease. Lease controls notice periods in many cases. Writ of possession can be issued 5 days after judgment. No COVID protections remain."
    },
    statute_reference: "Tex. Prop. Code §§ 24.002-24.005, 92.008, 92.009",
    effective_date: "1985-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Lease terms often override statutory minimums in Texas. Many leases specify longer notice periods or grace periods. Check lease first. Some cities (Austin) have local tenant protections but no just cause laws."
  },

  // ========================================
  // NEW YORK - Eviction Notice/Timeline
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "NY",
    rule_summary: "New York requires 14-day rent demand for nonpayment. Good Cause Eviction law (2024) applies to certain units statewide. Notice periods for termination vary by length of tenancy (30/60/90 days).",
    rule_details: {
      nonpayment_notice_days: 14,
      nonpayment_notice_type: "14-Day Rent Demand",
      cure_period_allowed: true,
      lease_violation_notice_days: 10,
      lease_violation_cure_days: 10,
      month_to_month_termination_days: 30,
      unconditional_quit_available: false,
      unconditional_quit_conditions: "New York requires cure opportunity for most violations. Unconditional notices rare and limited to extreme cases (illegal activity, serious safety violations).",
      just_cause_required: true,
      just_cause_details: "Good Cause Eviction law (effective 2024) applies to units outside NYC rent regulation and outside exemptions. Limits rent increases, requires good cause. NYC rent-stabilized/controlled units have always required just cause. Acceptable causes: nonpayment, lease violation, illegal activity, owner occupancy, substantial renovation.",
      court_filing_required: true,
      estimated_court_timeline_days: "60-180 days (NYC housing courts heavily backlogged)",
      tenant_right_to_cure: true,
      illegal_eviction_penalties: "Illegal eviction (lockout, utility shutoff) subjects landlord to treble damages, punitive damages, attorney's fees. Criminal penalties possible. Tenant may recover possession via court order.",
      special_protections: "Termination notice periods: 30 days (<1 year tenancy), 60 days (1-2 years), 90 days (2+ years). ERAP protections may apply. Senior/disabled tenants have additional protections in some jurisdictions. Winter eviction restrictions in some counties."
    },
    statute_reference: "NY RPAPL §§ 711, 732; RPL § 226-c (Good Cause)",
    effective_date: "2024-04-20",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Good Cause Eviction law (2024) has income/rent thresholds and exemptions (new construction, owner-occupied 2-4 units, etc.). NYC has separate rent regulation system predating this. Law is complex - verify applicability."
  },

  // ========================================
  // NEW YORK - NYC Eviction Override
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "NY",
    city_override: "New York City",
    rule_summary: "NYC rent-stabilized and rent-controlled units have strict just cause requirements predating statewide law. All evictions require court process. Strong tenant protections and significant court delays.",
    rule_details: {
      nonpayment_notice_days: 14,
      nonpayment_notice_type: "14-Day Rent Demand (must include ERAP information)",
      cure_period_allowed: true,
      lease_violation_notice_days: 10,
      lease_violation_cure_days: 10,
      month_to_month_termination_days: 90,
      unconditional_quit_available: false,
      unconditional_quit_conditions: "NYC rarely allows unconditional notices. Even serious violations typically allow cure period. Objectionable conduct requires pattern of behavior.",
      just_cause_required: true,
      just_cause_details: "Rent-stabilized units: primary residence requirement, owner occupancy (immediate family), substantial renovation, demolition with DOB permits, illegal use. Non-renewal requires specific statutory grounds. Market-rate units subject to Good Cause law if not exempt.",
      court_filing_required: true,
      estimated_court_timeline_days: "120-365+ days (NYC Housing Court extremely backlogged, especially post-COVID)",
      tenant_right_to_cure: true,
      illegal_eviction_penalties: "Illegal lockout: treble damages, attorney's fees, criminal penalties (Class A misdemeanor). HPD/OATH violations. Tenant restored to possession. Harassment claims may result in $1,000-$10,000 civil penalties per violation.",
      special_protections: "HSTPA 2019 protections: attorney fees in housing court, settlement conference required, longer cure periods. ERAP application freezes eviction. Right to counsel in eviction proceedings. Senior/disabled tenants get enhanced notices. Lease renewal rights for rent-stabilized tenants."
    },
    statute_reference: "NYC Rent Stabilization Code; NY RPAPL §§ 711, 732; NYC Admin Code § 26-521",
    effective_date: "2019-06-14",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "NYC eviction law extremely complex with overlapping state/local regulations. Rent-stabilized units (~1M units) have strongest protections. Right to counsel significantly lengthens timeline. DHCR oversees rent-regulated units."
  },

  // ========================================
  // FLORIDA - Eviction Notice/Timeline
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "FL",
    rule_summary: "Florida requires 3-day notice for nonpayment (no cure if unconditional), 7-day notice for curable lease violations. No statewide just cause requirement. Landlord-friendly, fast court process.",
    rule_details: {
      nonpayment_notice_days: 3,
      nonpayment_notice_type: "3-Day Notice (can be 'Pay or Vacate' or unconditional if lease allows)",
      cure_period_allowed: true,
      lease_violation_notice_days: 7,
      lease_violation_cure_days: 7,
      month_to_month_termination_days: 15,
      unconditional_quit_available: true,
      unconditional_quit_conditions: "7-day unconditional notice allowed for: repeat violations of same provision within 12 months (even if cured). Landlord may also use unconditional 3-day notice for nonpayment if lease authorizes it.",
      just_cause_required: false,
      just_cause_details: "No statewide just cause requirement. Month-to-month tenancies can be terminated with 15-day notice for any/no reason. Fixed-term leases require expiration or material breach.",
      court_filing_required: true,
      estimated_court_timeline_days: "15-30 days (Florida evictions are fast if uncontested)",
      tenant_right_to_cure: true,
      illegal_eviction_penalties: "Landlord who violates Chapter 83 liable for actual damages plus attorney's fees. Self-help evictions may result in criminal charges. Tenant may pursue injunctive relief and damages.",
      special_protections: "Tenant may raise defenses (uninhabitable conditions, retaliation) but must pay rent into court registry. Writ of possession issued quickly after judgment (usually 24 hours). Very limited eviction moratoria - most COVID protections expired."
    },
    statute_reference: "Fla. Stat. §§ 83.56, 83.57, 83.60",
    effective_date: "1973-07-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "15-day termination notice for month-to-month is notably shorter than most states. Lease violations get 7-day cure except for repeat violations (unconditional). Some local ordinances may provide additional protections."
  },

  // ========================================
  // ILLINOIS - Eviction Notice/Timeline
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "IL",
    rule_summary: "Illinois requires 5-day notice for nonpayment, 10-day notice for lease violations (with cure), 30-day notice for month-to-month termination. No statewide just cause requirement outside Chicago.",
    rule_details: {
      nonpayment_notice_days: 5,
      nonpayment_notice_type: "5-Day Notice to Pay Rent or Quit",
      cure_period_allowed: true,
      lease_violation_notice_days: 10,
      lease_violation_cure_days: 10,
      month_to_month_termination_days: 30,
      unconditional_quit_available: true,
      unconditional_quit_conditions: "Unconditional notice allowed for: illegal activity on premises, threats of violence, material damage to property. Also for repeat lease violations (same issue within 6 months).",
      just_cause_required: false,
      just_cause_details: "No statewide just cause requirement. Month-to-month tenancies terminable with 30-day notice without cause. Chicago RLTO imposes just cause requirements within city limits.",
      court_filing_required: true,
      estimated_court_timeline_days: "30-60 days (varies by county; Cook County often longer)",
      tenant_right_to_cure: true,
      illegal_eviction_penalties: "Landlord who uses self-help eviction or violates forcible entry and detainer act liable for actual damages, costs, and attorney's fees. Willful violations may result in punitive damages. Criminal penalties possible for illegal lockouts.",
      special_protections: "CERA (COVID Emergency Rental Assistance) protections largely expired. Some local protections remain. Tenants in federally subsidized housing have additional federal protections. Sealed eviction records available in some cases."
    },
    statute_reference: "735 ILCS 5/9-207 to 9-217",
    effective_date: "1980-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "5-day notice for nonpayment is shorter than many states. Chicago has significantly different rules under RLTO. Lease may specify longer notice periods but not shorter than statutory minimums."
  },

  // ========================================
  // ILLINOIS - Chicago Eviction Override (RLTO)
  // ========================================
  {
    topic: "eviction_notice",
    jurisdiction: "IL",
    city_override: "Chicago",
    rule_summary: "Chicago RLTO requires just cause for eviction. Enhanced notice requirements, mandatory pre-eviction mediation in some cases, and strong tenant protections beyond state law.",
    rule_details: {
      nonpayment_notice_days: 5,
      nonpayment_notice_type: "5-Day Notice to Pay Rent or Quit (must comply with RLTO format requirements)",
      cure_period_allowed: true,
      lease_violation_notice_days: 10,
      lease_violation_cure_days: 10,
      month_to_month_termination_days: 30,
      unconditional_quit_available: true,
      unconditional_quit_conditions: "Unconditional termination allowed for: material breach that cannot be remedied, repeated violations within 12 months, illegal activity, threats to safety.",
      just_cause_required: true,
      just_cause_details: "RLTO requires just cause for all evictions in covered buildings. At-fault: nonpayment, lease violation, nuisance, illegal use, refusal of access, holdover after fixed term. No-fault: owner occupancy (2+ years ownership), demolition/substantial rehab, condo conversion. No-fault requires relocation assistance.",
      court_filing_required: true,
      estimated_court_timeline_days: "45-90 days (Cook County courts, often longer if contested)",
      tenant_right_to_cure: true,
      illegal_eviction_penalties: "RLTO violations: 2x monthly rent plus attorney's fees and costs. Wrongful eviction: actual damages, punitive damages, attorney's fees. Illegal lockout is criminal offense. Retaliation claims protected for 12 months after tenant exercises rights.",
      special_protections: "RLTO requires: proper notice format, landlord registration with city, specific termination grounds, relocation assistance for no-fault evictions ($10,991+ as of 2024). Winter rules (Dec-Mar) prohibit evictions of certain vulnerable tenants. Mediation may be required."
    },
    statute_reference: "Chicago RLTO § 5-12-130",
    effective_date: "1987-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Chicago RLTO is significantly more protective than state law. Owner-occupancy evictions require 2+ years of ownership. Relocation assistance amounts adjust annually. Some buildings exempt (owner-occupied 6 or fewer units, hotels, dorms, etc.)."
  },

  // ========================================
  // CALIFORNIA - Entry Requirements
  // ========================================
  {
    topic: "entry_requirements",
    jurisdiction: "CA",
    rule_summary: "California requires 24-hour written notice for non-emergency entry during reasonable hours (8am-5pm normal business days). Entry permitted only for specific lawful purposes.",
    rule_details: {
      notice_required: true,
      notice_hours: 24,
      notice_must_be_written: true,
      permitted_entry_reasons: "Make necessary or agreed repairs/improvements/services, show unit to prospective tenants/buyers/lenders/contractors, inspect pursuant to lease, court order, when tenant has abandoned or surrendered premises",
      emergency_entry_allowed: true,
      entry_hours_restriction: "Normal business hours (generally 8am-5pm on business days). Written notice must state date, approximate time, and purpose.",
      tenant_can_deny_entry: false,
      penalty_for_illegal_entry: "Tenant may sue for damages (actual + possible punitive). Repeated violations may constitute grounds for constructive eviction or lease termination by tenant. Invasion of privacy tort possible.",
      key_change_rules: "Landlord may not change locks without tenant's permission unless court order obtained. Tenant may change locks if landlord refuses to repair security issues (must provide key).",
      showing_to_prospective_tenants: "24-hour written notice required. Landlord may show unit during final 120 days of tenancy if proper notice given. Tenant must cooperate with reasonable showing requests."
    },
    statute_reference: "Cal. Civ. Code § 1954",
    effective_date: "1986-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Tenant cannot unreasonably withhold consent if proper notice given. Emergency entry (no notice) allowed for fire, flood, gas leak, etc. Oral notice acceptable if tenant agrees. Some local ordinances may be stricter."
  },

  // ========================================
  // TEXAS - Entry Requirements
  // ========================================
  {
    topic: "entry_requirements",
    jurisdiction: "TX",
    rule_summary: "Texas has no statewide statute governing landlord entry. Entry rights typically governed by lease terms and common law reasonableness standard.",
    rule_details: {
      notice_required: false,
      notice_hours: 0,
      notice_must_be_written: false,
      permitted_entry_reasons: "No statutory restrictions. Lease controls entry rights. Common law requires reasonable notice and reasonable hours for non-emergency entry.",
      emergency_entry_allowed: true,
      entry_hours_restriction: "No statutory restriction. Common law and lease control. Courts generally require reasonable hours (typically daytime hours) for non-emergency entry.",
      tenant_can_deny_entry: true,
      penalty_for_illegal_entry: "Tenant may sue for trespass, invasion of privacy, or breach of quiet enjoyment. Actual damages, possibly punitive damages if conduct egregious. Criminal trespass charges possible in extreme cases.",
      key_change_rules: "Tenant may change locks (must provide key to landlord within reasonable time, typically per lease). Landlord cannot change locks without eviction order. Illegal lockout subjects landlord to criminal and civil penalties.",
      showing_to_prospective_tenants: "No statutory requirement. Lease controls. Best practice: reasonable advance notice (24-48 hours). Tenant cannot unreasonably refuse access if lease allows showings."
    },
    statute_reference: "Common law (no specific statute); Tex. Prop. Code § 92.008 (lockout prohibition)",
    effective_date: "1985-01-01",
    last_verified: "2026-03-22",
    confidence: "case_law",
    notes: "Texas is one of few states without landlord entry statute. Lease terms critical. Courts imply covenant of quiet enjoyment and reasonableness. Industry standard: 24-hour notice. Check lease carefully."
  },

  // ========================================
  // NEW YORK - Entry Requirements
  // ========================================
  {
    topic: "entry_requirements",
    jurisdiction: "NY",
    rule_summary: "New York has no specific statute governing landlord entry notice. Reasonable notice required through case law and implied covenant of quiet enjoyment. NYC has additional regulations.",
    rule_details: {
      notice_required: true,
      notice_hours: 24,
      notice_must_be_written: false,
      permitted_entry_reasons: "Repairs, inspections, showing to prospective tenants/buyers, emergencies. Lease may specify additional permitted reasons. Must be reasonable under circumstances.",
      emergency_entry_allowed: true,
      entry_hours_restriction: "Reasonable hours (generally 9am-5pm on weekdays). No specific statutory hours. Courts enforce reasonableness standard.",
      tenant_can_deny_entry: false,
      penalty_for_illegal_entry: "Harassment claims (NYC Admin Code), breach of quiet enjoyment, trespass, invasion of privacy. NYC: $1,000-$10,000 civil penalties per harassment violation. Criminal trespass possible.",
      key_change_rules: "Tenant generally may change locks if security concern exists (should provide key). Landlord cannot change locks without court order. Illegal lockout: Class A misdemeanor (NYC), treble damages.",
      showing_to_prospective_tenants: "Reasonable notice required (24 hours typical). During last 3 months of lease, landlord has greater rights to show unit. Tenant must permit reasonable showings."
    },
    statute_reference: "Common law; NYC Admin Code § 27-2004 (harassment); Multiple Dwelling Law",
    effective_date: "1950-01-01",
    last_verified: "2026-03-22",
    confidence: "case_law",
    notes: "No specific statute but strong case law. NYC Administrative Code prohibits harassment (includes unreasonable entry/privacy violations). Industry standard: 24-hour notice. Rent-stabilized units have additional protections against harassment."
  },

  // ========================================
  // FLORIDA - Entry Requirements
  // ========================================
  {
    topic: "entry_requirements",
    jurisdiction: "FL",
    rule_summary: "Florida requires landlord to provide reasonable notice (at least 12 hours) before entering. Entry permitted only for specific lawful purposes during reasonable hours.",
    rule_details: {
      notice_required: true,
      notice_hours: 12,
      notice_must_be_written: false,
      permitted_entry_reasons: "Inspect premises, make necessary or agreed repairs/decorations/improvements, supply services, show unit to prospective tenants/purchasers/workers/contractors",
      emergency_entry_allowed: true,
      entry_hours_restriction: "Between hours of 7:30am and 8:00pm unless tenant consents to entry at different time, emergency, or tenant unreasonably withholds consent",
      tenant_can_deny_entry: false,
      penalty_for_illegal_entry: "Unreasonable entry may constitute grounds for lease termination by tenant (with 7-day notice). Tenant may sue for actual damages. Repeated violations may support constructive eviction claim.",
      key_change_rules: "Landlord must provide locks and keys. Tenant may change locks if landlord fails to provide secure locks after notice. Landlord cannot change locks without court order. Illegal lockout: liability for damages, attorney's fees.",
      showing_to_prospective_tenants: "12-hour notice required to show to prospective tenants. During final 2 months of tenancy, landlord may show with reasonable notice. Tenant cannot unreasonably withhold consent."
    },
    statute_reference: "Fla. Stat. § 83.53",
    effective_date: "1973-07-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "12-hour notice requirement is shorter than many states. Notice can be oral or written. Tenant cannot unreasonably withhold consent even if notice shorter than 12 hours. Emergency entry requires no notice."
  },

  // ========================================
  // ILLINOIS - Entry Requirements
  // ========================================
  {
    topic: "entry_requirements",
    jurisdiction: "IL",
    rule_summary: "Illinois has no statewide statute governing landlord entry. Common law requires reasonable notice. Chicago RLTO requires 2-day written notice for non-emergency entry.",
    rule_details: {
      notice_required: false,
      notice_hours: 0,
      notice_must_be_written: false,
      permitted_entry_reasons: "No statewide statutory restrictions. Common law and lease control permitted reasons. Generally: repairs, inspections, emergencies, showing to prospective tenants/buyers.",
      emergency_entry_allowed: true,
      entry_hours_restriction: "No statewide statute. Common law requires reasonable hours. Industry standard: normal business hours (9am-5pm weekdays).",
      tenant_can_deny_entry: true,
      penalty_for_illegal_entry: "Tenant may sue for trespass, invasion of privacy, breach of quiet enjoyment. Actual damages, possibly punitive if egregious. Repeated violations may constitute lease violation by landlord.",
      key_change_rules: "No statewide statute. Lease controls. Landlord cannot change locks without court order (illegal lockout provisions). Tenant may change locks for security but should provide key per lease.",
      showing_to_prospective_tenants: "No statewide requirement. Lease controls. Industry standard: 24-48 hour notice. Chicago RLTO requires 2-day notice (see Chicago override)."
    },
    statute_reference: "Common law (no specific statute)",
    effective_date: "1980-01-01",
    last_verified: "2026-03-22",
    confidence: "case_law",
    notes: "Similar to Texas - no statewide entry statute. Lease terms critical. Chicago has specific requirements under RLTO (see city override). Outside Chicago, industry standard is 24 hours notice."
  },

  // ========================================
  // ILLINOIS - Chicago Entry Requirements (RLTO)
  // ========================================
  {
    topic: "entry_requirements",
    jurisdiction: "IL",
    city_override: "Chicago",
    rule_summary: "Chicago RLTO requires 2 days written notice for non-emergency entry. Entry restricted to reasonable hours. Specific penalties for violations.",
    rule_details: {
      notice_required: true,
      notice_hours: 48,
      notice_must_be_written: true,
      permitted_entry_reasons: "Make necessary or agreed repairs/decorations/alterations/improvements, supply services, inspect, show to prospective tenants/purchasers/mortgagees, court order, emergency",
      emergency_entry_allowed: true,
      entry_hours_restriction: "Reasonable hours only. RLTO does not specify exact hours but generally interpreted as normal business hours (8am-8pm weekdays, 9am-5pm weekends).",
      tenant_can_deny_entry: false,
      penalty_for_illegal_entry: "Tenant may terminate lease with 14 days notice if landlord violates entry requirements. Damages: minimum $200 plus actual damages, attorney's fees. Repeated violations may constitute harassment.",
      key_change_rules: "Tenant may change locks if security issue exists and landlord fails to remedy after notice. Must provide landlord with key. Landlord cannot change locks without court order. Illegal lockout: 2x monthly rent plus attorney's fees.",
      showing_to_prospective_tenants: "2-day written notice required. During final 60 days of tenancy, landlord may show with proper notice. Tenant cannot unreasonably refuse access if proper notice given."
    },
    statute_reference: "Chicago RLTO § 5-12-050",
    effective_date: "1987-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "48-hour (2 day) written notice requirement is stricter than most jurisdictions. RLTO applies to most residential rentals in Chicago. Emergency entry allowed without notice (fire, flood, immediate danger)."
  },

  // ========================================
  // CALIFORNIA - Late Fees
  // ========================================
  {
    topic: "late_fees",
    jurisdiction: "CA",
    rule_summary: "California has no statutory cap on late fees but courts enforce strict reasonableness standard. Fees must be liquidated damages (reasonable estimate of landlord's actual damages), not penalties. Typically 5-6% of monthly rent upheld.",
    rule_details: {
      late_fee_cap: "No statutory cap, but must be reasonable. Courts typically uphold 5-6% of monthly rent. Flat fees around $50-100 for average rent also acceptable if reasonable.",
      grace_period_days: 0,
      grace_period_required_by_law: false,
      must_be_in_lease: true,
      reasonableness_standard: "Late fees are liquidated damages and must represent reasonable estimate of landlord's actual damages from late payment. Cannot be penalty. Courts scrutinize amounts over 10% of rent. Must be proportional to rent amount.",
      nsf_check_fee_limit: "Up to $25 for first bad check, $35 for subsequent (per Cal. Civ. Code § 1719). Plus bank fees actually incurred.",
      late_fee_on_late_fee_allowed: false,
      special_rules: "Daily late fees are disfavored (courts prefer one-time fees). Grace period not required but common (3-5 days typical). Rent control cities may have stricter limits. Fee cannot accrue during COVID-era protected periods if still applicable."
    },
    statute_reference: "Cal. Civ. Code § 1671 (liquidated damages); Orozco v. Casimiro (2004) 121 Cal.App.4th Supp. 7",
    effective_date: "2004-01-01",
    last_verified: "2026-03-22",
    confidence: "case_law",
    notes: "California courts strictly scrutinize late fees as liquidated damages clause. Burden on landlord to prove reasonableness if challenged. 5-6% generally safe; 10%+ often struck down. Some rent-controlled cities have specific caps."
  },

  // ========================================
  // TEXAS - Late Fees
  // ========================================
  {
    topic: "late_fees",
    jurisdiction: "TX",
    rule_summary: "Texas requires late fees to be reasonable and specified in lease. Landlord cannot charge late fee unless rent is at least 2 full days late (unless lease provides for greater grace period).",
    rule_details: {
      late_fee_cap: "No statutory cap, but must be reasonable. Courts typically uphold 5-12% of monthly rent. Higher percentages scrutinized but may be upheld if reasonable.",
      grace_period_days: 2,
      grace_period_required_by_law: true,
      must_be_in_lease: true,
      reasonableness_standard: "Late fee must be reasonable and specified in lease. Courts consider relationship to actual damages. No precise formula but 10% generally safe, up to 12% often upheld. Higher amounts may be challenged.",
      nsf_check_fee_limit: "No statutory limit on NSF fees if specified in lease and reasonable. Landlord may charge actual bank fees plus reasonable administrative fee (typically $25-50).",
      late_fee_on_late_fee_allowed: false,
      special_rules: "Initial late fee cannot be charged until rent is 2+ full days late (e.g., rent due 1st, cannot charge until 4th). Lease may provide longer grace period. Attorney's fees for collection typically allowed if in lease. Daily late fees permitted if reasonable."
    },
    statute_reference: "Tex. Prop. Code § 92.019",
    effective_date: "1993-09-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "2-day grace period is statutory minimum even if lease says otherwise. Common practice: 5-day grace period with late fee of 10% of rent. Lease must specifically authorize late fees or they cannot be charged."
  },

  // ========================================
  // NEW YORK - Late Fees
  // ========================================
  {
    topic: "late_fees",
    jurisdiction: "NY",
    rule_summary: "New York limits late fees to $50 or 5% of monthly rent (whichever is less) for units covered by HSTPA (2019). Fee cannot be charged until rent is 5+ days late. NYC rent-regulated units have additional restrictions.",
    rule_details: {
      late_fee_cap: "$50 or 5% of monthly rent, whichever is less (for HSTPA-covered units). Market-rate units outside HSTPA coverage: reasonableness standard applies.",
      grace_period_days: 5,
      grace_period_required_by_law: true,
      must_be_in_lease: true,
      reasonableness_standard: "For HSTPA units: $50 or 5% cap applies. For non-covered units: common law reasonableness. Cannot be punitive. Must represent actual anticipated damages from late payment.",
      nsf_check_fee_limit: "HSTPA-covered units: $20 maximum. Non-covered units: must be reasonable (typically $20-50 range).",
      late_fee_on_late_fee_allowed: false,
      special_rules: "HSTPA applies to: rent-stabilized, rent-controlled, and buildings with 6+ units built before 1974 (outside NYC). 5-day grace period mandatory before late fee. Lease must specify fee. Monthly fees only (no daily fees). NYC rent-regulated units cannot charge late fees during lease term in some cases."
    },
    statute_reference: "NY GOL § 7-108(1-a); HSTPA (2019)",
    effective_date: "2019-06-14",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "HSTPA significantly limited late fees in 2019. Applies to most multi-family rentals. NYC rent-stabilized units have complex rules - some cannot charge late fees at all during lease term. Verify applicability carefully."
  },

  // ========================================
  // NEW YORK - NYC Late Fees Override
  // ========================================
  {
    topic: "late_fees",
    jurisdiction: "NY",
    city_override: "New York City",
    rule_summary: "NYC rent-stabilized and rent-controlled units have strict late fee limitations beyond state HSTPA. Late fees may not be charged during lease term for some stabilized units, only month-to-month or after lease expiration.",
    rule_details: {
      late_fee_cap: "$50 or 5% of monthly rent (whichever is less) per state law. Rent-stabilized units: late fees only allowed after lease expires or for month-to-month tenancies in many cases.",
      grace_period_days: 5,
      grace_period_required_by_law: true,
      must_be_in_lease: true,
      reasonableness_standard: "State HSTPA cap applies ($50 or 5% cap). Rent-regulated units subject to DHCR oversight. Fee must be specified in lease/renewal but may not be enforceable during lease term for stabilized units.",
      nsf_check_fee_limit: "$20 maximum per HSTPA",
      late_fee_on_late_fee_allowed: false,
      special_rules: "Rent-stabilized units (~1M units in NYC): late fees generally only permitted on holdover tenancies or month-to-month after lease expiration. During active lease term, late fees often prohibited. Preferential rent tenants have additional protections. DHCR opinions control interpretation."
    },
    statute_reference: "NY GOL § 7-108; NYC Rent Stabilization Code; DHCR Operational Bulletin 2016-1",
    effective_date: "2019-06-14",
    last_verified: "2026-03-22",
    confidence: "regulation",
    notes: "NYC rent-stabilized late fee rules extremely complex. DHCR Operational Bulletin 2016-1 interprets when late fees allowed. During active stabilized lease, late fees often unenforceable. Consult DHCR guidance or attorney for specific situations."
  },

  // ========================================
  // FLORIDA - Late Fees
  // ========================================
  {
    topic: "late_fees",
    jurisdiction: "FL",
    rule_summary: "Florida has no statutory cap on late fees. Fees must be reasonable, specified in lease, and not unconscionable. Courts generally uphold 5-10% of monthly rent as reasonable.",
    rule_details: {
      late_fee_cap: "No statutory cap. Must be reasonable and not unconscionable. Courts typically uphold 5-10% of monthly rent. Higher amounts may be challenged but sometimes upheld if justified.",
      grace_period_days: 0,
      grace_period_required_by_law: false,
      must_be_in_lease: true,
      reasonableness_standard: "Late fee must be reasonable estimate of damages and specified in lease. Cannot be unconscionable or penalty. Courts consider proportionality to rent. 10% generally safe, higher amounts scrutinized.",
      nsf_check_fee_limit: "Florida allows $25 for first bad check, $40 for subsequent NSF checks (Fla. Stat. § 68.065) plus bank fees actually incurred. May also add 3x check amount up to $500 through civil action.",
      late_fee_on_late_fee_allowed: false,
      special_rules: "No statutory grace period but common practice is 3-5 days. Daily late fees permitted if reasonable (e.g., $5-10/day after initial fee). Some jurisdictions more tenant-friendly in interpretation. Lease must specifically authorize late fees."
    },
    statute_reference: "Fla. Stat. § 83.49 (general); § 68.065 (NSF checks); common law reasonableness",
    effective_date: "1973-07-01",
    last_verified: "2026-03-22",
    confidence: "case_law",
    notes: "Florida gives landlords flexibility but courts will strike down unconscionable fees. 5-10% safe range. Higher fees (15%+) risky without justification. Grace period not required but market standard is 3-5 days."
  },

  // ========================================
  // ILLINOIS - Late Fees
  // ========================================
  {
    topic: "late_fees",
    jurisdiction: "IL",
    rule_summary: "Illinois has no statewide cap on late fees. Fees must be reasonable and specified in lease. Chicago RLTO imposes strict caps: $10/month for rent up to $500, then 5% for amounts above $500.",
    rule_details: {
      late_fee_cap: "No statewide cap. Must be reasonable. Outside Chicago, courts typically uphold 5-10% of monthly rent as reasonable. Higher amounts may be challenged.",
      grace_period_days: 0,
      grace_period_required_by_law: false,
      must_be_in_lease: true,
      reasonableness_standard: "Common law reasonableness applies outside Chicago. Fee must be proportional to damages from late payment. Cannot be penalty. Courts scrutinize fees over 10% of rent.",
      nsf_check_fee_limit: "No statutory limit. Must be reasonable. Landlord may charge actual bank fees plus reasonable administrative fee (typically $25-50 total).",
      late_fee_on_late_fee_allowed: false,
      special_rules: "Outside Chicago, market practice: 5-day grace period, late fee of 5-10% of rent. Daily late fees permitted if reasonable. Chicago has significantly different rules (see Chicago override)."
    },
    statute_reference: "Common law (no specific statute)",
    effective_date: "1980-01-01",
    last_verified: "2026-03-22",
    confidence: "case_law",
    notes: "No statewide statute. Lease controls but courts enforce reasonableness. Chicago RLTO much stricter - see city override. Outside Chicago, 10% late fee generally safe for rent <$2000."
  },

  // ========================================
  // ILLINOIS - Chicago Late Fees (RLTO)
  // ========================================
  {
    topic: "late_fees",
    jurisdiction: "IL",
    city_override: "Chicago",
    rule_summary: "Chicago RLTO strictly caps late fees at $10/month for first $500 of rent, then 5% of monthly rent for amounts exceeding $500. Fee cannot be charged until rent is 5+ days late.",
    rule_details: {
      late_fee_cap: "$10 per month for rent up to $500, plus 5% of monthly rent exceeding $500. Example: $1,200 rent = $10 + 5% of $700 = $10 + $35 = $45 maximum late fee.",
      grace_period_days: 5,
      grace_period_required_by_law: true,
      must_be_in_lease: true,
      reasonableness_standard: "RLTO sets specific formula (not reasonableness standard). $10 + 5% of rent over $500. Cannot exceed this amount regardless of actual damages or lease terms.",
      nsf_check_fee_limit: "RLTO does not specify NSF fee limit. Common law reasonableness applies. Typical: actual bank fee plus $10-25 administrative fee.",
      late_fee_on_late_fee_allowed: false,
      special_rules: "5-day mandatory grace period (rent due 1st, late fee cannot be charged until 6th). Only one late fee per rental period (no daily fees). Lease must specify fee. Fee cannot exceed statutory formula even if lease says otherwise. RLTO formula is maximum, not guideline."
    },
    statute_reference: "Chicago RLTO § 5-12-140",
    effective_date: "1987-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Chicago late fee cap is among strictest in nation. Formula: $10 + (5% × [rent - $500]). 5-day grace period mandatory. RLTO exemptions: owner-occupied buildings with 6 or fewer units, hotels, dorms, etc."
  },

  // ========================================
  // CALIFORNIA - Rent Increase Rules
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "CA",
    rule_summary: "California has statewide rent control under AB 1482 (Tenant Protection Act). Annual increases capped at 5% + local CPI (max 10% total). Exemptions for buildings <15 years old and certain single-family homes. 30-day notice for <10% increase, 90-day for ≥10%.",
    rule_details: {
      rent_control_exists: true,
      rent_control_type: "Statewide cap (AB 1482 Tenant Protection Act)",
      max_annual_increase: "5% + local CPI, not to exceed 10% total",
      notice_required_days: 30,
      notice_must_be_written: true,
      applies_to_month_to_month: true,
      applies_to_fixed_term: false,
      exempt_properties: "Buildings <15 years old, single-family homes owned by natural persons or LLCs with <3 properties (if buyer given notice), condos, duplexes where owner occupies one unit, affordable housing",
      retaliation_protections: true,
      frequency_limit: "Once per 12 months (or twice if total increase ≤10%)",
      special_rules: "90-day written notice required if increase is 10% or more (aggregate over 12 months). Applies to most residential tenancies after initial lease term. Local rent control ordinances may be stricter and override state law."
    },
    statute_reference: "Cal. Civ. Code § 1947.12 (AB 1482)",
    effective_date: "2020-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "AB 1482 sunsets in 2030 unless extended. CPI calculation varies by region (uses CPI for All Urban Consumers). 15-year exemption is rolling (e.g., building completed 2024 is exempt until 2039). Retaliation protection in Cal. Civ. Code § 1942.5."
  },

  // ========================================
  // CALIFORNIA - Los Angeles Rent Increase (RSO)
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "CA",
    city_override: "Los Angeles",
    rule_summary: "LA RSO covers buildings built before 10/1/1978. Annual increase set by LAHD based on CPI, typically 3-8%. Much stricter than state AB 1482. Banking of unused increases allowed.",
    rule_details: {
      rent_control_exists: true,
      rent_control_type: "Local rent stabilization ordinance (RSO)",
      max_annual_increase: "Set annually by LAHD based on 60-100% of CPI. Recent years: 3-4% typical. 2024: 4%.",
      notice_required_days: 30,
      notice_must_be_written: true,
      applies_to_month_to_month: true,
      applies_to_fixed_term: false,
      exempt_properties: "Buildings built on/after 10/1/1978, single-family homes, condos (unless master-leased), luxury units, government-subsidized affordable housing",
      retaliation_protections: true,
      frequency_limit: "Once per 12 months on anniversary of tenancy or July 1",
      special_rules: "Banking allowed: landlord can bank unused increases and apply cumulatively (but still limited to one increase per year). Rental unit registration with LAHD required. 60-day notice for seniors/disabled. Vacancy decontrol (can reset to market rate between tenants)."
    },
    statute_reference: "LAMC § 151.00 et seq. (RSO)",
    effective_date: "1979-05-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "RSO percentage changes annually and is announced by LAHD each year (typically June/July for July 1 effective date). Banking provision unique to LA. Non-RSO units in LA follow state AB 1482 rules."
  },

  // ========================================
  // CALIFORNIA - San Francisco Rent Increase
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "CA",
    city_override: "San Francisco",
    rule_summary: "San Francisco Rent Ordinance applies to buildings built before 6/13/1979. Annual increase tied to 60% of CPI. Stricter than state law. No banking of increases.",
    rule_details: {
      rent_control_exists: true,
      rent_control_type: "Local rent control ordinance (San Francisco Rent Ordinance)",
      max_annual_increase: "60% of CPI (annual percentage set by Rent Board, typically 1.8-3.3%). 2024: 2.3%.",
      notice_required_days: 30,
      notice_must_be_written: true,
      applies_to_month_to_month: true,
      applies_to_fixed_term: false,
      exempt_properties: "Buildings built on/after 6/13/1979, single-family homes, condos, buildings with 2 or fewer units where owner occupied since 1/1/1996",
      retaliation_protections: true,
      frequency_limit: "Once per 12 months from date of previous increase",
      special_rules: "No banking of increases (unlike LA). Tenant buyout agreements heavily regulated. Capital improvement pass-throughs allowed with Rent Board approval. Vacancy decontrol applies but subsequent increases controlled."
    },
    statute_reference: "San Francisco Rent Ordinance § 37.3",
    effective_date: "1979-06-13",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "SF Rent Board sets annual percentage each March. Recent trend: 2.0-2.5%. Lower than LA due to 60% CPI formula. Costa-Hawkins Act allows vacancy decontrol. Non-covered units follow state AB 1482."
  },

  // ========================================
  // TEXAS - Rent Increase Rules
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "TX",
    rule_summary: "Texas has no rent control and state law expressly prohibits local rent control. No statutory notice requirement for rent increases. Landlord-friendly; increases governed by lease terms only.",
    rule_details: {
      rent_control_exists: false,
      rent_control_type: "None (state law prohibits local rent control)",
      max_annual_increase: "No statutory limit",
      notice_required_days: 0,
      notice_must_be_written: false,
      applies_to_month_to_month: true,
      applies_to_fixed_term: false,
      exempt_properties: "N/A - no rent control exists",
      retaliation_protections: true,
      frequency_limit: "No statutory limit",
      special_rules: "Tex. Prop. Code § 214.902 prohibits municipalities from enacting rent control. Lease controls notice period (if any). Month-to-month: no statutory notice but industry practice is 30 days. Fixed-term: increase only at renewal. Retaliation prohibited for 6 months after tenant complaint (Tex. Prop. Code § 92.331)."
    },
    statute_reference: "Tex. Prop. Code § 214.902 (rent control prohibition)",
    effective_date: "1985-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Texas is one of the most landlord-friendly states for rent increases. Market forces alone determine rent levels. Austin and other cities have attempted rent control but state preemption prevents it. Lease terms are king."
  },

  // ========================================
  // NEW YORK - Rent Increase Rules
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "NY",
    rule_summary: "New York has no statewide rent cap for market-rate units. Rent-stabilized/controlled units in NYC have increases set by Rent Guidelines Board. HSTPA (2019) limits certain renewal increases.",
    rule_details: {
      rent_control_exists: true,
      rent_control_type: "Local only (NYC Rent Stabilization/Control), no statewide cap for market-rate",
      max_annual_increase: "Market-rate units: no statutory limit. Rent-stabilized: RGB sets annual rates (recent: 2-5% for 1-year leases). Good Cause Eviction (2024) limits increases to 10% or 5% + CPI in covered units.",
      notice_required_days: 30,
      notice_must_be_written: true,
      applies_to_month_to_month: true,
      applies_to_fixed_term: false,
      exempt_properties: "Good Cause Eviction exemptions: buildings <6 units, post-2009 construction, units >$245,000 value, subsidized affordable housing",
      retaliation_protections: true,
      frequency_limit: "Once per lease term for market-rate. RGB sets annual rates for stabilized units.",
      special_rules: "NYC rent-stabilized units (~1M): increases set annually by RGB (different rates for 1-year vs 2-year leases). Good Cause Eviction law (2024) caps increases at 10% or 5% + CPI (whichever less) for covered units. Vacancy bonus eliminated by HSTPA (2019). Preferential rent rules complex."
    },
    statute_reference: "NY RPL § 226-c (Good Cause); NYC Rent Stabilization Law",
    effective_date: "2024-04-20",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Good Cause Eviction (2024) applies statewide outside NYC but has significant exemptions. NYC rent regulation predates this and is more comprehensive. RGB votes on increases each June for July 1 effective date. Recent trend: 2-4% for 1-year leases."
  },

  // ========================================
  // NEW YORK - NYC Rent Increase (Rent Stabilization)
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "NY",
    city_override: "New York City",
    rule_summary: "NYC Rent Guidelines Board sets annual increases for ~1M rent-stabilized units. Separate rates for 1-year and 2-year leases. HSTPA (2019) eliminated vacancy bonus and capped preferential rent increases.",
    rule_details: {
      rent_control_exists: true,
      rent_control_type: "Rent Stabilization (RGB sets annual increases) + Rent Control (DHCR for ~16k very old units)",
      max_annual_increase: "RGB sets annually (recent: 2-5% for 1-year, 3-6% for 2-year). 2024: 2.75% (1-year), 5.25% (2-year). Rent-controlled units: biennial increases by DHCR (typically 5-7%).",
      notice_required_days: 30,
      notice_must_be_written: true,
      applies_to_month_to_month: false,
      applies_to_fixed_term: true,
      exempt_properties: "Post-1974 construction (outside stabilization), owner-occupied <6 units, co-ops/condos (unless converted), luxury decontrol ($2,971+ rent when vacant)",
      retaliation_protections: true,
      frequency_limit: "Once per lease renewal (annually or biennially)",
      special_rules: "HSTPA eliminated: vacancy bonus, high-rent/high-income decontrol, longevity increases. Preferential rent increases limited to RGB rates (landlord cannot jump to legal regulated rent). Major Capital Improvements (MCI) capped at 2% annually. Individual Apartment Improvements (IAI) capped at $15k over 15 years."
    },
    statute_reference: "NYC Rent Stabilization Code; HSTPA (2019)",
    effective_date: "2019-06-14",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "RGB votes on increases annually (June for July 1 effective). Rent-controlled units (<20k remain) have separate DHCR process. Market-rate units in NYC follow statewide rules (generally no cap unless Good Cause applies). Preferential rent reforms significantly limit landlord flexibility."
  },

  // ========================================
  // FLORIDA - Rent Increase Rules
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "FL",
    rule_summary: "Florida has no rent control and state law preempts local rent control. No statutory notice requirement for rent increases beyond lease terms. Landlord-friendly market-rate environment.",
    rule_details: {
      rent_control_exists: false,
      rent_control_type: "None (state preemption of local rent control)",
      max_annual_increase: "No statutory limit",
      notice_required_days: 0,
      notice_must_be_written: false,
      applies_to_month_to_month: true,
      applies_to_fixed_term: false,
      exempt_properties: "N/A - no rent control exists",
      retaliation_protections: true,
      frequency_limit: "No statutory limit",
      special_rules: "Fla. Stat. § 166.043 preempts local rent control ordinances. Month-to-month: no statutory notice required but lease may specify (common: 30-60 days). Fixed-term: increase only at renewal. Retaliation prohibited (Fla. Stat. § 83.64). Miami Beach and other cities attempted rent control but struck down by state preemption."
    },
    statute_reference: "Fla. Stat. § 166.043 (local rent control preemption)",
    effective_date: "1977-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Florida aggressively preempts local rent control. Miami Beach ordinance struck down. No statutory notice for increases but lease terms control. Industry standard: 60-90 days notice for month-to-month. Retaliation protection exists but no procedural requirements for increases."
  },

  // ========================================
  // ILLINOIS - Rent Increase Rules
  // ========================================
  {
    topic: "rent_increase",
    jurisdiction: "IL",
    rule_summary: "Illinois has no statewide rent control. State preemption repealed in 1997 but no municipality has enacted rent control since. No statutory notice requirement for increases. Chicago and other cities could theoretically enact rent control.",
    rule_details: {
      rent_control_exists: false,
      rent_control_type: "None (state preemption repealed 1997, but no local ordinances enacted)",
      max_annual_increase: "No statutory limit",
      notice_required_days: 0,
      notice_must_be_written: false,
      applies_to_month_to_month: true,
      applies_to_fixed_term: false,
      exempt_properties: "N/A - no rent control exists",
      retaliation_protections: true,
      frequency_limit: "No statutory limit",
      special_rules: "Illinois repealed state preemption in 1997, allowing municipalities to enact rent control, but none have (including Chicago). Month-to-month: no statutory notice but lease may specify (common: 30 days). Fixed-term: increase at renewal only. Chicago RLTO does not regulate rent increases (only deposits, late fees, evictions). Retaliation prohibited."
    },
    statute_reference: "765 ILCS 715/1 (rent control preemption repealed 1997)",
    effective_date: "1997-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Illinois is unusual - preemption repealed but no cities enacted rent control despite ability. Chicago debated it in 2021-2022 but did not pass. RLTO is silent on rent increases. Lease terms govern notice periods. Industry standard: 30-60 days."
  },

  // ========================================
  // CALIFORNIA - Habitability Standards
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "CA",
    rule_summary: "California has strong habitability protections under the implied warranty of habitability. Landlords must provide weatherproof structures, working utilities, clean/sanitary conditions. Tenants can repair and deduct (up to 1 month's rent) or withhold rent for serious violations.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "Cal. Civ. Code §§ 1941-1942.5",
      minimum_requirements: "Effective waterproofing and weather protection; plumbing/gas facilities in good working order; hot/cold running water; heating facilities; electrical lighting; clean/sanitary building, grounds, and appurtenances; adequate trash receptacles; floors, stairways, railings in good repair; deadbolt locks on exterior doors; working smoke detectors; natural light in every room",
      heat_required: true,
      heat_minimum_temp: "No specific temperature in statute, but must be adequate heating facilities",
      hot_water_required: true,
      pest_control_responsibility: "Landlord responsible for pest control unless infestation caused by tenant's lack of cleanliness",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: true,
      lead_paint_compliance: "Federal disclosure required for pre-1978 housing. CA additional requirements for lead hazard inspection/disclosure in certain circumstances.",
      repair_request_process: "Tenant should give written notice to landlord or property manager describing the issue. Certified mail recommended for documentation.",
      repair_timeline_days: "Reasonable time (typically 30 days for non-urgent, 24-72 hours for urgent like no heat/water)",
      rent_withholding_allowed: true,
      repair_and_deduct_allowed: true,
      repair_and_deduct_limit: "Up to 1 month's rent, maximum twice per 12-month period. Repair must not exceed 1 month's rent. 30-day notice to landlord required first.",
      code_enforcement_available: true,
      tenant_remedies: "Repair and deduct, rent withholding (pay into escrow), sue for damages, report to code enforcement, terminate lease after proper notice, sue for injunctive relief. Green v. Superior Court allows rent reduction commensurate with diminished value.",
      retaliation_protection: true
    },
    statute_reference: "Cal. Civ. Code §§ 1941-1942.5; Green v. Superior Court (1974) 10 Cal.3d 616",
    effective_date: "1974-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Cal. Civ. Code § 1942.5 prohibits retaliation within 180 days of tenant complaint. Green case established rent reduction remedy. Local building codes may impose stricter requirements. CO detectors required in units with fossil fuel appliances or attached garages."
  },

  // ========================================
  // CALIFORNIA - Los Angeles Habitability (REAP)
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "CA",
    city_override: "Los Angeles",
    rule_summary: "Los Angeles enforces state habitability standards plus local REAP (Rent Escrow Account Program). Buildings with serious code violations are placed in REAP, requiring rent to be paid into escrow until repairs completed. LAHD inspects and enforces.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "Cal. Civ. Code §§ 1941-1942.5; LAMC Chapter XI (Housing Code)",
      minimum_requirements: "All state requirements plus: proper ventilation, adequate kitchen facilities, proper refuse storage, compliance with LA Housing Code and Building Code. SCEP (Systematic Code Enforcement Program) targets substandard housing.",
      heat_required: true,
      heat_minimum_temp: "No specific temperature but heating system must maintain comfortable temperature per LA Housing Code",
      hot_water_required: true,
      pest_control_responsibility: "Landlord unless tenant caused infestation. Bedbug treatment is landlord responsibility in multi-unit buildings.",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: true,
      lead_paint_compliance: "Federal + state requirements. LAHD may require additional testing/remediation during SCEP inspections.",
      repair_request_process: "Written notice to landlord. Tenant can also file complaint with LAHD (888-LA4-RENT). LAHD will inspect and issue NOV (Notice of Violation) if warranted.",
      repair_timeline_days: "30 days typical. LAHD NOVs specify compliance deadlines (often 30-60 days depending on severity). Class 1 violations (immediate hazard): 24-48 hours.",
      rent_withholding_allowed: true,
      repair_and_deduct_allowed: true,
      repair_and_deduct_limit: "1 month's rent per state law. REAP: rent paid into city escrow account if property has serious violations.",
      code_enforcement_available: true,
      tenant_remedies: "All state remedies plus: REAP (Rent Escrow Account Program) for buildings with substandard conditions. LAHD inspection, NOV enforcement, SCEP for problem properties. Rent reduction through REAP or court. Relocation assistance if unit uninhabitable.",
      retaliation_protection: true
    },
    statute_reference: "LAMC Chapter XI; Cal. Civ. Code §§ 1941-1942.5",
    effective_date: "1970-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "REAP is unique to LA - rent goes into escrow and landlord cannot access until repairs made. SCEP targets worst properties for systematic inspection. RSO properties have additional inspection requirements. LAHD: (888) 524-2604 for habitability complaints."
  },

  // ========================================
  // TEXAS - Habitability Standards
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "TX",
    rule_summary: "Texas recognizes implied warranty of habitability but it's narrower than many states. Landlord must maintain property in condition fit for human habitation and make diligent repairs. Tenant must give written notice and reasonable time. Repair and deduct available after specific steps.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "Tex. Prop. Code §§ 92.052-92.0563; Kamarath v. Bennett (1977)",
      minimum_requirements: "Condition suitable for human habitation and in reasonable repair. Must comply with applicable building and housing codes. Specifically: weatherproof roof/walls, functional doors/windows, working plumbing/water heater, safe electrical system, functioning HVAC as provided, reasonable security (working locks), freedom from health hazards.",
      heat_required: true,
      heat_minimum_temp: "No statutory temperature requirement. System must function as designed/contracted.",
      hot_water_required: true,
      pest_control_responsibility: "Landlord unless infestation caused by tenant. Landlord must treat bedbug infestation unless tenant caused it.",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: false,
      lead_paint_compliance: "Federal disclosure for pre-1978 housing. No additional state requirements.",
      repair_request_process: "Written notice required describing problem and requesting repair. Notice to landlord's agent/manager sufficient. Certified mail or hand-delivery recommended.",
      repair_timeline_days: "Reasonable time (statute: 7 days for urgent repairs affecting health/safety after notice; 3 days for A/C in extreme heat; 30 days for non-urgent)",
      rent_withholding_allowed: false,
      repair_and_deduct_allowed: true,
      repair_and_deduct_limit: "One month's rent or $500 (whichever greater) per repair event. Tenant must: (1) give notice, (2) wait reasonable time, (3) get repair estimate, (4) give landlord estimate + chance to cure, (5) then repair and deduct. Complex process.",
      code_enforcement_available: true,
      tenant_remedies: "Repair and deduct (after statutory process), terminate lease after proper notice if failure material, sue for actual damages, report to code enforcement, request city inspection. No rent withholding (must pay rent then sue for abatement).",
      retaliation_protection: true
    },
    statute_reference: "Tex. Prop. Code §§ 92.052-92.0563; Tex. Prop. Code § 92.331 (retaliation)",
    effective_date: "1977-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Kamarath case established implied warranty. Texas repair and deduct is more restrictive than CA - must follow statutory steps precisely. A/C in extreme heat (above 85°F) requires 3-day response per § 92.0563. Retaliation prohibited for 6 months after complaint. No CO detector requirement statewide (some cities require)."
  },

  // ========================================
  // NEW YORK - Habitability Standards
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "NY",
    rule_summary: "New York has strong implied warranty of habitability. Landlord must maintain premises in good repair, comply with housing codes, and provide essential services. NYC Housing Maintenance Code is one of nation's most comprehensive. Tenants can withhold rent (pay into escrow) or sue for rent reduction.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "NY RPL § 235-b; Multiple Dwelling Law; Park West Management v. Mitchell (1980)",
      minimum_requirements: "Premises fit for human habitation. Must comply with housing, building, and health codes. Heat and hot water, working plumbing, structural integrity, freedom from pests, proper lighting and ventilation, working smoke/CO detectors, secure entrance doors and locks, adequate trash removal.",
      heat_required: true,
      heat_minimum_temp: "NYC: 68°F day (6am-10pm), 62°F night when outdoor temp below 55°F (Oct 1-May 31). Statewide statute requires heat but no specific temp outside NYC.",
      hot_water_required: true,
      pest_control_responsibility: "Landlord responsible. Must take reasonable measures to prevent/eliminate pests including rodents, cockroaches, bedbugs.",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: true,
      lead_paint_compliance: "Federal disclosure plus NY requires annual lead disclosure/notice. NYC has stricter Local Law 1 requirements for units with children under 6.",
      repair_request_process: "Written notice to landlord recommended. NYC: can file HPD complaint online or by phone (311). HPD will inspect and issue violations if warranted.",
      repair_timeline_days: "Reasonable time (generally 30 days). NYC violations: Class C (24 hours), Class B (30 days), Class A (90 days). Hazardous violations (DHPD): immediate.",
      rent_withholding_allowed: true,
      repair_and_deduct_allowed: false,
      repair_and_deduct_limit: "Not applicable - NY does not allow repair and deduct",
      code_enforcement_available: true,
      tenant_remedies: "Rent withholding (HP Action - deposit rent with court), sue for rent reduction (rent abatement), sue for damages, HPD complaint (NYC), terminate lease if breach material, emergency repairs by tenant in limited circumstances. HP Action can compel repairs.",
      retaliation_protection: true
    },
    statute_reference: "NY RPL § 235-b; Multiple Dwelling Law § 78; Park West Management v. Mitchell (1980) 47 N.Y.2d 316",
    effective_date: "1980-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Park West case established strong implied warranty. HP (Housing Part) Action allows tenant to deposit rent with court while compelling repairs. NYC heat season: Oct 1-May 31. Retaliation prohibited. NYC HPD: (311) for complaints. CO detectors required statewide since 2015."
  },

  // ========================================
  // NEW YORK - NYC Habitability (Housing Maintenance Code)
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "NY",
    city_override: "New York City",
    rule_summary: "NYC Housing Maintenance Code is one of most detailed in the nation. HPD enforces violations classified as Class A (hazardous), B (serious), or C (immediately hazardous). Heat/hot water requirements strictly enforced. HP Actions in Housing Court for tenant-initiated enforcement.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "NYC Housing Maintenance Code; NYC Admin Code Title 27; Multiple Dwelling Law",
      minimum_requirements: "All state requirements plus: specific heat/hot water temperatures, window guards for children, proper lighting (10 lumens/sq ft), ventilation standards, elevator maintenance (buildings 6+ floors), fire safety equipment, proper egress, peeling paint remediation (lead presumption), extermination services.",
      heat_required: true,
      heat_minimum_temp: "68°F day (6am-10pm), 62°F night (10pm-6am) when outdoor temp below 55°F. Heat season: October 1 - May 31. Violations for non-compliance.",
      hot_water_required: true,
      pest_control_responsibility: "Landlord must provide extermination services and take preventive measures. Bedbug disclosure required. Monthly extermination in some buildings.",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: true,
      lead_paint_compliance: "Local Law 1: annual notice to tenants, visual inspection, XRF testing if child under 6, presumption of lead paint in pre-1960 buildings, strict remediation requirements for peeling paint.",
      repair_request_process: "Written notice to landlord or managing agent. File HPD complaint: 311 or online portal. HPD will inspect and issue violations. Tenant can also file HP Action in Housing Court.",
      repair_timeline_days: "Class C (immediately hazardous): 24 hours. Class B (hazardous): 30 days. Class A (non-hazardous): 90 days. Emergency repairs: immediate.",
      rent_withholding_allowed: true,
      repair_and_deduct_allowed: false,
      repair_and_deduct_limit: "N/A - repair and deduct not allowed in NY",
      code_enforcement_available: true,
      tenant_remedies: "HPD complaint (311), HP Action (Housing Court - deposit rent while compelling repairs), 7A Administrator (court appoints repair administrator), OATH hearings for violations, rent reduction/abatement, sue for damages, emergency repair in limited circumstances. Alternative Enforcement Program (AEP) for worst buildings.",
      retaliation_protection: true
    },
    statute_reference: "NYC Housing Maintenance Code; NYC Admin Code Title 27; Multiple Dwelling Law",
    effective_date: "1968-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "HPD violation classes: C (immediate hazard like no heat in winter), B (serious like leaks), A (maintenance like peeling paint). 7A Administrator program for landlords who chronically fail to maintain property. AEP targets worst buildings. Window guards required in all apartments where children 10 and under reside."
  },

  // ========================================
  // FLORIDA - Habitability Standards
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "FL",
    rule_summary: "Florida Residential Landlord and Tenant Act requires landlord to comply with building codes, maintain structural components, and provide functioning facilities. Tenant can withhold rent after 7-day written notice for material violations, or terminate lease after 20 days if not repaired.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "Fla. Stat. § 83.51; Mansur v. Eubanks (1970)",
      minimum_requirements: "Comply with building, housing, and health codes. Maintain roofs, windows, doors, floors, steps, porches, exterior walls, foundations in good repair. Maintain plumbing in reasonable working condition. Provide functioning facilities for heat, running water, hot water. Maintain common areas. Exterminate pests (unless tenant caused).",
      heat_required: true,
      heat_minimum_temp: "No statutory temperature requirement. Heating facilities must function if provided/contracted.",
      hot_water_required: true,
      pest_control_responsibility: "Landlord responsible for extermination unless infestation caused by tenant's actions. Tenant responsible for keeping unit clean.",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: false,
      lead_paint_compliance: "Federal disclosure for pre-1978 housing. No additional state requirements.",
      repair_request_process: "Written notice required describing problem and requesting repair. Notice should be delivered to landlord or managing agent's address specified in lease.",
      repair_timeline_days: "7 days after written notice for material violations. If not repaired within 7 days, tenant may withhold rent or terminate. 20 days for less urgent repairs.",
      rent_withholding_allowed: true,
      repair_and_deduct_allowed: false,
      repair_and_deduct_limit: "N/A - repair and deduct not allowed in FL",
      code_enforcement_available: true,
      tenant_remedies: "Withhold rent after 7-day notice (pay into escrow or court deposit), terminate lease after proper notice if landlord fails to repair material violations, sue for damages, report to code enforcement. If tenant withholds rent improperly, landlord can file eviction.",
      retaliation_protection: true
    },
    statute_reference: "Fla. Stat. §§ 83.51, 83.60, 83.64; Mansur v. Eubanks (1970) 232 So.2d 234",
    effective_date: "1970-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Mansur case established implied warranty. Tenant must pay rent into escrow (not just stop paying) to properly withhold. § 83.60(1) allows tenant to terminate if landlord materially fails to comply. § 83.64 prohibits retaliation. No CO detector requirement statewide (some counties require). Rent withholding procedure must be followed precisely or tenant faces eviction."
  },

  // ========================================
  // ILLINOIS - Habitability Standards
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "IL",
    rule_summary: "Illinois recognizes implied warranty of habitability. Residential Tenants' Right to Repair Act allows repair and deduct for violations affecting health/safety or exceeding $500, after 14-day notice. Common law also allows rent withholding and other remedies.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "765 ILCS 735/ (Residential Tenants' Right to Repair Act); Jack Spring, Inc. v. Little (1972)",
      minimum_requirements: "Fit and habitable for living. Compliance with municipal building codes. Working plumbing, heating, electrical systems. Weatherproof structure. Safe and sanitary condition. Landlord must maintain common areas and make necessary repairs.",
      heat_required: true,
      heat_minimum_temp: "Chicago: 68°F when outdoor temp below 55°F (Sept 15-June 1). Statewide: no specific temperature but adequate heat required.",
      hot_water_required: true,
      pest_control_responsibility: "Landlord responsible for extermination and prevention unless tenant caused infestation through lack of cleanliness.",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: true,
      lead_paint_compliance: "Federal disclosure for pre-1978 housing. Chicago has additional Local Ordinance requirements for disclosure and remediation.",
      repair_request_process: "Written notice to landlord describing problem and requesting repair. Notice should be sent by certified mail or hand-delivered. Keep copies.",
      repair_timeline_days: "14 days after written notice under Right to Repair Act. If affecting health/safety or repair >$500, tenant may repair and deduct after 14 days. Reasonable time for other repairs.",
      rent_withholding_allowed: true,
      repair_and_deduct_allowed: true,
      repair_and_deduct_limit: "$500 or half month's rent (whichever greater) for repairs affecting health/safety. Must give 14-day written notice first. Cannot use more than twice per year.",
      code_enforcement_available: true,
      tenant_remedies: "Repair and deduct (after 14-day notice for health/safety or >$500 repairs), rent withholding (pay into escrow), sue for damages, terminate lease if breach material, report to building inspector, sue for injunctive relief. Chicago: additional RLTO remedies.",
      retaliation_protection: true
    },
    statute_reference: "765 ILCS 735/1 et seq.; 765 ILCS 742/5 (Safe Homes Act); Jack Spring, Inc. v. Little (1972) 50 Ill.2d 351",
    effective_date: "1972-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Jack Spring case established implied warranty. Right to Repair Act codified repair and deduct remedy. Chicago RLTO has additional remedies (see city override). CO detectors required statewide in units with fossil fuel appliances. Safe Homes Act (765 ILCS 742/5) allows domestic violence victims to terminate lease early."
  },

  // ========================================
  // ILLINOIS - Chicago Habitability (RLTO)
  // ========================================
  {
    topic: "habitability",
    jurisdiction: "IL",
    city_override: "Chicago",
    rule_summary: "Chicago RLTO adds remedies beyond state law for habitability violations. Tenant can terminate lease with 14 days notice if landlord fails to maintain. Heat requirements strictly enforced (68°F Sept 15-June 1). Landlord must provide written heating disclosure.",
    rule_details: {
      implied_warranty_exists: true,
      statutory_basis: "Chicago RLTO § 5-12-110; 765 ILCS 735/1 (state Right to Repair Act)",
      minimum_requirements: "All state requirements plus: compliance with Chicago Building Code, heat from Sept 15-June 1 (68°F minimum), proper ventilation, weatherproofing, functional utilities, pest control, secure locks, smoke/CO detectors, landlord must provide summary of RLTO rights.",
      heat_required: true,
      heat_minimum_temp: "68°F when outdoor temperature is below 55°F, from September 15 through June 1. Landlord must provide written disclosure of heating source and responsibilities.",
      hot_water_required: true,
      pest_control_responsibility: "Landlord responsible for extermination and prevention unless infestation caused by tenant. Must respond within reasonable time to tenant complaints.",
      mold_disclosure_required: false,
      smoke_detector_required: true,
      carbon_monoxide_detector_required: true,
      lead_paint_compliance: "Federal disclosure plus Chicago Lead Poisoning Prevention Ordinance requires testing and remediation in units with children under 6. Annual certification required for pre-1978 buildings.",
      repair_request_process: "Written notice to landlord. RLTO requires landlord to provide contact information for repair requests. Tenant can file complaint with City of Chicago (311) or Department of Buildings.",
      repair_timeline_days: "14 days under RLTO. If landlord fails to maintain, tenant may terminate lease with 14 days written notice. Critical repairs (no heat, no water): 72 hours typical.",
      rent_withholding_allowed: true,
      repair_and_deduct_allowed: true,
      repair_and_deduct_limit: "$500 or half month's rent (whichever greater) per state law. RLTO allows tenant to terminate lease as additional remedy.",
      code_enforcement_available: true,
      tenant_remedies: "All state remedies plus: terminate lease with 14 days notice for landlord failure to maintain (RLTO § 5-12-110), sue for 2x damages for RLTO violations, file complaint with City (311), request building inspection, rent reduction, court-ordered repairs. Enhanced retaliation protection (2x rent + attorney fees).",
      retaliation_protection: true
    },
    statute_reference: "Chicago RLTO § 5-12-110; Municipal Code of Chicago",
    effective_date: "1987-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "RLTO gives tenants stronger remedies than state law - can terminate lease with 14 days notice if landlord fails to maintain. Heat disclosure required at lease signing. Lead ordinance stricter than state (annual testing for pre-1978 units with kids under 6). Retaliation prohibited for 12 months after complaint (vs. no specified period in state law)."
  },

  // ===========================
  // LEASE TERMINATION RULES
  // ===========================

  // California - Lease Termination
  {
    topic: "lease_termination",
    jurisdiction: "CA",
    rule_summary: "California landlords must mitigate damages if tenant breaks lease early. Domestic violence/sexual assault/stalking victims can terminate with 14-day written notice and documentation (Cal. Civ. Code § 1946.7). Month-to-month tenants give 30 days notice; landlords give 30 days (<1 year tenancy) or 60 days (≥1 year). Abandoned property must be stored for 18 days with notice sent to tenant (Cal. Civ. Code §§ 1983-1984). Subletting prohibited unless lease allows.",
    rule_details: {
      early_termination_allowed: false,
      early_termination_penalty: "Tenant liable for rent until landlord re-rents or lease expires (whichever first). Landlord must make reasonable efforts to mitigate.",
      landlord_duty_to_mitigate: true,
      military_termination_right: true,
      military_notice_days: 30,
      domestic_violence_termination: true,
      domestic_violence_notice_days: "14 days written notice",
      domestic_violence_documentation: "Copy of restraining order, police report within 180 days, written statement from victim services provider, court record, or medical professional documentation",
      month_to_month_tenant_notice_days: 30,
      month_to_month_landlord_notice_days: 30,
      fixed_term_auto_renewal_rules: "Auto-renewal clauses allowed but must be in bold/underlined 8-point font. Tenant can terminate on 30 days notice if clause not properly formatted.",
      abandonment_definition: "Tenant absent for 14+ consecutive days without notice + rent unpaid",
      abandonment_timeline_days: 18,
      abandoned_property_rules: "Landlord must send notice to tenant's last known address + forwarding address if any. After 18 days, landlord can sell (if value >$700) or dispose (if <$700). Proceeds go to costs, then rent owed, then to county if unclaimed. Cal. Civ. Code §§ 1983-1984.",
      subletting_default_rule: "Prohibited unless lease expressly allows. Landlord can reasonably withhold consent (case law).",
      death_of_tenant_rules: "Lease does not automatically terminate. Estate/next-of-kin must give 30-day notice. Security deposit returned to estate/heirs after deductions."
    },
    statute_reference: "Cal. Civ. Code §§ 1946, 1946.1, 1946.7, 1951.2, 1983-1984",
    effective_date: "2010-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "AB 2847 (2010) created DV early termination right. Landlord duty to mitigate comes from Cal. Civ. Code § 1951.2 case law. Notice periods increased from 30 to 60 days for tenancies ≥1 year under AB 2343 (2020)."
  },

  // Texas - Lease Termination
  {
    topic: "lease_termination",
    jurisdiction: "TX",
    rule_summary: "Texas has no statutory duty to mitigate damages, but some courts have imposed common law duty in certain cases. Domestic violence/sexual assault/stalking victims can terminate early (Tex. Prop. Code § 92.016) with 30-day notice and documentation. Month-to-month requires 30-day notice from either party (assuming monthly rent period). Abandoned property held for 30-60 days depending on circumstance. Subletting allowed unless lease prohibits.",
    rule_details: {
      early_termination_allowed: false,
      early_termination_penalty: "Tenant liable for remainder of lease term. No statutory duty to mitigate, but Austin Apartment Assn. v. Saldana (2006) suggests common law duty may exist.",
      landlord_duty_to_mitigate: false,
      military_termination_right: true,
      military_notice_days: 30,
      domestic_violence_termination: true,
      domestic_violence_notice_days: "30 days written notice",
      domestic_violence_documentation: "Copy of protective order, documentation from law enforcement/court/licensed medical professional showing family violence occurred within past 6 months",
      month_to_month_tenant_notice_days: 30,
      month_to_month_landlord_notice_days: 30,
      fixed_term_auto_renewal_rules: "Automatic renewal clauses valid if tenant notified in bold/underlined 14-point font. Must give 30-60 days advance notice of renewal.",
      abandonment_definition: "Tenant absent + rent unpaid + no reasonable indication tenant will return",
      abandonment_timeline_days: 30,
      abandoned_property_rules: "Landlord must send notice to last known address. If value <$3,000: hold 60 days. If value ≥$3,000: hold 60 days then sell at auction. Proceeds to landlord for costs/rent, excess to tenant if claimed within 1 year. Tex. Prop. Code § 92.014.",
      subletting_default_rule: "Allowed unless lease prohibits. Landlord approval typically required per lease terms.",
      death_of_tenant_rules: "Lease continues. Estate responsible for rent until lease expires or estate terminates per lease terms. Landlord may negotiate early termination with estate."
    },
    statute_reference: "Tex. Prop. Code §§ 91.001, 92.014, 92.016, 92.019",
    effective_date: "2007-09-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Texas is landlord-friendly with no clear statutory duty to mitigate. Case law (Austin Apartment Assn. v. Saldana) creates some uncertainty. DV termination right added 2007."
  },

  // New York - Lease Termination
  {
    topic: "lease_termination",
    jurisdiction: "NY",
    rule_summary: "New York landlords have common law duty to mitigate damages when tenant breaks lease. Domestic violence/stalking victims can terminate (NY Real Prop. Law § 227-c) with 30-day notice. Month-to-month notice periods vary by length of tenancy: 30 days (<1 year), 60 days (1-2 years), 90 days (≥2 years). Strict abandoned property rules require storage and notice. Subletting requires landlord consent (cannot unreasonably refuse).",
    rule_details: {
      early_termination_allowed: false,
      early_termination_penalty: "Tenant liable for rent until landlord re-rents or lease expires. Landlord must make reasonable efforts to mitigate (Holy Properties v. Kenneth Cole Productions case law).",
      landlord_duty_to_mitigate: true,
      military_termination_right: true,
      military_notice_days: 30,
      domestic_violence_termination: true,
      domestic_violence_notice_days: "30 days written notice",
      domestic_violence_documentation: "Order of protection, police report, medical documentation, signed affidavit from licensed social worker/counselor/advocate, or court record of conviction",
      month_to_month_tenant_notice_days: 30,
      month_to_month_landlord_notice_days: 30,
      fixed_term_auto_renewal_rules: "Automatic renewal clauses for terms >1 month void unless advance notice given (15-30 days depending on lease length) in separate document with prominent notice.",
      abandonment_definition: "Tenant absent, rent unpaid, landlord has reasonable belief tenant abandoned (objective indicators required)",
      abandonment_timeline_days: 30,
      abandoned_property_rules: "Landlord must send written notice to tenant's last known address + any forwarding address. Store property safely. If unclaimed after reasonable time (typically 30 days), may sell at public or private sale. Proceeds to costs, rent owed, then tenant if claimed. RPAPL § 7-109.",
      subletting_default_rule: "Allowed with landlord consent. Landlord cannot unreasonably withhold consent (NY Real Prop. Law § 226-b). Sublease request must be in writing with specific info.",
      death_of_tenant_rules: "In NYC rent-stabilized units, family members who lived with deceased tenant for 2+ years can succeed to lease. Otherwise, estate must continue paying or negotiate termination. RPL § 236."
    },
    statute_reference: "NY Real Prop. Law §§ 226-b, 227-c, 232-c, 236; RPAPL § 7-109",
    effective_date: "2019-06-14",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Duty to mitigate established by case law (Holy Properties). DV termination strengthened in 2019 HSTPA. Notice periods for month-to-month increased to 30/60/90 days (up from 30 days flat) under HSTPA. NYC has additional succession rights for rent-stabilized units."
  },

  // Florida - Lease Termination
  {
    topic: "lease_termination",
    jurisdiction: "FL",
    rule_summary: "Florida landlords must mitigate damages (Fla. Stat. § 83.595). Domestic violence victims can terminate lease early (Fla. Stat. § 83.681) with written notice and documentation. Month-to-month tenancies require 15-day notice from either party. Abandonment presumed after 15 days absence with unpaid rent. Property must be stored with notice to tenant. Subletting allowed unless lease prohibits.",
    rule_details: {
      early_termination_allowed: false,
      early_termination_penalty: "Tenant liable for rent until landlord re-rents or lease expires. Landlord must make reasonable effort to re-rent at fair market rate (Fla. Stat. § 83.595).",
      landlord_duty_to_mitigate: true,
      military_termination_right: true,
      military_notice_days: 30,
      domestic_violence_termination: true,
      domestic_violence_notice_days: "30 days written notice (immediate termination if imminent threat)",
      domestic_violence_documentation: "Injunction for protection, police report, medical documentation, or signed affidavit from victim stating incident occurred within past 3 months",
      month_to_month_tenant_notice_days: 15,
      month_to_month_landlord_notice_days: 15,
      fixed_term_auto_renewal_rules: "Auto-renewal clauses valid. No special notice formatting required under state law.",
      abandonment_definition: "Tenant absent for 15+ consecutive days, rent unpaid, abandonment reasonably apparent to landlord",
      abandonment_timeline_days: 15,
      abandoned_property_rules: "After abandonment, landlord may immediately retake possession. Personal property must be stored and tenant notified at last known address. If unclaimed after 30 days, landlord may dispose. If value >$500, must sell at public sale. Fla. Stat. § 83.67.",
      subletting_default_rule: "Allowed unless lease prohibits. Lease typically requires landlord approval.",
      death_of_tenant_rules: "Lease does not automatically terminate. Personal representative of estate must decide whether to continue or terminate. Estate liable for rent until lease terminates or unit re-rented."
    },
    statute_reference: "Fla. Stat. §§ 83.575, 83.595, 83.67, 83.681",
    effective_date: "2008-07-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Florida has statutory duty to mitigate (§ 83.595), unusual among landlord-friendly states. DV early termination added 2008. Shorter 15-day notice period for month-to-month is unique among major states."
  },

  // Illinois - Lease Termination
  {
    topic: "lease_termination",
    jurisdiction: "IL",
    rule_summary: "Illinois landlords must mitigate damages when tenant breaks lease early (case law). Domestic violence/stalking/sexual assault victims can terminate lease (765 ILCS 750/) with written notice and documentation. Month-to-month requires 30-day notice from either party. Abandonment provisions allow landlord to retake possession after notice and waiting period. Subletting allowed with landlord approval (reasonableness varies by case law).",
    rule_details: {
      early_termination_allowed: false,
      early_termination_penalty: "Tenant liable for rent until landlord re-rents or lease expires. Landlord must make reasonable efforts to mitigate (IL case law - Stengel v. Wayne).",
      landlord_duty_to_mitigate: true,
      military_termination_right: true,
      military_notice_days: 30,
      domestic_violence_termination: true,
      domestic_violence_notice_days: "30 days written notice",
      domestic_violence_documentation: "Order of protection, police report dated within past 60 days, documentation from victim services provider, medical professional, or attorney showing incident occurred",
      month_to_month_tenant_notice_days: 30,
      month_to_month_landlord_notice_days: 30,
      fixed_term_auto_renewal_rules: "Auto-renewal clauses valid if lease clearly states terms. No statutory formatting requirements, but must be conspicuous.",
      abandonment_definition: "Tenant absent, rent unpaid for 30+ days, reasonable belief of abandonment based on objective factors",
      abandonment_timeline_days: 30,
      abandoned_property_rules: "Landlord must send notice to tenant's last known address. Property held for reasonable period (typically 7-14 days). If unclaimed, may dispose or sell. Proceeds to costs, rent, then tenant if claimed.",
      subletting_default_rule: "Allowed if lease permits. Landlord consent typically required. Reasonableness standard varies - Chicago RLTO has stricter rules favoring tenants.",
      death_of_tenant_rules: "Lease does not automatically terminate. Estate responsible for rent or must negotiate early termination. Landlord should work with executor/administrator."
    },
    statute_reference: "765 ILCS 705/; 765 ILCS 750/ (Safe Homes Act); 735 ILCS 5/9-207",
    effective_date: "2006-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Duty to mitigate from case law (Stengel v. Wayne). Safe Homes Act (765 ILCS 750/) enacted 2006, strengthened 2019. Chicago RLTO has additional protections for subletting and early termination."
  },

  // ===========================
  // REQUIRED DISCLOSURES RULES
  // ===========================

  // California - Required Disclosures
  {
    topic: "required_disclosures",
    jurisdiction: "CA",
    rule_summary: "California has the most extensive landlord disclosure requirements in the US. Required disclosures include: federal lead paint (pre-1978 housing), mold, bed bugs (as of 2016), flood zone status, Megan's Law database notice, demolition/conversion intent, military ordnance locations near property, shared utility arrangements, smoking policy, and death on premises within 3 years (Cal. Civ. Code § 1710.2). Landlord/agent identity must be disclosed. Move-in inspection checklist required.",
    rule_details: {
      lead_paint_required: true,
      lead_paint_statute: "Federal: 42 U.S.C. § 4852d (pre-1978); CA Health & Safety Code § 17920.10",
      mold_disclosure_required: true,
      flood_zone_disclosure_required: true,
      sex_offender_registry_disclosure: true,
      sex_offender_disclosure_details: "Landlord must provide notice that Megan's Law database exists and website (meganslaw.ca.gov). No duty to check or disclose specific offenders. Cal. Civ. Code § 2079.10a.",
      bed_bug_history_required: true,
      asbestos_disclosure_required: true,
      shared_utility_disclosure_required: true,
      move_in_checklist_required: true,
      landlord_identity_disclosure_required: true,
      known_defects_disclosure_required: true,
      demolition_plans_disclosure: true,
      death_on_premises_disclosure: true,
      smoking_policy_disclosure: true,
      military_ordnance_disclosure: true,
      additional_state_disclosures: "Pest control company info (if used), statutory lien rights, noise standards if near airport, proximity to former military base with potential ordnance, water-conserving plumbing fixtures, sale of property notice (60-day move-out for new owner), database of eviction info, pest control inspection report, commercial cannabis cultivation prohibition. Cal. Civ. Code §§ 1940-1954."
    },
    statute_reference: "Cal. Civ. Code §§ 1710.2, 1940.2, 1940.35, 1940.6, 1940.7, 1941.1, 1946.1, 1954.605, 2079.10a; Health & Safety Code §§ 17920.3, 17920.10, 26147",
    effective_date: "2016-07-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Bed bug disclosure added 2016 (AB 551). Death disclosure within 3 years (not just 'stigmatized property'). Mold disclosure form recommended (not strictly required). Smoking policy disclosure added 2012. Military ordnance disclosure required near former military bases (AB 1950). Cannabis cultivation disclosure added 2017."
  },

  // Texas - Required Disclosures
  {
    topic: "required_disclosures",
    jurisdiction: "TX",
    rule_summary: "Texas has relatively minimal disclosure requirements compared to other major states. Federal lead paint disclosure applies to pre-1978 housing. Landlord must disclose name and address of owner/property manager (Tex. Prop. Code § 92.201). Flooding disclosure required if property flooded in past 5 years and landlord has knowledge (added post-Hurricane Harvey). Megan's Law database information not required but recommended.",
    rule_details: {
      lead_paint_required: true,
      lead_paint_statute: "Federal: 42 U.S.C. § 4852d (pre-1978 housing)",
      mold_disclosure_required: false,
      flood_zone_disclosure_required: true,
      sex_offender_registry_disclosure: false,
      sex_offender_disclosure_details: "Not required, but landlords may voluntarily provide info about Texas DPS sex offender database (publicsite.dps.texas.gov/SexOffenderRegistry)",
      bed_bug_history_required: false,
      asbestos_disclosure_required: false,
      shared_utility_disclosure_required: false,
      move_in_checklist_required: false,
      landlord_identity_disclosure_required: true,
      known_defects_disclosure_required: false,
      demolition_plans_disclosure: false,
      death_on_premises_disclosure: false,
      smoking_policy_disclosure: false,
      military_ordnance_disclosure: false,
      additional_state_disclosures: "Previous flooding disclosure (if property flooded within 5 years and landlord aware - Tex. Prop. Code § 92.201(c)). Landlord/manager name and address required in lease or separate notice. Tenant has right to early termination if certain conditions not met (sexual offenses by other residents, family violence situations). Security device info (locks, security systems) if requested by tenant."
    },
    statute_reference: "Tex. Prop. Code §§ 92.052, 92.153, 92.154, 92.201, 92.014",
    effective_date: "2019-09-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Flooding disclosure requirement strengthened after Hurricane Harvey (2017). Texas is landlord-friendly with minimal mandatory disclosures. Known defects disclosure not required but landlord may be liable for fraud/misrepresentation if material facts concealed."
  },

  // New York State - Required Disclosures
  {
    topic: "required_disclosures",
    jurisdiction: "NY",
    rule_summary: "New York has moderate state-level disclosure requirements, significantly expanded in NYC. Federal lead paint disclosure applies (pre-1978). Statewide: landlord identity must be disclosed. Bedbug history required (in NYC under Admin Code § 27-2018.1). Sprinkler/smoke detector info, window guards (if children under 11), and rent history disclosure (for rent-stabilized units). HSTPA 2019 added more protections.",
    rule_details: {
      lead_paint_required: true,
      lead_paint_statute: "Federal: 42 U.S.C. § 4852d (pre-1978); NYC Local Law 1 (annual lead testing for units with kids under 6 in buildings built before 1960)",
      mold_disclosure_required: false,
      flood_zone_disclosure_required: false,
      sex_offender_registry_disclosure: false,
      sex_offender_disclosure_details: "Not required statewide. Some local ordinances may require Megan's Law database notice. NY Division of Criminal Justice Services operates registry (criminaljustice.ny.gov/SomsSUBDirectory/search_index.jsp).",
      bed_bug_history_required: true,
      asbestos_disclosure_required: false,
      shared_utility_disclosure_required: false,
      move_in_checklist_required: false,
      landlord_identity_disclosure_required: true,
      known_defects_disclosure_required: false,
      demolition_plans_disclosure: false,
      death_on_premises_disclosure: false,
      smoking_policy_disclosure: false,
      military_ordnance_disclosure: false,
      additional_state_disclosures: "Bedbug history (NYC): annual notice + history of infestations. Window guards notice (NYC - for buildings with 3+ units if child under 11 present). Sprinkler system disclosure. Rent history (for rent-stabilized units). Smoke/CO detector locations. Certificate of occupancy availability. Owner/agent name and NY address (RPL § 235-b). Right to request repairs notice."
    },
    statute_reference: "NY Real Prop. Law §§ 235-b, 235-f; NYC Admin Code §§ 27-2018.1, 27-2056.2, 27-2056.4; Multiple Dwelling Law §§ 173, 173-a",
    effective_date: "2010-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Bedbug disclosure law enacted 2010 (NYC). Lead paint Local Law 1 stricter than federal (annual testing vs. disclosure only). NYC has extensive additional requirements beyond state law. Rent-stabilized units require disclosure of rent history and legal regulated rent."
  },

  // New York City - Required Disclosures (City Override)
  {
    topic: "required_disclosures",
    jurisdiction: "NY",
    city_override: "New York City",
    rule_summary: "NYC has the most extensive municipal disclosure requirements in the nation. Beyond state law: lead paint annual testing (Local Law 1), bedbug infestation history (Admin Code § 27-2018.1), window guards (children under 11), sprinkler systems, stove knob covers (children under 6), fire safety plan, rent-stabilized lease rider, HPD violations, emergency/fire exits, recycling info, heat/hot water provider, smoking policy in buildings with 3+ units.",
    rule_details: {
      lead_paint_required: true,
      lead_paint_statute: "NYC Local Law 1 of 2004: Annual lead testing required in units with children under 6 in buildings built before 1960. XRF testing + visual inspection. Stricter than federal disclosure-only requirement.",
      mold_disclosure_required: false,
      flood_zone_disclosure_required: false,
      sex_offender_registry_disclosure: false,
      sex_offender_disclosure_details: "Not required. NY state registry available online.",
      bed_bug_history_required: true,
      asbestos_disclosure_required: false,
      shared_utility_disclosure_required: true,
      move_in_checklist_required: false,
      landlord_identity_disclosure_required: true,
      known_defects_disclosure_required: false,
      demolition_plans_disclosure: false,
      death_on_premises_disclosure: false,
      smoking_policy_disclosure: true,
      military_ordnance_disclosure: false,
      additional_state_disclosures: "EXTENSIVE NYC requirements: (1) Bedbug history - annual notice of infestation history for past year for building and unit (Admin Code § 27-2018.1). (2) Window guards notice for buildings with 3+ units if child under 11. (3) Stove knob covers notice (child under 6). (4) Rent-stabilized lease rider with rights and responsibilities. (5) HPD violations - building's outstanding violations. (6) Lead paint annual testing (Local Law 1). (7) Smoke/CO detector locations. (8) Emergency exits and fire safety plan. (9) Recycling information. (10) Heat/hot water provider contact. (11) Smoking policy (buildings with 3+ units). (12) Certificate of occupancy posted. (13) Owner/managing agent name and NYC address (RPL § 235-b). (14) Right to request repairs. (15) Building services (doorman, elevator, etc.) if applicable."
    },
    statute_reference: "NYC Admin Code §§ 27-2018.1, 27-2056.2, 27-2056.4, 27-2067, 17-502; NYC Local Law 1 of 2004; NY RPL § 235-b",
    effective_date: "2004-08-02",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "NYC Local Law 1 (lead) enacted 2004 after child lead poisoning deaths. Bedbug disclosure 2010. Window guard law among strongest tenant protections. Rent-stabilized units have additional rider requirements. Smoking policy disclosure required for buildings with 3+ units (added 2018). NYC has more disclosure requirements than any US city."
  },

  // Florida - Required Disclosures
  {
    topic: "required_disclosures",
    jurisdiction: "FL",
    rule_summary: "Florida has moderate disclosure requirements. Federal lead paint disclosure applies (pre-1978 housing). State requires radon gas disclosure (Fla. Stat. § 404.056), landlord identity disclosure, and fire protection system information. Mold disclosure not required but recommended. Flood zone information not mandatory but prudent given hurricane risk.",
    rule_details: {
      lead_paint_required: true,
      lead_paint_statute: "Federal: 42 U.S.C. § 4852d (pre-1978 housing)",
      mold_disclosure_required: false,
      flood_zone_disclosure_required: false,
      sex_offender_registry_disclosure: false,
      sex_offender_disclosure_details: "Not required. FDLE sex offender registry available (offender.fdle.state.fl.us/offender/sops/home.jsf) but landlord has no duty to disclose.",
      bed_bug_history_required: false,
      asbestos_disclosure_required: false,
      shared_utility_disclosure_required: false,
      move_in_checklist_required: false,
      landlord_identity_disclosure_required: true,
      known_defects_disclosure_required: false,
      demolition_plans_disclosure: false,
      death_on_premises_disclosure: false,
      smoking_policy_disclosure: false,
      military_ordnance_disclosure: false,
      additional_state_disclosures: "Radon gas disclosure required (Fla. Stat. § 404.056) - landlord must provide EPA radon disclosure notice for all residential leases. Fire protection system information (sprinklers, alarms). Landlord name and address required in lease. Homeowners association rules if property in HOA. Notification if unit is subject to foreclosure."
    },
    statute_reference: "Fla. Stat. §§ 83.50, 404.056; 42 U.S.C. § 4852d",
    effective_date: "1988-10-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Radon disclosure unique to Florida among major states (due to geology). No flood disclosure requirement despite hurricane risk. Known defects not required to be disclosed but landlord may be liable for fraudulent concealment."
  },

  // Illinois - Required Disclosures
  {
    topic: "required_disclosures",
    jurisdiction: "IL",
    rule_summary: "Illinois has moderate state-level disclosure requirements. Federal lead paint applies (pre-1978). State requires radon disclosure (since 2013), landlord identity disclosure, and carbon monoxide detector information. Chicago RLTO has extensive additional municipal requirements including code violations summary, recycling info, detailed move-in/move-out checklists, and bed bug history.",
    rule_details: {
      lead_paint_required: true,
      lead_paint_statute: "Federal: 42 U.S.C. § 4852d (pre-1978); Illinois Lead Poisoning Prevention Act (410 ILCS 45/)",
      mold_disclosure_required: false,
      flood_zone_disclosure_required: false,
      sex_offender_registry_disclosure: false,
      sex_offender_disclosure_details: "Not required statewide. Illinois State Police sex offender registry exists (isp.state.il.us/sor/) but no landlord disclosure duty.",
      bed_bug_history_required: false,
      asbestos_disclosure_required: false,
      shared_utility_disclosure_required: false,
      move_in_checklist_required: false,
      landlord_identity_disclosure_required: true,
      known_defects_disclosure_required: false,
      demolition_plans_disclosure: false,
      death_on_premises_disclosure: false,
      smoking_policy_disclosure: false,
      military_ordnance_disclosure: false,
      additional_state_disclosures: "Radon disclosure required (420 ILCS 46/25) - landlord must provide IEMA radon pamphlet for ground-contact units. Smoke detector and carbon monoxide detector information. Landlord/agent name and address. Utility payment responsibility. Shared utility disclosure (if applicable). Chicago has extensive additional RLTO requirements."
    },
    statute_reference: "765 ILCS 705/; 410 ILCS 45/ (Lead); 420 ILCS 46/25 (Radon); 425 ILCS 60/ (Smoke Detectors)",
    effective_date: "2013-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Radon disclosure added 2013. Chicago RLTO has significantly more disclosure requirements than state law. State requires smoke detectors in all units, CO detectors in units with fossil fuel appliances or attached garages."
  },

  // Chicago - Required Disclosures (City Override)
  {
    topic: "required_disclosures",
    jurisdiction: "IL",
    city_override: "Chicago",
    rule_summary: "Chicago RLTO has among the most detailed municipal disclosure requirements in the US. Beyond state requirements: summary of building code violations, heat included or not, utility payment responsibility, porch/balcony rules, recycling location, detailed move-in and move-out inspection checklists (signed by both parties), bed bug infestation history for unit and building, right to interest on security deposits, RLTO summary of rights, and landlord/agent contact info.",
    rule_details: {
      lead_paint_required: true,
      lead_paint_statute: "Federal: 42 U.S.C. § 4852d (pre-1978); Chicago Lead Poisoning Prevention Ordinance (stricter than state - requires annual inspection of units with kids under 6 in buildings built before 1978)",
      mold_disclosure_required: false,
      flood_zone_disclosure_required: false,
      sex_offender_registry_disclosure: false,
      sex_offender_disclosure_details: "Not required. Illinois State Police registry available online but no disclosure duty.",
      bed_bug_history_required: true,
      asbestos_disclosure_required: false,
      shared_utility_disclosure_required: true,
      move_in_checklist_required: true,
      landlord_identity_disclosure_required: true,
      known_defects_disclosure_required: true,
      demolition_plans_disclosure: false,
      death_on_premises_disclosure: false,
      smoking_policy_disclosure: false,
      military_ordnance_disclosure: false,
      additional_state_disclosures: "EXTENSIVE CHICAGO RLTO REQUIREMENTS: (1) Summary of building code violations (any open violations from past year). (2) Heat included disclosure (must specify if heat included or tenant-paid). (3) Detailed utility payment responsibility. (4) Porch/balcony/deck weight restrictions. (5) Recycling facilities location. (6) Move-in checklist - detailed room-by-room inspection form signed by both parties (RLTO § 5-12-080). (7) Move-out checklist within 7 days of move-out. (8) Bed bug infestation history for unit and building (past 12 months). (9) Security deposit interest notification (Chicago banks list or CPI rate). (10) RLTO summary of rights (City provides template). (11) Landlord/managing agent name, address, phone. (12) Radon disclosure (state requirement). (13) Lead paint (federal + stricter Chicago ordinance). (14) Smoke/CO detector locations. (15) Building services if applicable."
    },
    statute_reference: "Chicago RLTO §§ 5-12-080, 5-12-160, 5-12-170; Municipal Code of Chicago Title 13-12 (Lead); 42 U.S.C. § 4852d",
    effective_date: "1987-01-01",
    last_verified: "2026-03-22",
    confidence: "statute",
    notes: "Chicago RLTO disclosure requirements among most detailed in US. Move-in/move-out checklists mandatory (not just recommended). Code violations summary must be updated annually. Bed bug disclosure added after citywide infestation issues. Lead ordinance stricter than state (annual inspection vs. disclosure). Heat disclosure critical given Chicago winters."
  }
];
