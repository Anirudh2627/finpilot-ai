from fastapi import APIRouter
import yfinance as yf

router = APIRouter()


@router.get("/stock/{symbol}")
def get_stock(symbol: str):

    stock = yf.Ticker(symbol)

    info = stock.info

    return {
        "symbol": symbol.upper(),
        "company": info.get("longName"),
        "price": info.get("currentPrice"),
        "currency": info.get("currency"),
        "market_cap": info.get("marketCap"),
        "high": info.get("dayHigh"),
        "low": info.get("dayLow"),
        "previous_close": info.get("previousClose")
    }