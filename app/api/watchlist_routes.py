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
            asset = form.asset.data,
            user_id = current_user.id
        )
    
    db.session.add(watchlist_item)
    db.session.commit()
    watchlist = Watchlist.query.filter(Watchlist.user_id == current_user.id).all()

    return watchlist.to_dict()



@watchlist_routes.route('/watchlist', methods=["GET"])
@login_required
def get_watchlist():

    watchlist = Watchlist.query.filter(Watchlist.user_id == current_user.id).all()
    
    names = [x.to_dict().assetType for x in watchlist]

    data = cg.get_price(
        id = names,
        vs_currencies='usd',
        include_market_cap='true',
        inlclude_24h_vol='true',
        precision='2'
    )

    dataObj={}
    count = 0
    while count < len(watchlist):
        for crypto in data:
            details = data[crypto]
            dataObj.update({str(crypto): details})
            count +=1
        return jsonify(dataObj)
            
        