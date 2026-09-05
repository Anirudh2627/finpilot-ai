import pandas as pd
import numpy as np

def generate_synthetic_data(n_samples=2000):
    np.random.seed(42)
    
    data = {
        'PE_Ratio': np.random.uniform(10, 50, n_samples),
        'Revenue_Growth': np.random.uniform(-5, 30, n_samples),
        'News_Sentiment': np.random.uniform(0, 1, n_samples),
        'Volatility': np.random.uniform(10, 50, n_samples),
    }
    
    df = pd.DataFrame(data)
    
    score = (df['Revenue_Growth'] * 2) + (df['News_Sentiment'] * 10) - (df['PE_Ratio'] * 0.5)
    df['Target'] = (score > 15).astype(int)
    
    return df

if __name__ == "__main__":
    df = generate_synthetic_data()
    df.to_csv('ai/models/training_data.csv', index=False)
    print(f"Generated {len(df)} samples")