import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadAllWallets, loadTransactionsThunk } from '../../store/session';
import BuySellPage from '../BuySell/BuySellPage';
import WalletList from '../Wallets/WalletList';
import './assetsPortfolioPage.css';

import arrows from '../../aIMGS/arrows-vertical.svg';
import apecoin from '../../aIMGS/cryptoImgs/apecoin-logo.png';
import avalanche from '../../aIMGS/cryptoImgs/avalanche-logo.png';
import bitcoin from '../../aIMGS/cryptoImgs/bitcoin-logo.png';
import bnb from '../../aIMGS/cryptoImgs/bnb-logo.png';
import busd from '../../aIMGS/cryptoImgs/busd-logo.png';
import cardano from '../../aIMGS/cryptoImgs/cardano-logo.png';
import dogecoin from '../../aIMGS/cryptoImgs/dogecoin-logo.png';
import eth2 from '../../aIMGS/cryptoImgs/eth2-logo.png';
import ethereum from '../../aIMGS/cryptoImgs/ethereum-logo.png';
import litecoin from '../../aIMGS/cryptoImgs/litecoin-logo.png';
import near from '../../aIMGS/cryptoImgs/near-logo.png';
import polkadot from '../../aIMGS/cryptoImgs/polkadot-logo.png';
import polygon from '../../aIMGS/cryptoImgs/polygon-logo.png';
import ripple from '../../aIMGS/cryptoImgs/ripple-logo.png';
import solana from '../../aIMGS/cryptoImgs/solana-logo.png';
import stellar from '../../aIMGS/cryptoImgs/stellar-logo.png';
import tether from '../../aIMGS/cryptoImgs/tether-logo.png';
import tron from '../../aIMGS/cryptoImgs/tron-logo.png';
import uniswap from '../../aIMGS/cryptoImgs/uniswap-logo.png';
import usdc from '../../aIMGS/cryptoImgs/usdc-logo.png';


