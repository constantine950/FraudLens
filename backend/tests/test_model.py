import pytest
import joblib
import pandas as pd
import os

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "models", "random_forest_model.pkl"
)

FEATURE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(
        os.path.dirname(os.path.abspath(__file__)))),
    "data", "processed", "X_test.csv"
)


def test_model_loads():
    model = joblib.load(MODEL_PATH)
    assert model is not None


def test_model_predicts():
    model = joblib.load(MODEL_PATH)
    X_test = pd.read_csv(FEATURE_PATH)
    sample = X_test.iloc[:5]
    preds = model.predict(sample)
    assert len(preds) == 5
    assert all(p in [0, 1] for p in preds)


def test_model_predict_proba():
    model = joblib.load(MODEL_PATH)
    X_test = pd.read_csv(FEATURE_PATH)
    sample = X_test.iloc[:5]
    probs = model.predict_proba(sample)
    assert probs.shape == (5, 2)
    assert all(0 <= p <= 1 for p in probs[:, 1])


def test_feature_count():
    X_test = pd.read_csv(FEATURE_PATH)
    assert X_test.shape[1] == 30
