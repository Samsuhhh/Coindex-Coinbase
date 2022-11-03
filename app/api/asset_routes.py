from crypt import methods
from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required
from flask_login import current_user
import requests
import json
from pycoingecko import CoinGeckoAPI
from app.models import db, User, Wallet, Card

## CHECK: Do I need to include CoinGecko in pipfile? 
cg = CoinGeckoAPI()

asset_routes = Blueprint("assets", __name__)

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

coins = [ 
    "apecoin",
    "avalanche-2", 
    "binancecoin",
    "bitcoin",
    "binance-usd",
    "cardano",
    "dogecoin",
    "ethereum", 
    "eth2-staking-by-poolx",
    "litecoin",
    "matic-network",
    "near",
    "polkadot",
    "ripple",
    "shiba-inu",
    "solana",
    "stellar", 
    "tether",
    "tron",
    "uniswap",
    "usd-coin",
]


## Get One price data TEST: SUCCESS!!
## make paramets for cg.get_price() dynamic aka pass in data in parameter of get_asset_data_cg(here), simple data when displaying all; use next route for details
## will set currency to USD for simplicity
# /api/assets/
# probably use this to update prices? returns current price, 24h change, 24h volume USD, usd market_cap

## Get all simple information
@asset_routes.route('/', methods=["GET"])
def get_asset_data_cg():
    data = cg.get_price(
        # ids= "apecoin, avalanche-2, binancecoin, bitcoin, binance-usd, cardano, dogecoin, ethereum, eth2-staking-by-poolx, litecoin, matic-network, near, polkadot, ripple, shiba-inu, solana, stellar,  tether, tron, uniswap, usd-coin",
        ids=coins,
        vs_currencies='usd',
        include_market_cap='true',
        include_24hr_vol='true',
        include_24hr_change='true',
        precision='2'
        )

    apecoin = data['apecoin']
    avalanche = data['avalanche-2']
    binancecoin = data['binancecoin']
    bitcoin = data['bitcoin']
    binance_usd = data['binance-usd']
    cardano = data['cardano']
    dogecoin = data['dogecoin']
    ethereum = data['ethereum']
    eth2 = data['eth2-staking-by-poolx']
    litecoin = data['litecoin']
    polygon = data['matic-network']
    near = data['near']
    polkadot = data['polkadot']
    ripple = data['ripple']
    shiba = data['shiba-inu']
    solana = data['solana']
    stellar = data['stellar']
    tether = data['tether']
    tron = data['tron']
    uniswap = data['uniswap']
    usdc = data['usd-coin']

    # all_assets_data = [
    #     {"apecoin":apecoin},
    #     {"avalance":avalance},
    #     {"binancecoin":binancecoin},
    #     {"bitcoin":bitcoin},
    #     {"binance_usd":binance_usd},
    #     {"cardano":cardano},
    #     {"dogecoin":dogecoin},
    #     {"ethereum":ethereum},
    #     {"eth2":eth2},
    #     {"litecoin":litecoin},
    #     {"polygon":polygon},
    #     {"near":near},
    #     {"polkadot":polkadot},
    #     {"ripple":ripple},
    #     {"shiba":shiba},
    #     {"solana":solana},
    #     {"stellar":stellar},
    #     {"tether":tether},
    #     {"tron":tron},
    #     {"uniswap":uniswap},
    #     {"usdc":usdc}
    # ]
    all_assets_data = {
        "apecoin":apecoin,
        "avalanche":avalanche,
        "binance_coin":binancecoin,
        "bitcoin":bitcoin,
        "binance_usd":binance_usd,
        "cardano":cardano,
        "dogecoin":dogecoin,
        "ethereum":ethereum,
        "eth2":eth2,
        "litecoin":litecoin,
        "polygon":polygon,
        "near":near,
        "polkadot":polkadot,
        "ripple":ripple,
        "shiba":shiba,
        "solana":solana,
        "stellar":stellar,
        "tether":tether,
        "tron":tron,
        "uniswap":uniswap,
        "usdc":usdc
    }

