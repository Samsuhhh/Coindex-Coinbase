from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import Card, User
from decimal import *

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

# def valid_value(form, field):
#     data = form.data
#     if data['transaction_type'] == 'Buy':
#         if Decimal(data['cash_value']) > 5000:
#             raise ValidationError('You cannot purchase more than $5,000 in one transaction.')


class TransactionForm(FlaskForm):
    transaction_type = StringField('Buy or Sell', validators=[DataRequired()]) 
    asset_type = StringField('Asset type', validators=[DataRequired()])
    asset_amount = StringField('Amount')
    cash_value = StringField('Cash value')
    card_id = IntegerField('Card Id', validators=[DataRequired()])
    wallet_address = StringField('Wallet address', validators=[DataRequired()])
    asset_price = StringField('Buy price')