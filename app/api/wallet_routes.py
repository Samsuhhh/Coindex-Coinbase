from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
import hashlib
import secrets
from app.forms.transaction_form import TransactionForm
from app.models import db, Wallet, Transaction
from decimal import *

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
    return {"wallets":[wallet.to_dict() for wallet in wallets]}


## CREATE NEW WALLET with asset type
@wallet_routes.route("/<assetType>", methods=["POST"])
@login_required
def create_wallet(assetType):
    print('Create wallet BACKEND route hitting')

    priv = "0x" + secrets.token_hex(32)
    # form = TransactionForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    wallet = Wallet(
        address = priv,
        user_id = current_user.id,
        asset_type = assetType,
        asset_amount = 0,
        # cash_value = data['cash_value']
    )
    db.session.add(wallet)
    db.session.commit()

    new_wallet = wallet.to_dict()
    if new_wallet:
        return new_wallet
    return {"errors": 'NAH THAT AINT IT - NEW WALLET ROUTE', "statusCode": 401}, 401


## CHECK wallet route 
@wallet_routes.route('/check/<assetType>', methods=["GET"])
def check_wallet_status(assetType):
    # value passed in as parameter might change to just asset.name or something else
    first_query = Wallet.query.filter(Wallet.asset_type == assetType)
    wallet_check = first_query.filter(current_user.id == Wallet.user_id).first()
    print("~~~ Wallet that meets these requirements: ", wallet_check)
    if wallet_check:
        return {'message': wallet_check.address}
    else:
        return {
            "message": "Check wallet failed",
            "statusCode": 401}, 401

        # return {'error': 'NOPE. You already have a wallet of that asset type.', 'statusCode': 401}, 401 #or None but we will see if False works first
        
    

## UPDATE balance of wallet
@wallet_routes.route('/update/<int:transaction_id>', methods=["PUT"])
@login_required
def update_wallet(transaction_id):

    transaction_data = Transaction.query.get(transaction_id)
    wallet_order = Wallet.query.order_by(Wallet.id.desc())
    wallet = wallet_order.filter(Wallet.address == transaction_data.wallet_address).first()

    print('WALLET IN TRANSACTION', wallet)

    wallet_balance = Decimal(wallet.asset_amount)
    transaction_balance = Decimal(transaction_data.asset_amount)
    

    print('WALLET BALANCE', wallet_balance)
    print('TRANSACTION asset amount before casting:',transaction_data.asset_amount)
    print('TRANSACTION BALALNCE after decimal casting', transaction_balance)
    print('Queried Transaction data.type',transaction_data.transaction_type )

    if transaction_data.transaction_type == "Buy":
        wallet_balance += transaction_balance
        res = str(wallet_balance)
        wallet.asset_amount = res
        print('SHOULD BE NEW SUM~~~~~~~~~', res)
        print('check new wallet asset amount:',wallet.asset_amount)
        db.session.commit()
        # if int(transaction_data.asset_amount) != 0:
        #     res = int(wallet.asset_amount) + int(transaction_data.asset_amount)
        #     wallet.asset_amount = str(res)
        ## elif int(transaction_data.cash_value != )

        # elif transaction_data.cash_value:
        #     transaction_data.cash_value / 
    elif transaction_data.transaction_type == "Sell":
        wallet_balance - transaction_balance
        wallet.asset_amount = str(res)
    

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
        return {"message": "Wallet could not be found", "statusCode": 404}, 404

    if current_user.id != wallet.user_id:
        return {"message": "Forbidden: You are unauthorized to delete.", "statusCode": 403}, 403

    db.session.delete(wallet)
    db.session.commit()

    return