from .db import db


class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(db.String(10), nullable=False)
    curr_price = db.Column(db.Integer, nullable=False)
    market_cap = db.Column(db.Integer, nullable=False)
    symbol = db.Column(db.String(10), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "curr_price": self.curr_price,
            "market_cap": self.market_cap,
            "symbol": self.symbol
        }