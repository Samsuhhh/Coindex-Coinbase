from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
from app.models import db, Card, Wallet, User
from app.forms.add_card_form import AddCardForm
import json

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
            name = form.name.data,
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


## EDIT USER CARDS 
@card_routes.route('/edit/<int:cardId>', methods=["PUT"])
@login_required
def update_card(cardId):
  # card_one = Card.query.filter(cardId == Card.id).first()
  card_one = Card.query.get(cardId)

  print('UPDATING THIS CARD', card_one)
  if not card_one:
    return {"message": "Card could not be found", "status_code":404}, 404

  if current_user.id != card_one.user_id:
    return {"message": "Forbidden", "status_code": 403}, 403
  
  form = AddCardForm(obj=card_one)
  form_data = form.data
  print('UPDATE CARD FORM DATA: ', form_data)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print('Whats up buttercup')
    card_one.name = form.name.data,
    card_one.exp_date = form.exp_date.data,
    card_one.card_type = form.card_type.data,
    card_one.postal_code = form.postal_code.data,
    card_one.card_number = form.card_number.data,
    card_one.last_four_digits = form.last_four_digits.data,
    card_one.cvc = form.cvc.data
    # card_one.user_id = current_user.id

    form.populate_obj(card_one)
    print('CARD.TO_DICT HELLO', card_one.to_dict())
    db.session.commit()
    updated_card = card_one.to_dict()

    print('ALL THE FORM INPUTS WENT THROUGH', updated_card)
    return updated_card

  return {"errors": validation_form_errors(form.errors), "status_code": 401}


#DELETE CARD
@card_routes.route('/<int:cardId>', methods=["DELETE"])
@login_required
def delete_card(cardId):
  card = Card.query.get(cardId)

  if not card:
    return {"message": "Card could not be found", "status_code":404}

  if current_user.id != card.user_id:
    return {"message": "Forbidden", "status_code": 403}

  db.session.delete(card)
  db.session.commit()

  return {
        "message": "Successfully deleted card",
        "statusCode": 200}
  