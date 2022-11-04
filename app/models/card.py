from .db import db
from werkzeug.security import generate_password_hash, check_password_hash

class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    # first_name = db.Column(db.String(40), nullable=False)
    # last_name = db.Column(db.String(40), nullable=False)  
    name = db.Column(db.String(40), nullable=False)  
    exp_date = db.Column(db.String(10), nullable=False)
    card_type = db.Column(db.String(10), nullable=False)
    postal_code = db.Column(db.String(5), nullable=False)
    hashed_card_number = db.Column(db.String(105), nullable=False)
    last_four_digits = db.Column(db.String(4), nullable=False)
    cvc = db.Column(db.String(3), nullable=False)
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

    # @property
    # def exp_date(self):
    #     return self.hashed_exp_date

    # @exp_date.setter
    # def exp_date(self, exp_date):
    #     self.hashed_exp_date = generate_password_hash(exp_date)
    
    # def check_exp_date(self, exp_date):
    #     return check_password_hash(self.exp_date, exp_date)

    # @property
    # def postal_code(self):
    #     return self.hashed_postal_code
    
    # @postal_code.setter
    # def postal_code(self, postal_code):
    #     self.hashed_postal_code = generate_password_hash(postal_code)
    
    # def check_postal_code(self, postal_code):
    #     return check_password_hash(self.postal_code, postal_code)

    # @property
    # def cvc(self):
    #     return self.hashed_cvc
    
    # @cvc.setter
    # def cvc_number(self, cvc):
    #     self.hashed_cvc = generate_password_hash(cvc)
    
    # def check_cvc(self, cvc):
    #     return check_password_hash(self.cvc, cvc)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "cardType": self.card_type,
            "lastFourDigits": self.last_four_digits,
            "userId": self.user_id
        }


    