import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadTransactionsThunk } from '../../store/session';
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
                        <h1>Your assets and transactions</h1>
                    </div>
                    <div id='your-assets-table-wrapper'>
                        <div id='asset-cards-container'>
                           
                        </div>
                    </div>

                    <div id='all-assets-table-container'>
                            <div>
                                <h3>Transactions</h3>
                            </div>
                        <div id='wallets-container'>
                            {Object.values(transactions).map(transaction => (
                                <>
                                    <div id='transaction-card'>
                                        <div>{transaction.id}</div>
                                        <div id='card-left'>
                                            <div>{captializeFirstLetter(transaction.assetType)}</div>
                                            <div>{transaction.amount}</div>
                                            <div>{transaction.walletAddress}</div>
                                            <div>{transaction.transactionType === "Buy" ? "Bought" : "Sold"} @ ${transaction.assetPrice}</div>
                                            <div>{transaction.wallet_address}</div>
                                        </div>
                                        <div id='card-right'>
                                            <div>${transaction.cashValue}</div>
                                        </div>
                                    </div>

                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div id='buy-sell-form'>
                    {/* <BuySellPage/> */}
                    <WalletList />
                    <div>Something cool is coming to a town near you.</div>
                </div>
            </div>
        </>
    )
}

export default AssetsPortolioPage;