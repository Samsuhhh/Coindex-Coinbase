from .db import db


class Wallet(db.Model):
    __tablename__ = 'wallets'

    address = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.foreign_key('users.id'))
    asset_type = db.Column(db.String(10), db.foreign_key('assets.type', nullable=False))
    asset_amount = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "address": self.address,
            "user_id": self.user_id,
            "asset_type": self.asset_type,
            "asset_amount": self.asset_amount
        }
        