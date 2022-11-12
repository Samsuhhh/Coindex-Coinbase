from .db import db


class Wallet(db.Model):
    __tablename__ = "wallets"

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(64), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # asset_type = db.Column(db.String(10), db.ForeignKey("assets.type"), nullable=False)
    asset_type = db.Column(db.String(20), nullable=False)
    asset_amount = db.Column(db.String(50), nullable=False)
    cash_value = db.Column(db.String(50), nullable=True) # handle on frontend asset_amount * current price


    user = db.relationship("User", back_populates="wallet")
    # asset = db.relationship("Asset", back_populates="wallet")
    # transaction = db.relationship("Transaction", back_populates="wallet", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "wallet_address": self.address,
            "userId": self.user_id,
            "assetType": self.asset_type,
            "assetAmount": self.asset_amount
        }
        