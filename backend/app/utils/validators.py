from fastapi import HTTPException

EXPECTED_FEATURES = 30


def validate_transaction(data: dict):
    missing = []
    for i in range(1, 29):
        if f"V{i}" not in data:
            missing.append(f"V{i}")
    if "Amount_scaled" not in data:
        missing.append("Amount_scaled")
    if "Time_scaled" not in data:
        missing.append("Time_scaled")

    if missing:
        raise HTTPException(
            status_code=422,
            detail=f"Missing fields: {missing}"
        )
