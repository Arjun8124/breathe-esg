from models import NormalizedRecord


def normalize_travel(row):
    sus = False
    return NormalizedRecord(
        source_type="Travel",
        activity_type=row["Mode"],
        quantity=1,
        unit="trip",
        status="Pending",
        is_suspicious=sus
    )
