import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadAllWallets, loadTransactionsThunk } from '../../store/session';
import BuySellPage from '../BuySell/BuySellPage';
import WalletList from '../Wallets/WalletList';
import './assetsPortfolioPage.css';



const AssetsPortolioPage = () => {
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
                        <div id='wallets-container'>
                            
                            {Object.values(transactions).reverse().map(transaction => (
                                <>
                                    <div id='transaction-card'>
                                        <div id='card-left'>
                                            <div id='row-history'>
                                                <div>{transaction.amount} {captializeFirstLetter(transaction.assetType)}</div>
                                                
                                            </div>
                                            <div>{transaction.transactionType === "Buy" ? "Bought" : "Sold"} @ ${transaction.assetPrice}</div>
                                            <div>{transaction.wallet_address}</div>
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