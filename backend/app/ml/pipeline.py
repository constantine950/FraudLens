import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from app.config import PROCESSED_DATA_PATH, RAW_DATA_PATH
import os


def build_pipeline(df: pd.DataFrame):
    """
    Takes raw dataframe, returns processed train/test splits
    """
    scaler = StandardScaler()

    df['Amount_scaled'] = scaler.fit_transform(df[['Amount']])
    df['Time_scaled'] = scaler.fit_transform(df[['Time']])
    df.drop(columns=['Amount', 'Time'], inplace=True)

    X = df.drop(columns=['Class'])
    y = df['Class']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    sm = SMOTE(random_state=42)
    X_train_res, y_train_res = sm.fit_resample(X_train, y_train)

    return X_train_res, y_train_res, X_test, y_test
