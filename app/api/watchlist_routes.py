from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
import hashlib
import secrets
from app.models import db, Wallet, Transaction, Watchlist
from pycoingecko import CoinGeckoAPI
from app.models import Wallet, User, Asset
from app.forms.watchlist_form import WatchlistForm
cg = CoinGeckoAPI()

watchlist_routes = Blueprint("watchlists", __name__)


@watchlist_routes.route('/', methods=["POST"])
@login_required
def create_watchlist_on_login():
    watchlist = Watchlist(
        user_id = current_user.id,
        asset = ''
    )
    db.session.add(watchlist)
    db.session.commit()

    return watchlist.to_dict()


@watchlist_routes.route('/add', methods=["POST"])
@login_required
def add_crypto_to_watchlist():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        watchlist_item = Watchlist(
            asset = form.asset.data ,
            user_id = current_user.id
        )
    
        db.session.add(watchlist_item)
        db.session.commit()
        watchlist = Watchlist.query.filter(Watchlist.user_id == current_user.id).all()

        watchObj = {}
        for x in watchlist:
            watchObj.update(x.to_dict())
        
        return watchObj
        




@watchlist_routes.route('/watchlist', methods=["GET"])
@login_required
def get_watchlist():

    watchlist = Watchlist.query.filter(Watchlist.user_id == current_user.id).all()
    
    names = [x.to_dict()['assetType'] for x in watchlist]

    print(names, 'NAMESNAMES')
    data = cg.get_price(
        ids = names,
        vs_currencies='usd',
        include_market_cap='true',
        inlclude_24h_vol='true',
        include_24h_change='true',
        precision='2'
    )

    dataObj={}
    count = 0
    while count < len(data):
        for crypto in data:
            details = data[crypto]
            # dataObj.update({crypto:cg.get_coin_by_id(id=crypto, market_data='true', sparkline='true',community_data='false', developer_data='false', tickers='false', localization='false' )})
            dataObj.update({crypto: details})
            count +=1

        return jsonify(dataObj)
            


@watchlist_routes.route('/remove/<assetType>', methods=["DELETE"])
@login_required
def delete_watchlist_item(assetType):
    delete = Watchlist.query.filter(Watchlist.asset == assetType and (Watchlist.user_id == current_user.id))

    if not delete:
        return {"message": "Card could not be found", "status_code":404}

    if current_user.id != delete.user_id:
        return {"message": "Forbidden", "status_code": 403}

    db.session.delete(delete)
    db.session.commit()

    return {
          "message": "Successfully deleted card",
          "statusCode": 200}