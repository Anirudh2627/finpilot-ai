from sqlalchemy import Column, Integer, String, Float
from app.database import Base


class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)
    stock = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    buy_price = Column(Float, nullable=False)