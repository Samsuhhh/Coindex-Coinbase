from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Card




class AddCardForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    exp_date = StringField('Expiration Date', validators=[DataRequired()])
    card_type = StringField('Card Type', validators=[DataRequired()])
    postal_code = StringField('Postal Code', validators=[DataRequired()])
    card_number = StringField('Card Number', validators=[DataRequired()])
    last_four_digits = StringField('Last Four Digits', validators=[DataRequired()])
    cvc = IntegerField('CVC', validators=[DataRequired()])
    accounting = StringField('Debit or Credit', validators=[DataRequired()])
    


