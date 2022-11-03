from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
import hashlib
import secrets
from app.forms.transaction_form import TransactionForm
from app.models import db, Wallet, Transaction

from app.models import Wallet, User, Asset
from app.api.auth_routes import validation_errors_to_error_messages

wallet_routes = Blueprint("wallets", __name__)

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors



## GET CURRENT USER WALLETS
@wallet_routes.route("/", methods=["GET"])
@login_required
def get_curr_wallets():
    print('hello from the backend GET CURRENT WALLETS!!!!!')
    wallets = Wallet.query.filter(current_user.id == Wallet.user_id).all()
    return {"wallets": [wallet.to_dict() for wallet in wallets]}


## CREATE NEW WALLET
@wallet_routes.route("/", methods=["POST"])
@login_required
def create_wallet():
    print('Create wallet BACKEND route hitting')

    priv = "0x" + secrets.token_hex(32)
    print(priv)
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        wallet = Wallet(
            address = priv,
            user_id = current_user.id,
            asset_type = form.asset_type.data,
            asset_amount = form.asset_amount.data,
            cash_value = form.cash_value.data
        )
        db.session.add(wallet)
        db.session.commit()

        new_wallet = wallet.to_dict()
        return new_wallet
    return {"errors": validation_form_errors(form.errors), "status_code": 401}


## UPDATE balance of wallet
@wallet_routes.route('/', methods=["PUT"])
@login_required
def update_wallet(transaction):
    wallet = Wallet.query.get(transaction.wallet_address)

    if transaction.transaction_type == "Buy":
        wallet.asset_amount += transaction.asset_amount
    if transaction.transaction_type == "Sell":
        wallet.asset_amount -= transaction.asset_amount.data
        
        db.session.commit()
        updated_wallet = wallet.to_dict()
        return updated_wallet



## DELETE WALLET (if Empty)
@wallet_routes.route('/<int:walletId>', methods=["DELETE"])
@login_required
def delete_wallet(walletId):
    wallet = Wallet.query.get(walletId)
    print("THIS IS THE WALLET WE ARE DELETING", wallet)

    if not wallet:
        return {"message": "Wallet could not be found", "status_code": 404}

    if current_user.id != wallet.user_id:
        return {"message": "Forbidden: You are unauthorized to delete.", "status_code": 403}

    db.session.delete(wallet)
    db.session.commit()

    return