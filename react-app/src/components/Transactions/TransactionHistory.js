import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { loadTransactionsThunk } from '../../store/session';
import './transactionHistory.css'




const TransactionHistory = () => {
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

    // useEffect(() => {
    //     if (transactions){
    //         setActivity(true)
    //     }
    //     setActivity(false)
    // }, [dispatch, transactions])

    useEffect(() => {
        if (transactions) setActivity(true)
        dispatch(loadTransactionsThunk())
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

    const pastTenseType = (type) => {
        if (type === 'Buy') return 'Bought'

    }

    return isLoaded && (
        <div>
            <div id='transactions-side-container'>
                <div id='transactions-header'>
                    <h1> Activity </h1>
                </div>
                <div>
                    <div></div>
                </div>
                {activity && (
                    <div id='transactions-map-container'>
                        {Object.values(transactions).map(transaction => (
                            <>
                                <div id='transaction-card'>
                                    <div id='card-left'>
                                        {/* <div>{transaction.assetType.toUpperCase()}</div> */}
                                        <div>{captializeFirstLetter(transaction.assetType)}</div>
                                        <div>{transaction.amount}</div>
                                        <div>{transaction.walletAddress}</div>
                                        <div>{transaction.transactionType === "Buy" ? "Bought" : "Sold"} @ ${transaction.assetPrice}</div>
                                    </div>
                                    <div id='card-right'>
                                        <div>${transaction.cashValue}</div>
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

export default TransactionHistory;