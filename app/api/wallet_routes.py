from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Wallet, User, Asset
from flask_login import current_user



wallet_routes = Blueprint("wallets", __name__)


## GET CURRENT USER WALLETS
@wallet_routes.route("/", methods=["GET"])
@login_required
def get_curr_wallets():
    wallets = Wallet.query.filter(current_user.id == Wallet.user_id).all()

    wallet_list = []
    for wallet in wallets:
        wallet_dict = wallet.to_dict()
        wallet_dict["address"]

