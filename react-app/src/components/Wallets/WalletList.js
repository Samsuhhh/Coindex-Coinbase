import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { loadAllWallets, loadTransactionsThunk } from '../../store/session';
import './walletList.css';
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
import polkadot from '../../aIMGS/cryptoImgs/polkadot-new-dot-logo.svg';
import polygon from '../../aIMGS/cryptoImgs/polygon-logo.png';
import ripple from '../../aIMGS/cryptoImgs/ripple-logo.png';
import solana from '../../aIMGS/cryptoImgs/solana-logo.png';
import stellar from '../../aIMGS/cryptoImgs/stellar-logo.png';
import tether from '../../aIMGS/cryptoImgs/tether-logo.png';
import tron from '../../aIMGS/cryptoImgs/tron-logo.png';
import uniswap from '../../aIMGS/cryptoImgs/uniswap-logo.png';
import usdc from '../../aIMGS/cryptoImgs/usdc-logo.png';

import maker from '../../aIMGS/cryptoImgs/maker-logo.png';
import axie from '../../aIMGS/cryptoImgs/axie-logo.png';
import yearn from '../../aIMGS/cryptoImgs/yearn-finance-logo.png';
import dfi from '../../aIMGS/cryptoImgs/dfi-money-logo.png';
import compound from '../../aIMGS/cryptoImgs/compound-logo.png';
import ens from '../../aIMGS/cryptoImgs/ens-logo.png';
import chainlink from '../../aIMGS/cryptoImgs/chainlink-logo.png';
import balancer from '../../aIMGS/cryptoImgs/balancer-logo.png';
import celo from '../../aIMGS/cryptoImgs/celo-logo.png';
import optimism from '../../aIMGS/cryptoImgs/optimism-logo.svg';
import questionMark from '../../aIMGS/question-mark.svg';

const WalletList = () => {
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
        "usd-coin": usdc,

        "maker": maker,
        "axie-infinity": axie,
        "yearn-finance": yearn,
        "yfii-finance": dfi,
        "compound-coin": compound,
        "ethereum-name-service": ens,
        "chainlink": chainlink,
        "balancer": balancer,
        "celo": celo,
        "optimism": optimism
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
        "usd-coin": "USDC",

        "maker": "MKR",
        "axie-infinity": "AXS",
        "yearn-finance": "YFI",
        "yfii-finance": "YFII",
        "compound-coin": "COMP",
        "ethereum-name-service": "ENS",
        "chainlink": "LINK",
        "balancer": "BAL",
        "celo": "CELO",
        "optimism": "OP"
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
    const [activity, setActivity] = useState(true)


    useEffect(() => {

        // if (Object.keys(transactions).length !== 0) {
        //     console.log('OKAY WE HAVE SOMETHING HERE', )
        //     setActivity(true)
        // } else {
        //     setActivity(false)
        // }
        dispatch(loadTransactionsThunk())
        dispatch(loadAllWallets())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!isLoaded) {
        return null
    }

    const captializeFirstLetter = (name) => {
        let split = name.split('');
        let res = split[0].toUpperCase();
        split.splice(0, 1, `${res}`)
        return split.join('')
    }

    const walletShortener = (wallet) => {
        return wallet.slice(0, 6) + '...' + wallet.slice(-4)
    }
    // 0x0aed762335f7f1ab794d58870a2e46e0b5692ea886e1058b5e7b2233ca885aeb

    return isLoaded && (
        <div>
            <div id='wallets-side-container'>
                <div id='wallets-header'>
                    <div id='wallets-header-text'> Wallet balances</div>
                    <div id='example-context'> Below you will find all wallets associated with your account. It will be in the following order:</div>

                    <div id='explain-div'>
                        <div id='explain-start'>
                            <div id='question-div'>
                                <img src={questionMark} alt='?' id='question-mark'/>
                            </div>
                            <div>
                                <span>Wallet asset type</span>
                                <br></br>
                                <span>Shortened wallet address</span>
                            </div>
                        </div>
                        <div id='explain-end'>
                            <span>Amount</span>
                            <br></br>
                            <span>$ value</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
                {activity && (
                    <div id='wallets-map-container'>
                        <div id='wallet-list-header'>Balances:</div>
                        {Object.values(currWallet).map(wallet => (
                            <>
                                <div key={wallet.id} id='wallet-card'>
                                    <div id='wallet-list-start'>
                                        <div id='wallet-img-div'>
                                            <img src={coinImgs[wallet.assetType]} alt='crypto-coin' id='wallet-type-img' />
                                        </div>
                                        <div>
                                            <div id='wallet-name'>
                                                {captializeFirstLetter(wallet.assetType)}
                                            </div>
                                            <div id='wallWalletAddress'>
                                                {walletShortener(wallet.wallet_address)}
                                            </div>
                                        </div>
                                    </div>
                                    <div id='wallet-list-end'>
                                        <div id='walletAssetAmount'>
                                            {wallet.assetAmount} {symbols[`${wallet.assetType}`]}
                                        </div>
                                        <div id='walletCashValue'>
                                            ${(wallet.assetAmount * allAssets[wallet.assetType].usd).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}

                    </div>
                )}

                {!activity && (
                    <>
                        <div>
                            <h4> No transactions yet. </h4>
                            <h4> Let's go spend some money. </h4>
                        </div>
                    </>
                )}

            </div>
        </div>
    )

}

export default WalletList;