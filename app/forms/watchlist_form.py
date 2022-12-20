from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class WatchlistForm(FlaskForm):
    asset = StringField('Asset name', validators=[DataRequired()])