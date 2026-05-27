from models import NormalizedRecord


def normalize_sap(row):
    sus = row["Quantity"] < 0
    return NormalizedRecord(
        source_type="SAP",
        activity_type=row["Fuel Type"],
        quantity=row["Quantity"],
        unit=row["Unit"],
        status="Pending",
        is_suspicious=sus
    )
