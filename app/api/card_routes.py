from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
from app.models import db, Card, Wallet, User
from app.forms import add_card_form

card_routes = Blueprint("cards", __name__)

#Error handler
def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

#CREATE A CARD
@card_routes.route('/add', methods=["GET", "POST"])
@login_required
def add_card():
    form = add_card_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        card = Card(
            first_name = form.first_name.data,
            last_name = form.last_name.data,
            exp_date = form.exp_date.data,
            card_type = form.card_type.data,
            postal_code = form.postal_code.data,
            card_number = form.card_number.data,
            last_four_digits = form.last_four_digits.data,
            cvc = form.cvc.data,
            user_id = current_user.id
        )
        db.session.add(card)
        db.session.commit()

        new_card = card.to_dict()
        return new_card

    return {"errors": validation_form_errors(form.errors), "statusCode": 401}