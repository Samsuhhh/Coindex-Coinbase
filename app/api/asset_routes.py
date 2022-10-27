from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user


from app.models import db, User, Wallet, Card

asset_routes = Blueprint("assets", __name__)



@asset_routes.route('/', methods=["GET"])
def get_asset_data():
    # response = fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
    
    return ('assets route hitting ~~~~~',)


## GET all products (asset details)
## GET all product prices
## Get Single Price By ID

