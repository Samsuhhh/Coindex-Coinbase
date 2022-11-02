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
                            <tr>
                                <td>Avalance</td>
                                <td>{allAssets['avalanche']['usd']}</td>
                                <td>{allAssets['avalanche']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['avalanche']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Binance Coin</td>
                                <td>{allAssets['binance_coin']['usd']}</td>
                                <td>{allAssets['binance_coin']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['binance_coin']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Bitcoin</td>
                                <td>{allAssets['bitcoin']['usd']}</td>
                                <td>{allAssets['bitcoin']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['bitcoin']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Binance USD</td>
                                <td>{allAssets['binance_usd']['usd']}</td>
                                <td>{allAssets['binance_usd']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['binance_usd']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Cardano</td>
                                <td>{allAssets['cardano']['usd']}</td>
                                <td>{allAssets['cardano']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['cardano']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Dogecoin</td>
                                <td>{allAssets['dogecoin']['usd']}</td>
                                <td>{allAssets['dogecoin']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['dogecoin']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Ethereum</td>
                                <td>{allAssets['ethereum']['usd']}</td>
                                <td>{allAssets['ethereum']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['ethereum']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Eth2</td>
                                <td>{allAssets['eth2']['usd']}</td>
                                <td>{allAssets['eth2']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['eth2']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Litecoin</td>
                                <td>{allAssets['litecoin']['usd']}</td>
                                <td>{allAssets['litecoin']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['litecoin']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Polygon <div>POLY</div></td>
                                <td>{allAssets['polygon']['usd']}</td>
                                <td>{allAssets['polygon']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polygon']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Near Protocol <div>NEAR</div></td>
                                <td>{allAssets['near']['usd']}</td>
                                <td>{allAssets['near']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['near']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Polkadot <div>DOT</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Ripple <div>XRP</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Shiba-Inu <div>Shib</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Solana <div>SOL</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Stellar Lumens <div>XLM</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Tether <div>USDT</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Tron <div>TRX</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>Uniswap <div>UNI</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                                <td> <button>Buy</button></td>
                            </tr>
                            <tr>
                                <td>US Dollar Coin <div>USDC</div></td>
                                <td>{allAssets['polkadot']['usd']}</td>
                                <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}</td>
                                <td>{allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
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