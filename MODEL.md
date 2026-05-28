# MODEL.md

## Overview

The system was designed to ingest ESG-related data from multiple enterprise sources and normalize it into a single structure for analyst review.

The main goal of the data model was to keep the system:

- simple
- traceable
- easy to audit
- easy to extend later

---

# Core Design

## RawData Table

This table stores uploaded rows exactly as they were received.

Example:

- SAP export rows
- utility CSV rows
- travel records

I separated raw data from normalized data because in real systems you usually don't want to lose the original uploaded information.

This helps with:

- debugging
- auditability
- future reprocessing

### Fields

- id
- source_type
- raw_data

---

## NormalizedRecord Table

This table stores cleaned and standardized records.

Different source types have different formats, so normalization converts them into a shared structure.

### Fields

- id
- source_type
- activity_type
- quantity
- unit
- status
- is_suspicious

---

# Review Workflow

Every uploaded record starts as:

- pending

An analyst can then:

- approve
- reject

This was added because the assignment specifically mentioned analyst review before audit.

---

# Suspicious Detection

The platform flags suspicious rows using simple rule-based checks.

Examples:

- negative quantities
- invalid travel modes
- unrealistic values

I intentionally kept this logic lightweight and explainable instead of adding ML-based anomaly detection.

---

# Scope Categorization

The current prototype does not fully implement Scope 1/2/3 calculations, but the model was designed so they could be added later.

Possible mappings:

- fuel → Scope 1
- electricity → Scope 2
- travel → Scope 3

---

# Multi-Tenancy

The prototype currently assumes a single client for simplicity.

In a production system, I would add:

- tenant tables
- tenant-specific access control
- tenant-aware normalization rules

---

# Future Improvements

Possible future improvements:

- audit logs
- record versioning
- emissions calculations
- background processing
- role-based access control
