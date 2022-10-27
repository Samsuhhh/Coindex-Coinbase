from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from flask_login import current_user
from app.models import db, Card, Wallet, User

card_routes = Blueprint("cards", __name__)


@card_routes.route('/add', methods=["GET", "POST"])
def add_card():
    


    return ('hitting cards route')