## REFACTOR ALL OF IT TO USE THE SINGLE COIN ROUTE (probably easier and get's more data. Can also get 24h change but need to find key path)
    # refEthereum = cg.get_coin_by_id(
    #     id='ethereum',
    #     market_data='true',
    #     sparkline='true',
    #     community_data='false',
    #     developer_data='false',
    #     tickers='false',
    #     localization='false'
    # )
    # ethereum_name = refEthereum['name']
    # ethereum_current_price = refEthereum['market_data']['current_price']['usd']
    # ethereum_market_cap = refEthereum['market_data']['market_cap']['usd']
    # ethereum_symbol = refEthereum['symbol']

    return jsonify(all_assets_data)




## this is the route we want to use for all of one coins data mkt_cap, 24hr volume, etc
## /api/assets/v2
## can use same api route to update just current_price @ data['market_data']['current_price']['usd'] -> does update, will need to set interval on frontend
@asset_routes.route('/v2/', methods=["GET"])
def get_single_coin_data(asset):
    data = cg.get_coin_by_id(
        id='ethereum', # use passed in asset for both params and id for fetch
        market_data='true',
        sparkline='true',
        community_data='false',
        developer_data='false',
        tickers='false',
        localization='false'
    )
    # Parsing needed data from api
    description = data['description']
    name = data['name']
    rank = data['coingecko_rank']
    headerImg = data['image']['large']
    smallImg = data['image']['small']
    thumbnail = data['image']['thumb']
    ath = data['market_data']['ath']['usd']
    atl = data['market_data']['atl']['usd']
    supply = data['market_data']['circulating_supply']
    current_price = data['market_data']['current_price']['usd']
    high_24hr = data['market_data']['high_24h']['usd']
    low_24hr = data['market_data']['low_24h']['usd']
    market_cap = data['market_data']['market_cap']['usd']
    total_volume = data['market_data']['total_volume']['usd']
    symbol = data['symbol']
    last_updated = data['last_updated']
    ## data['market_cap_rank']
    ## data['market_data']['PRICE_CHANGE_STUFF FOR GRAPH??']
    # data_lst = [description, name, rank, headerImg, smallImg, thumbnail, ath, atl, supply, current_price, high_24hr, low_24hr, market_cap, total_volume, symbol, last_updated]
    
    data_obj = {
        "name": name,
        "symbol": symbol,
        "description": description,
        "rank": rank,
        "headerImg": headerImg,
        "smallImg": smallImg,
        "thumbnail": thumbnail,
        "current_price": current_price,
        "supply": supply,
        "total_volumne": total_volume,
        "ath": ath,
        "atl": atl,
        "market_cap": market_cap,
        "high_24hr": high_24hr,
        "low_24hr": low_24hr,
        "last_updated": last_updated
    }

    return jsonify(data_obj)
    

## returns a list of objects: each obj includes id, symbol, name
#
@asset_routes.route('/coinslist', methods=["GET"])
def get_coins_list():
    data = cg.get_coins_list(ids=coins)
    for line in data:
        print(line)
    return


## Open, High, Low, Close prices by ID; also get this data from /v2 route.
@asset_routes.route('/ohlc', methods=["GET"])
def get_coin_ohlc():
    data = cg.get_coin_ohlc_by_id(id='bitcoin', vs_currency='usd', days='7')
    for line in data:
        print(line)
    return




## COINBASE API, DELETE BEFORE MERGING TO PRODUCTION

# ## COINBASE WEBSOCKET URL: wss://ws-feed.exchange.coinbase.com

# ## GET ALL COINS for EXPLORE and trading; all prices/market cap/ etc
# ## this is going to be used for conversion rates DO NOT DELETE
# @asset_routes.route('/deprecated', methods=["GET"])
# def get_asset_data():
#     req = requests.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
#     res = json.loads(req.content)
#     # print(res.data.currency)
#     # return res
#     return {res["data"]["currency"]: res["data"]["rates"]["USD"]}

# ## GET ONE COIN by ID or symbol
# # @asset_routes.route('/coins/:<int>', methods=["GET"])
# # def get_single_asset_data(coin):
# #     return 


# ## Backend route to get all products (DO NOT DELETE for now) might need later
# ## Del after exploring websocket potential
# @asset_routes.route('/all/deprecated', methods=["GET"])
# def get_all_assets():
#     req = requests.get('https://api.exchange.coinbase.com/products')
#     res = json.loads(req.content)
#     for data in res:
#         if "USD" in data["id"]:
#             dataObj = {data["id"]: data["quote_currency"]}
#             return dataObj


## GET all products (asset details)
## GET all product prices
## Get Single Price By ID

