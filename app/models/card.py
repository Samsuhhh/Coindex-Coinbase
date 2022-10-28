from .db import db
from werkzeug.security import generate_password_hash, check_password_hash

class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)    
    exp_date = db.Column(db.String(10), nullable=False)
    card_type = db.Column(db.String(10), nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    hashed_card_number = db.Column(db.Integer, nullable=False)
    last_four_digits = db.Column(db.Integer, nullable=False)
    cvc = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="card")
    transaction = db.relationship("Transaction", back_populates="card")

    @property
    def card_number(self):
        return self.hashed_card_number

    @card_number.setter
    def card_number(self, card_number):
        self.hashed_card_number = generate_password_hash(card_number)

    def check_card_number(self, card_number):
        return check_password_hash(self.card_number, card_number)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "expDate": self.exp_date,
            "cardType": self.card_type,
            "postalCode": self.postal_code,
            "lastFourDigits": self.last_four_digits,
            "cvc": self.cvc,
            "userId": self.user_id
        }


    