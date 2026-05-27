from models import NormalizedRecord


def normalize_utility(row):
    sus = row["kWh"] < 0
    return NormalizedRecord(
        source_type="Utility",
        activity_type="Electricity",
        quantity=row["kWh"],
        unit="kWh",
        status="Pending",
        is_suspicious=sus
    )
