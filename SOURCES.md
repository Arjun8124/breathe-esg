# SOURCES.md

# Research Notes

The assignment required researching realistic enterprise ESG data sources before designing the ingestion flow.

---

# SAP Data

## Research

I looked into:

- SAP flat-file exports
- IDoc concepts
- ERP reporting exports

## What I Learned

SAP exports are often:

- inconsistent
- difficult to normalize
- organization-specific

They also commonly contain:

- operational codes
- inconsistent units
- awkward formatting

## Prototype Choice

I modeled simplified CSV exports inspired by SAP operational reporting.

---

# Utility Data

## Research

I looked at:

- utility portal exports
- commercial electricity billing formats

## What I Learned

Utility data usually contains:

- meter readings
- billing periods
- kWh usage
- tariff-related fields

## Prototype Choice

I used CSV-style utility exports because they are common and practical for ingestion workflows.

---

# Travel Data

## Research

I looked into:

- Concur workflows
- Navan reporting formats
- corporate travel exports

## What I Learned

Travel systems often expose:

- travel modes
- airport/city codes
- distances
- booking categories

## Prototype Choice

I modeled simplified travel exports containing:

- mode
- routes
- distances

---

# Sample Data Design

The sample datasets intentionally included:

- realistic values
- inconsistent records
- suspicious edge cases

Examples:

- negative electricity usage
- invalid travel modes
- unrealistic quantities

This helped test:

- normalization
- suspicious detection
- analyst review workflows
