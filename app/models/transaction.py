from .db import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.String(6), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    cash_value = db.Column(db.Integer, nullable=False)

    asset_type = db.Column(db.String(10), db.ForeignKey('assets.type'), nullable=False)
    card_type = db.Column(db.String(15), db.ForeignKey('cards.type'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullabe=False )
    wallet_address = db.Column(db.Integer, db.ForeignKey('wallets.address', nullable=False))

    assets = db.relationship('Asset', back_populates='transaction')
    card = db.relationship('Card', back_populates='transaction')
    user = db.relationship('User', back_populates='transaction')
    wallet = db.relationship('Wallet', back_populates='transaction')

    def to_dict(self):
        return {
            "id": self.id,
            "transaction_type": self.transaction_type,
            "amount": self.amount,
            "cash_value": self.cash_value,
            "asset_type": self.asset_type,
            "card_type": self.card_type,
            "user_id": self.user_id,
            "wallet_address": self.wallet_address
        }