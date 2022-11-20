from .db import db


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    asset_type = db.Column(db.String(20), nullable=False)
    
    user = db.relationship("User", back_populates="wallet")


    def to_dict(self):
        return {
            "id": self.id,
            "wallet_address": self.address,
            "userId": self.user_id,
            "assetType": self.asset_type,
            "assetAmount": self.asset_amount
        }
        