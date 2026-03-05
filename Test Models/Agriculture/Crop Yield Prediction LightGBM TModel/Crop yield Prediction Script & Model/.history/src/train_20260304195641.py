"""
Training script for crop yield prediction using LightGBM.
Usage example:
python src/train.py --input cleaned.csv --model-out model.joblib
"""
import argparse
from pathlib import Path
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import lightgbm as lgb
from utils import preprocess_dataframe


def main():
    parser = argparse.ArgumentParser(description='Train LightGBM model for crop yield prediction')
    parser.add_argument('--input', '-i', required=True, help='Cleaned input CSV file')
    parser.add_argument('--model-out', '-m', required=True, help='Path to save trained model (joblib)')
    parser.add_argument('--preprocessor-out', '-p', required=True, help='Path to save preprocessor (joblib)')
    parser.add_argument('--metrics-out', '-e', default='metrics.json', help='File to write evaluation metrics')
    parser.add_argument('--target', '-t', default='Yield_tons_per_hectare', help="Target column name (default: 'Yield_tons_per_hectare')")
    parser.add_argument('--test-size', type=float, default=0.2, help='Test set fraction')
    parser.add_argument('--random-state', type=int, default=42, help='Random seed')
    args = parser.parse_args()

    p = Path(args.input)
    if not p.exists():
        raise SystemExit(f"Input file not found: {args.input}")

    df = pd.read_csv(args.input)

    X, y, preprocessor, feature_names = preprocess_dataframe(df, target_col=args.target)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=args.test_size, random_state=args.random_state)

    # Use LightGBM sklearn API
    model = lgb.LGBMRegressor(n_estimators=1000, learning_rate=0.05, random_state=args.random_state)

    # early stopping with eval set
    model.fit(X_train, y_train, eval_set=[(X_test, y_test)], early_stopping_rounds=50, verbose=50)

    preds = model.predict(X_test)

    rmse = mean_squared_error(y_test, preds, squared=False)
    mae = mean_absolute_error(y_test, preds)
    r2 = r2_score(y_test, preds)

    metrics = {
        'rmse': float(rmse),
        'mae': float(mae),
        'r2': float(r2),
        'n_features': int(X.shape[1])
    }

    # Save model and preprocessor
    joblib.dump(model, args.model_out)
    joblib.dump(preprocessor, args.preprocessor_out)

    with open(args.metrics_out, 'w') as fh:
        json.dump(metrics, fh, indent=2)

    print('Training complete.')
    print(json.dumps(metrics, indent=2))


if __name__ == '__main__':
    main()