const AssetsPortolioPage = () => {

    const coinImgs = {
        "apecoin": apecoin,
        "avalanche-2": avalanche,
        "binancecoin": bnb,
        "bitcoin": bitcoin,
        "binance-usd": busd,
        "cardano": cardano,
        "dogecoin": dogecoin,
        "ethereum": ethereum,
        "eth2-staking-by-poolx": eth2,
        "litecoin": litecoin,
        "matic-network": polygon,
        "near": near,
        "polkadot": polkadot,
        "ripple": ripple,
        "solana": solana,
        "stellar": stellar,
        "tether": tether,
        "tron": tron,
        "uniswap": uniswap,
        "usd-coin": usdc
    }


    const symbols = {
        "apecoin": "APE",
        "avalanche-2": "AVAX",
        "binancecoin": "BNB",
        "bitcoin": "BTC",
        "binance-usd": "BUSD",
        "cardano": "ADA",
        "dogecoin": "DOGE",
        "ethereum": "ETH",
        "eth2-staking-by-poolx": "ETH2",
        "litecoin": "LTC",
        "matic-network": "MATC",
        "near": "NEAR",
        "polkadot": "DOT",
        "ripple": "XRP",
        "solana": "SOL",
        "stellar": "XLM",
        "tether": "USDT",
        "tron": "TRX",
        "uniswap": "UNI",
        "usd-coin": "USDC"
    }





    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const currUser = useSelector(state => state.session.user)
    const currWallet = useSelector(state => state.session.wallets)
    const currentCards = useSelector(state => state.session.card);
    const allAssets = useSelector(state => state.assets.allAssets);
    const transactions = useSelector(state => state.session.transactions);

    const [isLoaded, setIsLoaded] = useState(true) // for news api if we implement that data
    const [activity, setActivity] = useState(false)




    useEffect(() => {
        (async () => {
            await dispatch(getCurrentUserCards())
            await dispatch(loadAllWallets())
            setIsLoaded(true)
        })();

        // dispatch(getOneAsset()) // just for testing, move to singleAsset page
    }, [dispatch])


    const cashValueCalculator = (amount, currPrice) => {
        let val = Number(amount) * Number(currPrice)
        return val
    };

    const amountCalculator = (cashValue, currPrice) => {
        let amt = Number(cashValue) / Number(currPrice)
        return amt
    };
    const getPortfolioBalance = () => {
        let total = 0;
        Object.values(currWallet).forEach((wallet) => {
            let amt = Number(wallet.assetAmount)
            Object.keys(currWallet).forEach(key => {
                let price = allAssets[key].usd
                let cash = cashValueCalculator(amt, price)
                total += cash
            })
        })

        return total.toFixed(2)
    }
    const portfolio = getPortfolioBalance();

    useEffect(() => {
        dispatch(loadAllWallets())
    }, [dispatch])




    const captializeFirstLetter = (name) => {
        let split = name.split('');
        let res = split[0].toUpperCase();
        split.splice(0, 1, `${res}`)
        return split.join('')
    }

    const listen = Object.values(transactions).length


    useEffect(() => {
        dispatch(loadTransactionsThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch, listen])

    return isLoaded && (
        <>
            <div id='trade-all-container-row-buy-sell-BG-ebebeb'>
                <div id='trade-all-content-main-column'>
                    <div id='trade-all-header' >
                        <div id='balance-div'>
                            Your Portfolio
                        </div>
                        <div id='balance-cash-value'>${portfolio ? portfolio : "0.00"} </div>
                        <div id='balance-caption'>{portfolio ? "Let's go buy some more!" : "Let's go buy crypto!"}</div>
                    </div>
                    <div id='your-assets-table-wrapper'>
                        <div id='asset-cards-container'>

                        </div>
                    </div>

                    <div id='all-assets-table-container'>
                        <div>
                            Transactions
                        </div>
                        <>
                            <h4>Have a look around! When you're ready to buy, click the Buy & Sell button.</h4>

                        </>
                        <div id='transactions-container'>
                            <div id='balance-header'>Balance: ---------------------------------------------------------------------------------> </div>
                            {Object.values(transactions).reverse().map(transaction => (
                                <>
                                    <div id='transaction-card'>
                                        <div id='card-left'>
                                            <div id='row-history'>
                                                <div id='transactions-row-start'>
                                                    <div id='transaction-img-div'>
                                                        <img src={arrows} alt='arrows' id='transactions-img'/>
                                                    </div>
                                                    <div>
                                                        <div id='transaction-first-row'>{transaction.transactionType === "Buy" ? "Bought" : "Sold"} {captializeFirstLetter(transaction.assetType)} @ ${transaction.assetPrice}</div>
                                                        <div id='wallet-address-transaction'>{transaction.wallet_address}</div>

                                                    </div>
                                                </div>
                                                <div id='transactions-row-end'>
                                                    <div id='transaction-amount'>{transaction.transactionType === 'Buy' ? '+' + transaction.amount + ' ' + symbols[`${transaction.assetType}`] : '-' + transaction.amount + ' ' + symbols[`${transaction.assetType}`]}</div>
                                                    <div id='transaction-cash-value'>{transaction.transactionType === 'Buy' ? '+$' + (transaction.amount * transaction.assetPrice).toFixed(2) : '-$' + (transaction.amount * transaction.assetPrice).toFixed(2)}</div>
                                                </div>
                                            </div>
                                            {/* <div>{transaction.transactionType === "Buy" ? "Bought" : "Sold"} @ ${transaction.assetPrice}</div> */}
                                        </div>
                                        {/* <div id='card-right'>
                                            <div>${transaction.cashValue}</div>
                                        </div> */}
                                    </div>

                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div id='buy-sell-form'>
                    {/* <BuySellPage/> */}
                    <WalletList />
                </div>
            </div>
        </>
    )
}

export default AssetsPortolioPage;