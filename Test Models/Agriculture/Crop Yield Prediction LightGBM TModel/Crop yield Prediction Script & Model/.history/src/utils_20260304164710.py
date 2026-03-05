"""
Utility preprocessing functions for crop yield project.
Provides `preprocess_dataframe` which fits a ColumnTransformer
and returns transformed arrays and the transformer for reuse.
"""
from typing import Tuple
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer


def preprocess_dataframe(df: pd.DataFrame, target_col: str = 'yield') -> Tuple[np.ndarray, np.ndarray, ColumnTransformer, list]:
    df = df.copy()
    if target_col not in df.columns:
        raise ValueError(f"Target column '{target_col}' not found in dataframe columns: {df.columns.tolist()}")

    y = df[target_col].values
    X_df = df.drop(columns=[target_col])

    # Identify numeric and categorical columns
    numeric_cols = X_df.select_dtypes(include=[np.number]).columns.tolist()
    categorical_cols = X_df.select_dtypes(include=['object', 'category']).columns.tolist()

    # Pipelines
    numeric_pipeline = Pipeline([
        ('impute', SimpleImputer(strategy='median')),
        ('scale', StandardScaler())
    ])

    categorical_pipeline = Pipeline([
        ('impute', SimpleImputer(strategy='constant', fill_value='Unknown')),
        ('ohe', OneHotEncoder(handle_unknown='ignore', sparse=False))
    ])

    preprocessor = ColumnTransformer(transformers=[
        ('num', numeric_pipeline, numeric_cols),
        ('cat', categorical_pipeline, categorical_cols)
    ], remainder='drop')

    X = preprocessor.fit_transform(X_df)

    # Build feature names list (requires sklearn>=1.0 for get_feature_names_out)
    feature_names = []
    try:
        if len(numeric_cols) > 0:
            feature_names.extend(numeric_cols)
        # get categorical feature names
        if len(categorical_cols) > 0:
            ohe = preprocessor.named_transformers_['cat'].named_steps['ohe']
            cat_names = ohe.get_feature_names_out(categorical_cols).tolist()
            feature_names.extend(cat_names)
    except Exception:
        # Fallback: numeric + categorical raw names
        feature_names = numeric_cols + categorical_cols

    return X, y, preprocessor, feature_names
