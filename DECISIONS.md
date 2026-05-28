# DECISIONS.md

# Major Decisions

## Why FastAPI Instead of Django?

The assignment suggested Django, but I chose FastAPI because the project mainly required:

- ingestion APIs
- normalization logic
- workflow endpoints

FastAPI allowed me to move faster and keep the backend lightweight.

---

## Why CSV Uploads?

I used CSV uploads for all three sources because:

- SAP exports are commonly shared as flat files
- utility portals often allow CSV exports
- travel systems also expose exportable reports

This felt realistic while still manageable within the assignment timeline.

---

## Why Separate Raw and Normalized Data?

I wanted to preserve original uploaded rows before normalization.

This makes the system easier to:

- audit
- debug
- reprocess later

It also reflects how many ingestion systems work in practice.

---

## Why Explicit Source Selection?

The user selects:

- SAP
- Utility
- Travel

during upload.

I chose this because it keeps ingestion deterministic and avoids trying to auto-detect file types.

---

## Why Rule-Based Suspicious Detection?

I used simple rules because they are:

- easy to explain
- predictable
- lightweight

The goal was to help analysts quickly spot questionable records rather than build a full anomaly detection engine.

---

## What I Would Ask the PM

If this were a real project, I would ask:

- how large uploads are expected to be
- whether analysts can edit records
- whether approvals are reversible
- what level of auditability is required
- whether tenant isolation is needed
