from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user


from app.models import Wallet, User, Asset
from app.api.auth_routes import validation_errors_to_error_messages

wallet_routes = Blueprint("wallets", __name__)


## GET CURRENT USER WALLETS
@wallet_routes.route("/", methods=["GET"])
@login_required
def get_curr_wallets():
    print('hello!!!!!!!!!!')
    wallets = Wallet.query.filter(current_user.id == Wallet.user_id).all()
    return {"wallets": [wallet.to_dict() for wallet in wallets]}


@wallet_routes.route("/", methods=["POST"])
@login_required
def create_wallet():
    print('Create wallet route hitting')
    return