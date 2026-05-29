from fastapi import HTTPException
import math

EXPECTED_V_FEATURES = [f"V{i}" for i in range(1, 29)]
EXPECTED_FEATURES = EXPECTED_V_FEATURES + ["Amount_scaled", "Time_scaled"]


def validate_transaction(transaction: dict) -> dict:
    # 1. Check for missing fields
    missing = [f for f in EXPECTED_FEATURES if f not in transaction]
    if missing:
        raise HTTPException(
            status_code=422,
            detail=f"Missing fields: {missing}"
        )

    # 2. Check for extra fields
    extra = [f for f in transaction if f not in EXPECTED_FEATURES]
    if extra:
        raise HTTPException(
            status_code=422,
            detail=f"Unexpected fields: {extra}"
        )

    # 3. Check all values are numbers
    for field, value in transaction.items():
        if not isinstance(value, (int, float)):
            raise HTTPException(
                status_code=422,
                detail=f"Field '{field}' must be a number, got {type(value).__name__}"
            )

    # 4. Check for NaN or Infinity
    for field, value in transaction.items():
        if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
            raise HTTPException(
                status_code=422,
                detail=f"Field '{field}' contains invalid value (NaN or Infinity)"
            )

    return transaction
