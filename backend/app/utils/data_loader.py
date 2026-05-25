import pandas as pd
import os
from app.config import PROCESSED_DATA_PATH


def load_processed_data():
    X_train = pd.read_csv(os.path.join(PROCESSED_DATA_PATH, "X_train.csv"))
    y_train = pd.read_csv(os.path.join(PROCESSED_DATA_PATH, "y_train.csv"))
    X_test = pd.read_csv(os.path.join(PROCESSED_DATA_PATH, "X_test.csv"))
    y_test = pd.read_csv(os.path.join(PROCESSED_DATA_PATH, "y_test.csv"))

    return X_train, y_train, X_test, y_test


def get_feature_names():
    X_test = pd.read_csv(os.path.join(PROCESSED_DATA_PATH, "X_test.csv"))
    return X_test.columns.tolist()
