from app.models import db, Card


def seed_cards():
    card1 = Card(
        user_id = 1,
        name='Demolition User',
        exp_date = "12/22",
        card_type = "Visa",
        postal_code = "95008",
        card_number = "4234123412341234",
        last_four_digits = "1234",
        cvc = "123",
    )

    card2 = Card(
        user_id = 2,
        name = "Martin Arnold",
        exp_date = "1/23",
        card_type = "Mastercard",
        postal_code = "78232",
        card_number = "5432123412341234",
        last_four_digits = "1234",
        cvc = "123"
    )

    db.session.add(card1)
    db.session.add(card2)
    db.session.commit()

