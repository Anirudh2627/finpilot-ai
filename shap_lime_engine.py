import shap
import pandas as pd
from ai.models.ml_engine import train_models, generate_synthetic_data

def generate_explainability(features_dict):
    models = train_models()
    rf = models['rf']
    
    for f in ['PE_Ratio', 'Revenue_Growth', 'News_Sentiment', 'Volatility']:
        if f not in features_dict:
            features_dict[f] = 20.0
    
    df = pd.DataFrame([features_dict])
    feature_names = list(features_dict.keys())
    
    explainer = shap.TreeExplainer(rf)
    shap_values = explainer.shap_values(df)
    shap_importance = abs(shap_values[0]).mean(axis=0).tolist()
    
    training_data = generate_synthetic_data(100)
    X_train = training_data[['PE_Ratio', 'Revenue_Growth', 'News_Sentiment', 'Volatility']].values
    
    import lime.lime_tabular
    explainer_lime = lime.lime_tabular.LimeTabularExplainer(
        X_train,
        feature_names=feature_names,
        class_names=['SELL', 'BUY'],
        mode='classification'
    )
    
    exp = explainer_lime.explain_instance(df.values[0], rf.predict_proba, num_features=4)
    lime_importance = exp.as_list()
    
    return {
        'shap': {feature: round(float(val), 3) for feature, val in zip(feature_names, shap_importance)},
        'lime': lime_importance
    }