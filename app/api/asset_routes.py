from crypt import methods
from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required
from flask_login import current_user
import requests
import json


from app.models import db, User, Wallet, Card

asset_routes = Blueprint("assets", __name__)



@asset_routes.route('/', methods=["GET"])
def get_asset_data():
    req = requests.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
    res = json.loads(req.content)
    # print(res.data.currency)
    # return res
    return {res["data"]["currency"]: res["data"]["rates"]["USD"]}

@asset_routes.route('/all', methods=["GET"])
def get_all_assets():
    req = requests.get('https://api.exchange.coinbase.com/products')
    res = json.loads(req.content)
    for data in res:
        if "USD" in data["id"]:
            dataObj = {data["id"]: data["quote_currency"]}
            return dataObj

## GET all products (asset details)
## GET all product prices
## Get Single Price By ID

