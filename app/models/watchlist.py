from .db import db


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    assets = db.Column(db.String(2000), nullable=False)
    
    # user = db.relationship("User", back_populates="watchlist")
    

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "assetType": self.assets
        }
        