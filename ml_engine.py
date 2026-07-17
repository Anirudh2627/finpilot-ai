import pandas as pd
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from .dataset_generator import generate_synthetic_data

MODEL_PATH = "ai/models/trained_models.joblib"

def train_models():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    
    print("Training ML Models...")
    df = generate_synthetic_data(2000)
    X = df[['PE_Ratio', 'Revenue_Growth', 'News_Sentiment', 'Volatility']]
    y = df['Target']
    
    rf = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
    rf.fit(X, y)
    
    xgb = XGBClassifier(n_estimators=100, random_state=42, max_depth=5)
    xgb.fit(X, y)
    
    joblib.dump({'rf': rf, 'xgb': xgb}, MODEL_PATH)
    print("Models trained and saved.")
    
    return {'rf': rf, 'xgb': xgb}

def get_predictions(models, features_dict):
    df = pd.DataFrame([features_dict])
    rf_pred = float(models['rf'].predict_proba(df)[0][1])
    xgb_pred = float(models['xgb'].predict_proba(df)[0][1])
    
    return {
        'random_forest': round(rf_pred, 3),
        'xgboost': round(xgb_pred, 3),
        'consensus': round((rf_pred + xgb_pred) / 2, 3)
    }