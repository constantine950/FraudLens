import pytest
import joblib
import pandas as pd
from app.main import app
from app.utils.data_loader import get_feature_names


@pytest.fixture(autouse=True)
def setup_app_state():
    app.state.model = joblib.load("models/random_forest_model.pkl")
    app.state.importance_df = pd.read_csv(
        "../data/processed/feature_importance.csv")
    app.state.feature_names = get_feature_names()
