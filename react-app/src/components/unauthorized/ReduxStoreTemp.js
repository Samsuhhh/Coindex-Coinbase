
store = {
    session: {}

    assets: {
        allAssets: {
            [assetId]: {
                assetData
            }
        },
        singleAsset: {
            assetId: int(assetId), btc
            symbol: str(assetSymbol),
            price: int(assetCurrPrice),
            supply: int(assetSupply),
            marketCap: int(assetMarketCap),
            user: {

            }
        }
    },

    transactions: {
        transactionId: {
            transactionType: str(buy / sell),
            amount: int(transactionAmount),
            cashValue: int(cashValue),
            assetType: str(assetName / symbol),
            cardType: str(cardType),
            userId: current_user.id,
        }
    },

    wallets: {
        walletId: {
            address,
            user_id,
            asset_type,
            asset_amount,
            cashValue
        }
    },

    cards: {
        cardData
    },

    user: {
        wallets: [wallet.assetType ?]: { walletData },
transactions: { transactionData }
    }
}


v2 ~~~~~~~~~~~~~~~v2 ~~~~~~~~~~~~~~~v2 ~~~~~~~~~~~~~~~v2

store = {
    session: {
        user: {
            userData,
            wallets: {
                [wallet.type ?]: { walletData },
            },
            card: { allCurrentUserCardData }
        },
        transactions: {
            [transactionId]: {
                transactionType: str(buy / sell),
                amount: int(transactionAmount),
                cashValue: int(cashValue),
                assetType: str(assetName / symbol),
                wallet: {?},
                singleCard: { singleCardData }
            }
        },
    },

    coins: {
        allCoins: {
            [coinId]: {
                coinData
            }
        },
        singleCoin: {
            coinId: int(coinId),
            symbol: str(coinSymbol),
            price: int(coinCurrPrice),
            marketCap: int(coinMarketCap)
        }
    }
}