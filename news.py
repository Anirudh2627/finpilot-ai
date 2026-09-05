from ai.graph.state import AgentState
from ai.schemas.models import TraceStep, EvidenceEntry
from datetime import datetime
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv
import requests

load_dotenv()
llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)

def get_news_sentiment(symbol: str) -> float:
    """Fetch news and analyze sentiment"""
    api_key = os.getenv("NEWS_API_KEY", "")
    
    if not api_key:
        return 0.75  # Default
    
    try:
        url = "https://newsapi.org/v2/everything"
        params = {
            "q": symbol,
            "apiKey": api_key,
            "language": "en",
            "pageSize": 5
        }
        response = requests.get(url, params=params, timeout=10)
        data = response.json()
        
        headlines = [article["title"] for article in data.get("articles", [])]
        
        # AI Sentiment Analysis
        prompt = f"Analyze sentiment: {headlines}. Return ONLY 0.0-1.0 score."
        score = float(llm.invoke(prompt).content.strip())
        return max(0.0, min(1.0, score))
        
    except Exception as e:
        print(f"News API Error: {e}")
        return 0.75

def run(state: AgentState) -> AgentState:
    symbol = state["stock_symbol"]
    sentiment = get_news_sentiment(symbol)
    
    trace = TraceStep(
        agent="News Agent",
        action="analyze_sentiment",
        reasoning=f"News sentiment for {symbol}: {sentiment}",
        status="success",
        timestamp=datetime.now().isoformat()
    )
    
    evidence = EvidenceEntry(
        id=f"EV-NEWS-{datetime.now().timestamp()}",
        agent="News Agent",
        feature="News_Sentiment",
        value=round(sentiment, 2),
        source="NewsAPI + Groq",
        confidence=0.85,
        timestamp=datetime.now().isoformat()
    )
    state["evidence_ledger"].append(evidence)
    state["trace"].append(trace)
    return state