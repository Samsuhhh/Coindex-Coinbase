from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import Card, User

coins = [ 
    "apecoin",
    "avalanche-2", 
    "binancecoin",
    "bitcoin",
    "binance-usd",
    "cardano",
    "dogecoin",
    "ethereum", 
    "eth2-staking-by-poolx",
    "litecoin",
    "matic-network",
    "near",
    "polkadot",
    "ripple",
    "shiba-inu",
    "solana",
    "stellar", 
    "tether",
    "tron",
    "uniswap",
    "usd-coin"
]

def valid_value(form, field):
    cash_value = form.data
    if cash_value > 5000:
        raise ValidationError('You cannot purchase more than $5,000 in one transaction.')


class TransactionForm(FlaskForm):
    transaction_type = SelectField('Buy or Sell', choices=['Buy', 'Sell'], validators=[DataRequired()]) 
    asset_amount = IntegerField('Amount', validators=[DataRequired()])
    cash_value = IntegerField('Cash value', validators=[ valid_value])
    asset_type = SelectField('Asset type', choices=[coins], validators=[DataRequired()])
    card = SelectField('Select your payment method', validators=[DataRequired()])
    wallet_address = StringField('Wallet address', validators=[DataRequired()])