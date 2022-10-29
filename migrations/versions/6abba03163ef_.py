"""empty message

Revision ID: 6abba03163ef
Revises: 
Create Date: 2022-10-28 22:11:19.718538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6abba03163ef'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('assets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=10), nullable=False),
    sa.Column('curr_price', sa.Integer(), nullable=False),
    sa.Column('market_cap', sa.Integer(), nullable=False),
    sa.Column('symbol', sa.String(length=10), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=30), nullable=False),
    sa.Column('last_name', sa.String(length=30), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=25), nullable=False),
    sa.Column('hashed_password', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('card_type', sa.String(length=10), nullable=False),
    sa.Column('last_four_digits', sa.String(length=4), nullable=False),
    sa.Column('hashed_exp_date', sa.String(length=10), nullable=False),
    sa.Column('hashed_postal_code', sa.String(length=5), nullable=False),
    sa.Column('hashed_card_number', sa.String(length=16), nullable=False),
    sa.Column('hashed_cvc', sa.String(length=3), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wallets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('address', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('asset_type', sa.String(length=10), nullable=False),
    sa.Column('asset_amount', sa.Integer(), nullable=False),
    sa.Column('cash_value', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['asset_type'], ['assets.type'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('address')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('transaction_type', sa.String(length=6), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('cash_value', sa.Integer(), nullable=False),
    sa.Column('asset_type', sa.String(length=10), nullable=False),
    sa.Column('card_type', sa.String(length=15), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('wallet_address', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['asset_type'], ['assets.type'], ),
    sa.ForeignKeyConstraint(['card_type'], ['cards.card_type'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['wallet_address'], ['wallets.address'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transactions')
    op.drop_table('wallets')
    op.drop_table('cards')
    op.drop_table('users')
    op.drop_table('assets')
    # ### end Alembic commands ###
