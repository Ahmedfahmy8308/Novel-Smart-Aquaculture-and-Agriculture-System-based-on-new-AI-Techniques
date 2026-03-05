"""
Data cleaning CLI for crop yield prediction dataset.
Saves a cleaned CSV suitable for training.
"""
import argparse
from pathlib import Path
import pandas as pd
import numpy as np


def infer_date_columns(df):
    return [c for c in df.columns if 'date' in c.lower()]


def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    # normalize column names
    df.columns = [c.strip() for c in df.columns]

    # lower-case string columns
    for col in df.select_dtypes(include=['object']).columns:
        df[col] = df[col].astype(str).str.strip()
        df[col] = df[col].replace({'nan': None, 'None': None})

    # parse any date-like columns
    date_cols = infer_date_columns(df)
    for c in date_cols:
        try:
            df[c] = pd.to_datetime(df[c], errors='coerce')
        except Exception:
            df[c] = pd.to_datetime(df[c], errors='coerce')

    # create growing_days if planting_date and harvest_date exist
    planting_cols = [c for c in df.columns if 'plant' in c.lower() and 'date' in c.lower()]
    harvest_cols = [c for c in df.columns if 'harvest' in c.lower() and 'date' in c.lower()]
    if planting_cols and harvest_cols:
        df['growing_days'] = (pd.to_datetime(df[harvest_cols[0]], errors='coerce') - pd.to_datetime(df[planting_cols[0]], errors='coerce')).dt.days

    # standardize soil_type if present
    lower_cols = [c.lower() for c in df.columns]
    if 'soil type' in lower_cols:
        soil_col = df.columns[lower_cols.index('soil type')]
        df[soil_col] = df[soil_col].str.lower().replace({'clayey':'clay', 'sandy':'sandy', 'loam':'loam'})

    # Fill categorical NAs with 'Unknown'
    obj_cols = df.select_dtypes(include=['object']).columns
    for c in obj_cols:
        df[c] = df[c].replace({'None': None})
        df[c] = df[c].fillna('Unknown')

    # Fill numeric missing values with medians
    num_cols = df.select_dtypes(include=[np.number]).columns
    for c in num_cols:
        med = df[c].median()
        if pd.isna(med):
            med = 0
        df[c] = df[c].fillna(med)

    # Trim whitespace in string columns
    for c in obj_cols:
        df[c] = df[c].astype(str).str.strip()

    return df


def main():
    parser = argparse.ArgumentParser(description='Clean crop yield dataset')
    parser.add_argument('--input', '-i', required=True, help='Input CSV file path')
    parser.add_argument('--output', '-o', required=True, help='Output cleaned CSV path')
    args = parser.parse_args()

    p = Path(args.input)
    if not p.exists():
        raise SystemExit(f"Input file does not exist: {args.input}")

    df = pd.read_csv(args.input)
    cleaned = clean_dataframe(df)
    cleaned.to_csv(args.output, index=False)
    print(f"Saved cleaned data to {args.output}")


if __name__ == '__main__':
    main()
