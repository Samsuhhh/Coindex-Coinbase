import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadAllWallets } from '../../store/session';
import BuySellModal from '../BuySell';
import TransactionHistory from '../Wallets/WalletList';
import './tradeall.css'


const TradeAll = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const allAssets = useSelector((state) => state.assets.allAssets)
    const dispatch = useDispatch();
    const history = useHistory();

    const [value, setValue] = useState('')

    useEffect(() => {
        dispatch(loadAllWallets())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllAssets())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    function redirectHandler(value) {
        console.log('hello from the other side')
        history.push(`/trade/${value}`)
    }

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
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change (24h)</th>
                            <th>Market cap</th>
                            <th></th>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('apecoin')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Apecoin</div>
                                        <div>APE</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['apecoin']['usd']}</td>
                            <td>{allAssets['apecoin']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['apecoin']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('avalanche-2')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Avalanche</div>
                                        <div>AVAX</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['avalanche']['usd']}</td>
                            <td>{allAssets['avalanche']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['avalanche']['usd_market_cap'].toFixed(2)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('binancecoin')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Binance Coin</div>
                                        <div>BNB Coin</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['binance_coin']['usd']}</td>
                            <td>{allAssets['binance_coin']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['binance_coin']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('bitcoin')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Bitcoin</div>
                                        <div>BTC</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['bitcoin']['usd']}</td>
                            <td>{allAssets['bitcoin']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['bitcoin']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('binance-usd')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Binance USD</div>
                                        <div>BUSD</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['binance_usd']['usd']}</td>
                            <td>{allAssets['binance_usd']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['binance_usd']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('cardano')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Cardano</div>
                                        <div>ADA</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['cardano']['usd']}</td>
                            <td>{allAssets['cardano']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['cardano']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('dogecoin')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Dogecoin</div>
                                        <div>DOGE</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['dogecoin']['usd']}</td>
                            <td>{allAssets['dogecoin']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['dogecoin']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('ethereum')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Ethereum</div>
                                        <div>ETH</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['ethereum']['usd']}</td>
                            <td>{allAssets['ethereum']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['ethereum']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('eth2-staking-by-poolx')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Ethereum 2.0</div>
                                        <div>ETH2</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['eth2']['usd']}</td>
                            <td>{allAssets['eth2']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['eth2']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('litecoin')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Litecoin</div>
                                        <div>LTC</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['litecoin']['usd']}</td>
                            <td>{allAssets['litecoin']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['litecoin']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('matic-network')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Polygon</div>
                                        <div>POLY</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['polygon']['usd']}</td>
                            <td>{allAssets['polygon']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['polygon']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('near')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>NEAR Protocol</div>
                                        <div>NEAR</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['near']['usd']}</td>
                            <td>{allAssets['near']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['near']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('polkadot')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Polkadot</div>
                                        <div>DOT</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['polkadot']['usd']}</td>
                            <td>{allAssets['polkadot']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['polkadot']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('ripple')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Ripple</div>
                                        <div>XRP</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['ripple']['usd']}</td>
                            <td>{allAssets['ripple']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['ripple']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('solana')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Solana</div>
                                        <div>SOL</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['solana']['usd']}</td>
                            <td>{allAssets['solana']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['solana']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('stellar')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>
                                            Stellar Lumens
                                        </div>
                                        <div>XLM</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['stellar']['usd']}</td>
                            <td>{allAssets['stellar']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['stellar']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('tether')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Tether</div>
                                        <div>USDT</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['tether']['usd']}</td>
                            <td>{allAssets['tether']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['tether']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('tron')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Tron</div>
                                        <div>TRX</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['tron']['usd']}</td>
                            <td>{allAssets['tron']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['tron']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('uniswap')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>Uniswap</div>
                                        <div>UNI</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['uniswap']['usd']}</td>
                            <td>{allAssets['uniswap']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['uniswap']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
                        </tr>

                        <tr className='row-styling' onClick={() => redirectHandler('usd-coin')}>

                            <td className='crypto-name-td'>
                                <div>
                                    {/* <div>img</div> */}
                                    <div>
                                        <div>US Dollar Coin</div>
                                        <div>USDC</div>
                                    </div>
                                </div>
                            </td>
                            <td>${allAssets['usdc']['usd']}</td>
                            <td>{allAssets['usdc']['usd_24h_change'].toFixed(2)}%</td>
                            <td>${allAssets['usdc']['usd_market_cap'].toFixed(1)}</td>
                            <td>
                                <div>
                                    <BuySellModal />
                                </div>
                            </td>
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
                                       
                                              <div>
            <BuySellModal />
          </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                </div>
            </div>
            <div id='buy-sell-form'>
                {/* <BuySellPage/> */}
                <TransactionHistory />
            </div>
        </div>

    )
}

export default TradeAll;