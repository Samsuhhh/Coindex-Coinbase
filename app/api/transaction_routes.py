from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
from app.models import db, Card, Wallet, User, Transaction
from app.forms.transaction_form import TransactionForm


transaction_routes = Blueprint("transactions", __name__)

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors


@transaction_routes.routes('/', methods=["GET"])
@login_required
def get_all_transactions():
    print('hello from the backend GET CURR TRANSACTIONS !!!')
    transactions = Transaction.query.filter(current_user.id == Transaction.user_id).all()
    return {"transactions": [transactions.to_dict() for log in transactions]}


## CREATE Transaction
@transaction_routes.routes('/new', methods=["POST"])
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
            card = form.card.data,
            wallet_address = form.wallet_address.data
        )
        db.session.add(transaction)
        db.session.commit()
        
        return transaction.to_dict()
        
    return {"errors": validation_form_errors(form.errors), "statusCode": 401}
        

