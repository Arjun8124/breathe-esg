from models import NormalizedRecord


def normalize_travel(row):
    travel_mode = ["flight", "hotel", "taxi"]
    sus = row["Mode"].lower() not in travel_mode
    return NormalizedRecord(
        source_type="Travel",
        activity_type=row["Mode"],
        quantity=1,
        unit="trip",
        status="Pending",
        is_suspicious=sus
    )
