from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
import hashlib
import secrets
from app.models import db, Wallet, Transaction, Watchlist
from pycoingecko import CoinGeckoAPI
from app.models import Wallet, User, Asset
cg = CoinGeckoAPI()

watchlist_routes = Blueprint("watchlists", __name__)


@watchlist_routes.route('/', methods=["POST"])
@login_required
def create_watchlist_on_login():
    watchlist = Watchlist(
        user_id = current_user.id,
        assetType = ''
    )
    db.session.add(watchlist)
    db.session.commit()

    return watchlist.to_dict()


@watchlist_routes.route('/add/<assetType>', methods=["PATCH"])
@login_required
def add_crypto_to_watchlist(assetType):
    watchlist = Watchlist.query.filter(Watchlist.user_id == current_user.id).first()
    

    db.session.commit()

    return watchlist.to_dict()



@watchlist_routes.route('/watchlist', methods=["GET"])
@login_required
def get_watchlist():

    watchlist = Watchlist.query.filter(Watchlist.user_id == current_user.id)
    data = cg.get_price(
        id = watchlist,
        vs_currencies='usd',
        include_market_cap='true',
        inlclude_24h_vol='true',
        precision='2'
    )

    dataObj={}
    count = 0
    while count < len(watchlist):
        for crypto in data:
            crypto = data[crypto]
            dataObj.update({str(crypto): crypto})
            count +=1
        return jsonify(dataObj)
            
        