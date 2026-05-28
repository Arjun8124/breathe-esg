# TRADEOFFS.md

# Things I Deliberately Did Not Build

## Authentication

I did not implement authentication or RBAC.

I chose to focus the assignment time on:

- ingestion
- normalization
- analyst workflows

instead of login systems.

---

## Real Emissions Calculations

The platform currently focuses on activity data ingestion and review rather than actual carbon calculations.

Adding emissions methodologies and factor mappings would significantly increase project scope.

---

## Automatic File Type Detection

The platform does not automatically detect whether a file belongs to SAP, Utility, or Travel systems.

Instead, the user explicitly selects the source type during upload.

I chose this because it keeps ingestion logic simpler and more reliable for a prototype.

---

## Background Processing

Uploads are processed synchronously.

For a production system, I would likely use:

- queues
- background workers
- retry systems

But for this prototype, synchronous processing was simpler and sufficient.
