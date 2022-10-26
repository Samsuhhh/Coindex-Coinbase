from .db import db


class Wallet(db.Model):
    __tablename__ = 'wallets'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    asset_type = db.Column(db.String(10), db.ForeignKey('assets.type', nullable=False))
    asset_amount = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='wallet')
    asset = db.relationship('Asset', back_populates='wallet')
    transaction = db.relationship('Transaction', back_populates='wallet')


    def to_dict(self):
        return {
            "address": self.address,
            "user_id": self.user_id,
            "asset_type": self.asset_type,
            "asset_amount": self.asset_amount
        }
        