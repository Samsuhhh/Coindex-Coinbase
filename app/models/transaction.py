from .db import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.String(6), nullable=False)
    asset_amount = db.Column(db.String(60), nullable=True )
    cash_value = db.Column(db.String(60), nullable=True)
    asset_type = db.Column(db.String(20), nullable=False) # connection to Wallet? FKey?
    asset_price = db.Column(db.String(20), nullable=True) 

    # asset_type = db.Column(db.String(10), db.ForeignKey("assets.type"), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey("cards.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False )
    wallet_address = db.Column(db.String(70), nullable=False)

    # asset = db.relationship("Asset", back_populates="transaction")
    card = db.relationship("Card", back_populates="transaction")
    user = db.relationship("User", back_populates="transaction")
    # wallet = db.relationship("Wallet", back_populates="transaction")

    def to_dict(self):
        return {
            "id": self.id,
            "transactionType": self.transaction_type,
            "amount": self.asset_amount,
            "cashValue": self.cash_value,
            "assetType": self.asset_type,
            "card_id": self.card_id,
            "userId": self.user_id,
            "assetPrice": self.asset_price,
            "wallet_address": self.wallet_address
        }