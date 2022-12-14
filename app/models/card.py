from .db import db


class Card (db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)  
    exp_date = db.Column(db.String(10), nullable=False)
    card_type = db.Column(db.String(10), nullable=False)
    postal_code = db.Column(db.String(10), nullable=False)
    card_number = db.Column(db.String(105), nullable=False)
    last_four_digits = db.Column(db.String(10), nullable=False)
    cvc = db.Column(db.String(5), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="card")
    # transaction = db.relationship("Transaction", back_populates="card")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "cardType": self.card_type,
            "lastFourDigits": self.last_four_digits,
            "userId": self.user_id
        }