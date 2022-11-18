import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadAllWallets } from '../../store/session';
import BuySellModal from '../BuySell';
import TransactionHistory from '../Wallets/WalletList';
import './tradeall.css'
import './tradeall2.css'


const TradeAll2 = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const allAssets = useSelector(state => state.assets.allAssets);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllAssets())
            .then(() => setIsLoaded(true))
    }, [dispatch])


    if (!isLoaded) {
        return null
    }



    return isLoaded && sessionUser && (
        <div id='trade-all-container-row-buy-sell-BG-ebebeb'>
            <div id='trade-all-content-main-column'>
                <div id='trade-all-header'>
                    <h1>All Cryptos</h1>
                </div>
                <div id='all-assets-table-container'>
                    <div id='rows-container-flex-row'>
                        <div>Name</div>
                        <div>Price</div>
                        <div>Change (24h)</div>
                        <div>Market cap</div>
                    </div>
                    <div id='idv-row-container'>
                        {Object.keys(allAssets).map(key => (
                            <div id='row-container'>
                                <div>
                                    <div>img</div>
                                    <div>{key}</div>
                                </div>
                                <div id='flex-end'>
                                    <div id='value-container'>
                                        {Object.values(allAssets[key]).map(value => (
                                            <div id='values'>
                                                <div id='hello'>{value.toFixed(2)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <div>
                            {Object.keys(allAssets).map(key => (
                                
                                <div id='name-img-div-row'>
                                    <div>img</div>
                                    <div>
                                        <div>{key}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                            {Object.values(allAssets).map(value => (
                                <>
                                    <div id='price-div'>
                                        {value.usd}
                                    </div>
                                    <div id='change-div'>
                                        {value.usd_24h_change}
                                    </div>
                                    <div id='market-cap-div'>
                                        {value.usd_market_cap}
                                    </div>
                                    <div id='buy-sell'>
                                        buy&sell
                                    </div>
                                </>
                            ))} */}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TradeAll2;