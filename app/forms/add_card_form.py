from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import Card, User

def valid_name(form, field):
    name = field.data
    if len(name) > 45 or len(name) < 5:
        raise ValidationError('Name on card must be between 5 and 45 characters.')


def valid_card_type(form, field):
    card_type = field.data
    if len(card_type) > 10 or len(card_type) < 4:
        raise ValidationError('Our platform only accepts Visa or Mastercard at this time.')

def valid_postal_code(form, field):
    postal_code = field.data
    if not len(postal_code) == 5:
        raise ValidationError('Postal code must be 5 digits.')

# def valid_card_number(form, field):
#     card_number = field.data
#     if not card_number[0] == 4 or card_number[0] == 5:
#         raise ValidationError('Please enter a valid card number.')

def valid_last_four(form, field):
    last_four = field.data
    if not len(last_four) == 4:
        raise ValidationError('Last four digits must be accurate.')

def valid_cvc(form, field):
    cvc = field.data
    if not len(cvc) == 3:
        raise ValidationError('Please enter a valid CVC number.')
    

class AddCardForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), valid_name])
    exp_date = StringField('Expiration Date', validators=[DataRequired()])
    card_type = StringField('Card Type', validators=[DataRequired(), valid_card_type])
    postal_code = StringField('Postal Code', validators=[DataRequired(), valid_postal_code])
    card_number = StringField('Card Number', validators=[DataRequired()])
    last_four_digits = StringField('Last Four Digits', validators=[DataRequired()])
    cvc = StringField('CVC', validators=[DataRequired()])


