from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.portfolio import Portfolio
from app.schemas.portfolio import PortfolioCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/portfolio")
def add_portfolio(
    portfolio: PortfolioCreate,
    db: Session = Depends(get_db)
):
    new_stock = Portfolio(
        stock=portfolio.stock,
        quantity=portfolio.quantity,
        buy_price=portfolio.buy_price
    )

    db.add(new_stock)
    db.commit()
    db.refresh(new_stock)

    return new_stock

@router.get("/portfolio")
def get_portfolio(db: Session = Depends(get_db)):
    portfolio = db.query(Portfolio).all()
    return portfolio

from fastapi import HTTPException
@router.delete("/portfolio/{portfolio_id}")
def delete_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db)
):
    stock = db.query(Portfolio).filter(
        Portfolio.id == portfolio_id
    ).first()

    if stock is None:
        raise HTTPException(
            status_code=404,
            detail="Investment not found"
        )

    db.delete(stock)
    db.commit()

    return {"message": "Investment deleted successfully"}