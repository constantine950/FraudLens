import numpy as np
import pandas as pd


def score_transaction(transaction: dict, model, feature_names: list) -> dict:
    # Build dataframe to preserve feature order
    df = pd.DataFrame([transaction])[feature_names]
    prob = model.predict_proba(df)[0][1]
    risk_score = round(prob * 100, 2)

    if risk_score >= 70:
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        'fraud_probability': round(prob * 100, 2),
        'risk_score': risk_score,
        'risk_level': risk_level
    }


def batch_score(X: pd.DataFrame, model) -> pd.DataFrame:
    probs = model.predict_proba(X)[:, 1]
    scores = (probs * 100).round(2)

    levels = []
    for s in scores:
        if s >= 70:
            levels.append("HIGH")
        elif s >= 40:
            levels.append("MEDIUM")
        else:
            levels.append("LOW")

    return pd.DataFrame({
        'fraud_probability': probs.round(4),
        'risk_score': scores,
        'risk_level': levels
    })
