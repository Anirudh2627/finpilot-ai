from pydantic import BaseModel


class PortfolioCreate(BaseModel):
    stock: str
    quantity: int
    buy_price: float


class PortfolioResponse(PortfolioCreate):
    id: int

    class Config:
        from_attributes = True