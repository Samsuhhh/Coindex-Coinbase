from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
from app.models import db, Card, Wallet, User, Transaction
from app.forms.transaction_form import TransactionForm
from decimal import *


transaction_routes = Blueprint("transactions", __name__)

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors


@transaction_routes.route('/', methods=["GET"])
@login_required
def get_all_transactions():
    print('hello from the backend GET CURR TRANSACTIONS !!!')
    transactions = Transaction.query.filter(current_user.id == Transaction.user_id).all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}


## CREATE Transaction
@transaction_routes.route('/new', methods=["POST"])
@login_required
def create_new_transaction():
    print('CREATING NEW TRANSACTION: hello backend route')

    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # wallet_check = Wallet.query.filter(current_user.id == Wallet.user_id
        #     and Wallet.asset_type == form.asset_type.data).first()
        # print("~~~ Wallet that meets these requirements: ", wallet_check)
        # if wallet_check and form.transaction_type == "Buy":
        #     wallet_check.asset_amount += form.asset_amount.data

        transaction = Transaction (
            transaction_type = form.transaction_type.data,
            asset_type = form.asset_type.data,
            asset_amount = form.asset_amount.data,
            cash_value = form.cash_value.data,
            card_id = form.card_id.data,
            wallet_address = form.wallet_address.data,
            asset_price = form.asset_price.data,
            user_id = current_user.id,
        )
        wallet = Wallet.query.filter(Wallet.address == transaction.wallet_address).first()
        if (wallet.asset_amount and transaction.asset_amount and transaction.transaction_type == 'Sell'):
            if (Decimal(transaction.asset_amount) > Decimal(wallet.asset_amount)):
              return {"error": "Wallet balance error. You cannot make this transaction.", "statusCode":400},400
        if (wallet.cash_value and transaction.cash_value and transaction.transaction_type == 'Sell' ):
          if (Decimal(transaction.cash_value) > Decimal(wallet.cash_value)):
              return {"error": "Wallet cash value error. You cannot make this transaction.", "statusCode": 400}, 400



        db.session.add(transaction)
        db.session.commit()
        
        return transaction.to_dict()
        
    return {"errors": validation_form_errors(form.errors), "statusCode": 400}, 400

        

