from .db import db


class Asset(db.Model):
    __tablename__ = "assets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    symbol = db.Column(db.String(10), nullable=False)
    # logo = db.Column(db.String(200), nullable=False)

    # transaction = db.relationship("Transaction", back_populates="asset")
    # wallet = db.relationship("Wallet", back_populates="asset")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "symbol": self.symbol
        }