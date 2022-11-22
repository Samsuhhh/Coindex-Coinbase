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
    "solana",
    "stellar", 
    "tether",
    "tron",
    "uniswap",
    "usd-coin",

    "maker",
    "axie-infinity",
    "yearn-finance",
    "yfii-finance",
    "compound-coin",
    "ethereum-name-service",
    "chainlink",
    "balancer",
    "celo",
    "optimism"
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
    solana = data['solana']
    stellar = data['stellar']
    tether = data['tether']
    tron = data['tron']
    uniswap = data['uniswap']
    usdc = data['usd-coin']


    maker = data['maker']
    axie = data['axie-infinity']
    yearn = data['yearn-finance']
    yfii = data['yfii-finance']
    compound = data['compound-coin']
    ens = data['ethereum-name-service']
    chainlink = data['chainlink']
    balancer = data['balancer']
    celo = data['celo']
    optimism = data['optimism']


    all_assets_data = {
        "apecoin":apecoin,
        "avalanche-2":avalanche,
        "binancecoin":binancecoin,
        "bitcoin":bitcoin,
        "binance-usd":binance_usd,
        "cardano":cardano,
        "dogecoin":dogecoin,
        "ethereum":ethereum,
        "eth2-staking-by-poolx":eth2,
        "litecoin":litecoin,
        "matic-network":polygon,
        "near":near,
        "polkadot":polkadot,
        "ripple":ripple,
        "solana":solana,
        "stellar":stellar,
        "tether":tether,
        "tron":tron,
        "uniswap":uniswap,
        "usd-coin":usdc,

        "maker": maker,
        "axie-infinity": axie,
        "yearn-finance": yearn,
        "yfii-finance": yfii,
        "compound-coin": compound,
        "ethereum-name-service": ens,
        "chainlink": chainlink,
        "balancer": balancer,
        "celo": celo,
        "optimism": optimism
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


## testing a redo on the api calls for all assets // TOO SLOW 2:16 minutes to fetch all data
@asset_routes.route('/all', methods=['GET'])
def get_all_assets():
    dataObj = {}
    count = 0
    while count < len(coins):
        for coin in coins:
            dataObj.update({coin:cg.get_coin_by_id(id=coin, market_data='true', sparkline='true',community_data='false', developer_data='false', tickers='false', localization='false' )})
            count += 1
        return jsonify(dataObj)


## this is the route we want to use for all of one coins data mkt_cap, 24hr volume, etc
## /api/assets/v2
## can use same api route to update just current_price @ data['market_data']['current_price']['usd'] -> does update, will need to set interval on frontend
@asset_routes.route('/<cryptoName>', methods=["GET"])
def get_single_coin_data(cryptoName):
    data = cg.get_coin_by_id(
        id=cryptoName, # use passed in asset for both params and id for fetch
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
        "total_volume": total_volume,
        "ath": ath,
        "atl": atl,
        "market_cap": market_cap,
        "high_24hr": high_24hr,
        "low_24hr": low_24hr,
        "last_updated": last_updated
    }

    return jsonify(data_obj)


# ## asset images route test
# @asset_routes.route('/img/<cryptoName>', methods=["GET"])
# def get_single_coin_data(cryptoName):
#     data = cg.get_coin_by_id(
#         id=cryptoName, 
#         market_data='false',
#         sparkline='false',
#         community_data='false',
#         developer_data='false',
#         tickers='false',
#         localization='false'
#     )
    
#     smallImg = data['image']['small']
#     thumbnail = data['image']['thumb']
#     headerImg = data['image']['large']
    
#     img_data = {
#         "smallImg":smallImg,
#         "thumbnail":thumbnail,
#         "headerImg":headerImg 
#     }

#     return jsonify(img_data)




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

