from .db import db

class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    exp_date = db.Column(db.String(10), nullable=False)
    card_type = db.Column(db.String(10), nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    card_number = db.Column(db.Integer, nullable=False)
    last_four_digits = db.Column(db.Intger, nullable=False)
    cvc = db.Column(db.Integer, nullable=False)
    accounting = db.Column(db.String(4), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "exp_date": self.exp_date,
            "card_type": self.card_type,
            "postal_code": self.postal_code,
            "card_number": self.card_number,
            "last_four_digits": self.last_four_digits,
            "cvc": self.cvc,
            "accounting": self.accounting,
            "user_id": self.user_id
        }

    