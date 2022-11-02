import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';
import './tradeall.css'

const TradeAll = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const allAssets = useSelector((state) => state.assets.allAssets)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserCards())
        dispatch(getAllAssets())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            <div id='trade-all-container-row-buy-sell-BG-ebebeb'>
                <div id='trade-all-content-main-column'>
                    <div id='trade-all-header'>
                        <h1>All Cryptos</h1>
                    </div>
                    <div id='all-assets-table-container'>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change (24h)</th>
                                <th>Market cap</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Apecoin</td>
                                <td>{allAssets['apecoin']['usd']}</td>
                                <td>{allAssets['apecoin']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['apecoin']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>

                        </table>

                        {/* temp rendering of all data */}
                        {/* <div id='temp'>
                            <div id='name-column' >
                                {Object.keys(allAssets).map(crypto => (
                                    <div className='crypto-data-column'>{crypto}</div>
                                ))}
                            </div>
                            <div >
                                {Object.values(allAssets).map(crypto => (
                                    <div className='crypto-data-column' id='mapped-crypto-row'>
                                        {crypto.usd}
                                    </div>
                                ))}
                            </div>
                            <div >
                                {Object.values(allAssets).map(crypto => (
                                    <div className='crypto-data-column'>
                                        {crypto.usd_24h_change.toFixed(2)}
                                    </div>
                                ))}
                            </div>
                            <div >
                                {Object.values(allAssets).map(crypto => (
                                    <div className='crypto-data-column'>
                                        ${crypto.usd_market_cap.toFixed(2)}
                                    </div>
                                ))}
                            </div>
                            <div className='crypto-data-column'>
                                {Object.values(allAssets).map(crypto => (
                                    <div>
                                       <button>Buy</button>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>

                </div>
                <div id='buy-sell-form'>Buy Sell Form</div>
            </div>
        </>
    )
}

export default TradeAll;