Crop Yield Prediction — LightGBM

This project provides scripts to clean input CSV data and train a LightGBM model to predict crop yield per unit area.

Files:
- src/clean_data.py : Cleans raw CSV and saves cleaned CSV.
- src/utils.py : Preprocessing utilities (fitting ColumnTransformer).
- src/train.py : Trains LightGBM model, saves model and preprocessor, writes metrics.
- requirements.txt : Python dependencies.

Quick start:
1. Install dependencies:

```bash
python -m pip install -r requirements.txt
```

2. Clean your raw CSV:

```bash
python src/clean_data.py --input path/to/raw.csv --output cleaned.csv
```

3. Train the model (default target column name is `yield`):

```bash
python src/train.py --input cleaned.csv --model-out model.joblib --preprocessor-out preprocessor.joblib --metrics-out metrics.json
```

Notes:
- If you want to download the Kaggle dataset, install `kaggle` and configure API credentials. The scripts assume you provide a local CSV file.
- Ensure your cleaned CSV contains a numeric target column named `yield` (or pass `--target`).
- The `src/clean_data.py` script performs basic cleaning: date parsing, `growing_days` calculation (if planting/harvest date columns exist), numeric median imputation, and categorical NA filling.

If you'd like, I can now: run a quick lint/check, or when you upload your toy dataset I will run the cleaning and training end-to-end and return trained model plus evaluation metrics.