from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
from app.models import db, Card, Wallet, User
from app.forms.add_card_form import AddCardForm

card_routes = Blueprint("cards", __name__)

#Error handler
def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

#CREATE A CARD
@card_routes.route('/add', methods=["POST"])
@login_required
def add_card():
    form = AddCardForm()
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


# GET CURRENT USER CARDS
@card_routes.route('/', methods=["GET"])
@login_required
def get_cards():
  cards = Card.query.filter(current_user.id == Card.user_id).all()
  return {"cards": [card.to_dict() for card in cards]}


# ## EDIT USER CARDS
# @card_routes.route('/cards', methods="PUT")
# @login_required
# def update_card(card_id):
#   card = Card.query.get(card_id)

#   if not card:
#     return {"message": "Card could not be found", "status_code":404}

#   if current_user.id != card.user_id:
#     return {"message": "Forbidden", "status_code": 403}
  
#   form = EditCardForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():
#     card.first_name = form.first_name.data,
#     card.last_name = form.last_name.data,
#     card.exp_date = form.exp_date.data,
#     card.card_type = form.card_type.data,
#     card.postal_code = form.postal_code.data,
#     card.card_number = form.card_number.data,
#     card.last_four_digits = form.last_four_digits.data,
#     card.cvc = form.cvc.data,
#     card.user_id = current_user.id

#     db.session.commit()
#     updated_card = card.to_dict()
#     return updated_card
#   return {"errors": validation_form_errors(form.errors), "status_code": 401}



@card_routes.route('/', methods=["DELETE"])
@login_required
def delete_card(id):
  card = Card.query.get(id)

  if not card:
    return {"message": "Card could not be found", "status_code":404}

  if current_user.id != card.user_id:
    return {"message": "Forbidden", "status_code": 403}

  db.session.delete(card)
  db.session.commit()
  