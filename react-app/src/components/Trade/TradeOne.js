import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';
import './tradeone.css'

const TradeOne = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const singleAsset = useSelector(state => state.assets.singleAsset)
    const allAssets = useSelector(state => state.assets.allAssets)
    const [isLoaded, setIsLoaded] = useState(false)
    const [overview, setOverview] = useState(true)
    const [walletview, setWalletview] = useState(false)
    const dispatch = useDispatch();
    let pageView;
    const params = useParams();
    const { crypto } = params;


    useEffect(() => {
        dispatch(getCurrentUserCards())
        dispatch(getOneAsset(crypto))
            .then(() => setIsLoaded(true))
    }, [dispatch, crypto])

    if (overview) {
        pageView = {

        }
    }

    return isLoaded && (

        <div id='single-asset-container'>
            <div id='single-asset-header'>
                <div id='header-left-row'>
                    <div id='crypto-img'>
                        <img alt='crypto-img' src={singleAsset.smallImg} />
                    </div>
                    <div id=''>
                        <h1>
                            <span>
                                {singleAsset.name}
                            </span>
                            <span> </span>
                            <span>
                                {singleAsset?.symbol?.toUpperCase()}
                            </span>
                        </h1>

                    </div>
                </div>
                <div>Watchlist</div>
            </div>
            <div id='crypto-details'>
                <div id='details-header'>
                    <h1>
                        ${singleAsset.current_price}  
                    </h1>
                    <span> </span>
                    <h2>{allAssets[`${crypto}`]?.usd_24h_change.toFixed(2)}%</h2>
                </div>
            </div>
            <div id='market-stats'>
                <div>
                    <h3>Market stats</h3>
                </div>
                <div></div>
            </div>
        </div>
    )


}

export default TradeOne;