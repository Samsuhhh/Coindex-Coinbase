import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { loadAllWallets, loadTransactionsThunk } from '../../store/session';
import './transactionHistory.css'


const WalletList = () => {
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
        return wallet.slice(0,6) + '...' + wallet.slice(-4)
    }
// 0x0aed762335f7f1ab794d58870a2e46e0b5692ea886e1058b5e7b2233ca885aeb

    return isLoaded && (
        <div>
            <div id='transactions-side-container'>
                <div id='transactions-header'>
                    <h1> Wallets </h1>
                </div>
                <div>
                    <div></div>
                </div>
                {activity && (
                    <div id='transactions-map-container'>
                        {Object.values(currWallet).map(wallet => (
                            <>
                                <div id='wallet-card'>
                                    <div id='wallAssetType'>{captializeFirstLetter(wallet.assetType)}</div>
                                    <div id='wallWalletAddress'>{walletShortener(wallet.wallet_address)}</div>
                                    <div id='walletAssetAmount'>{wallet.assetAmount}</div>
                                    <div id='walletCashValue'>${(wallet.assetAmount * allAssets[wallet.assetType].usd).toFixed(2)}</div>
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