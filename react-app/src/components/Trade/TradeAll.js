import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { getAllAssets } from '../../store/asset';
import { loadAllWallets, loadWatchlist } from '../../store/session';
// import BuySellModal from '../BuySell';
import TransactionHistory from '../Wallets/WalletList';
import TradeCard from './TradeCard';
import './tradeall.css'


// import apecoin from '../../aIMGS/cryptoImgs/apecoin-logo.png';
// import avalanche from '../../aIMGS/cryptoImgs/avalanche-logo.png';
// import bitcoin from '../../aIMGS/cryptoImgs/bitcoin-logo.png';
// import bnb from '../../aIMGS/cryptoImgs/bnb-logo.png';
// import busd from '../../aIMGS/cryptoImgs/busd-logo.png';
// import cardano from '../../aIMGS/cryptoImgs/cardano-logo.png';
// import dogecoin from '../../aIMGS/cryptoImgs/dogecoin-logo.png';
// import eth2 from '../../aIMGS/cryptoImgs/eth2-logo.png';
// import ethereum from '../../aIMGS/cryptoImgs/ethereum-logo.png';
// import litecoin from '../../aIMGS/cryptoImgs/litecoin-logo.png';
// import near from '../../aIMGS/cryptoImgs/near-logo.png';
// import polkadot from '../../aIMGS/cryptoImgs/polkadot-new-dot-logo.svg';
// import polygon from '../../aIMGS/cryptoImgs/polygon-logo.png';
// import ripple from '../../aIMGS/cryptoImgs/ripple-logo.png';
// import solana from '../../aIMGS/cryptoImgs/solana-logo.png';
// import stellar from '../../aIMGS/cryptoImgs/stellar-logo.png';
// import tether from '../../aIMGS/cryptoImgs/tether-logo.png';
// import tron from '../../aIMGS/cryptoImgs/tron-logo.png';
// import uniswap from '../../aIMGS/cryptoImgs/uniswap-logo.png';
// import usdc from '../../aIMGS/cryptoImgs/usdc-logo.png';

// import maker from '../../aIMGS/cryptoImgs/maker-logo.png';
// import axie from '../../aIMGS/cryptoImgs/axie-logo.png';
// import yearn from '../../aIMGS/cryptoImgs/yearn-finance-logo.png';
// import dfi from '../../aIMGS/cryptoImgs/dfi-money-logo.png';
// import compound from '../../aIMGS/cryptoImgs/compound-logo.png';
// import ens from '../../aIMGS/cryptoImgs/ens-logo.png';
// import chainlink from '../../aIMGS/cryptoImgs/chainlink-logo.png';
// import balancer from '../../aIMGS/cryptoImgs/balancer-logo.png';
// import celo from '../../aIMGS/cryptoImgs/celo-logo.png';
// import optimism from '../../aIMGS/cryptoImgs/optimism-logo.svg';


const TradeAll = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const allAssets = useSelector((state) => state.assets.allAssets);
    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch(loadAllWallets())
        dispatch(loadWatchlist())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllAssets())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    

    // const redirectHandler = (value) => {
    //     // e.preventDefault();
    //     // console.log("E!!!", e)
    //     // e.stopPropagation();

    //     console.log('hello from the other side', value)

    //     // e.nativeEvent.stopImmediatePropagation();
    //     history.push(`/trade/${value}`)
    //     // return <Redirect to={`/trade/${value}`} />

    // }


    if (!isLoaded) {
        return null
    }

    return isLoaded && sessionUser && (

        <div id='trade-all-container-row-buy-sell-BG-ebebeb'>
            <div id='trade-all-content-main-column'>
                <div id='trade-all-header'>
                    All Cryptos
                    <div id='double-click'>Double-click any row to navigate to its details page.</div>
                </div>
                <div id='all-assets-table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change(24h)</th>
                                <th>Market cap</th>
                                <th></th>
                                <th>Watch</th>
                            </tr>
                        </thead>
                        {Object.keys(allAssets).map((key) => (
                            <TradeCard name={key} allAssets={allAssets}/>
                        ))}

                    </table>
                    {/* <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change(24h)</th>
                                <th>Market cap</th>
                                <th></th>
                                <th>Watch</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='row-styling' key={'apecoin'} onDoubleClick={(e) => redirectHandler('apecoin')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={apecoin} alt='ape-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Apecoin</div>
                                            <div className='symbol-light'>APE</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['apecoin']['usd']}</td>
                                <td className={allAssets['apecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['apecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['apecoin']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['apecoin']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['apecoin']['usd_market_cap'].toFixed(0).length === 9 ?
                                    `${allAssets['apecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['apecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div id='buy-sell-button'>
                                        <BuySellModal />
                                    </div>
                                </td>
                                <td>
                                    <div className='watch-td' >
                                        <img src={star} alt='star' className='watchlist-star' />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'avalanche-2'} onDoubleClick={(e) => redirectHandler('avalanche-2')} >
                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={avalanche} alt='avalanche-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Avalanche</div>
                                            <div className='symbol-light'>AVAX</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['avalanche-2']['usd']}</td>
                                <td className={allAssets['avalanche-2']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['avalanche-2']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['avalanche-2']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['avalanche-2']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['avalanche-2']['usd_market_cap'].toFixed(0).length === 9 ?
                                    `${allAssets['avalanche-2']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['avalanche-2']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'axie-infinity'} onDoubleClick={(e) => redirectHandler('axie-infinity')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={axie} alt='axie-infinity-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Axie-infinity</div>
                                            <div className='symbol-light'>AXS</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['axie-infinity']['usd']}</td>
                                <td className={allAssets['axie-infinity']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['axie-infinity']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['axie-infinity']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['axie-infinity']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['axie-infinity']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['axie-infinity']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['axie-infinity']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'balancer'} onDoubleClick={(e) => redirectHandler('balancer')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={balancer} alt='balancer-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Balancer</div>
                                            <div className='symbol-light'>BAL</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['balancer']['usd']}</td>
                                <td className={allAssets['balancer']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['balancer']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['balancer']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['balancer']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['balancer']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['balancer']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['balancer']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'binancecoin'} onDoubleClick={(e) => redirectHandler('binancecoin')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={bnb} alt='bnb-coin-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Binance Coin</div>
                                            <div className='symbol-light'>BNB Coin</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['binancecoin']['usd']}</td>
                                <td className={allAssets['binancecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['binancecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['binancecoin']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['binancecoin']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['binancecoin']['usd_market_cap'].toFixed(0).length === 9 ?
                                    `${allAssets['binancecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['binancecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'bitcoin'} onDoubleClick={(e) => redirectHandler('bitcoin')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={bitcoin} alt='bitcoin-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Bitcoin</div>
                                            <div className='symbol-light'>BTC</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['bitcoin']['usd']}</td>
                                <td className={allAssets['bitcoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['bitcoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['bitcoin']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['bitcoin']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['bitcoin']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['bitcoin']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['bitcoin']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'binance-usd'} onDoubleClick={(e) => redirectHandler('binance-usd')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={busd} alt='busd-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Binance USD</div>
                                            <div className='symbol-light'>BUSD</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['binance-usd']['usd']}</td>
                                <td className={allAssets['binance-usd']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['binance-usd']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['binance-usd']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['binance-usd']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['binance-usd']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['binance-usd']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['binance-usd']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'cardano'} onDoubleClick={(e) => redirectHandler('cardano')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={cardano} alt='cardano-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Cardano</div>
                                            <div className='symbol-light'>ADA</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['cardano']['usd']}</td>
                                <td className={allAssets['cardano']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['cardano']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['cardano']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['cardano']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['cardano']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['cardano']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['cardano']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'celo'} onDoubleClick={(e) => redirectHandler('celo')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={celo} alt='celo-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Celo</div>
                                            <div className='symbol-light'>CELO</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['celo']['usd']}</td>
                                <td className={allAssets['celo']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['celo']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['celo']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['celo']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['celo']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['celo']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['celo']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'chainlink'} onDoubleClick={(e) => redirectHandler('chainlink')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={chainlink} alt='chainlink-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Chainlink</div>
                                            <div className='symbol-light'>LINK</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['chainlink']['usd']}</td>
                                <td className={allAssets['chainlink']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['chainlink']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['chainlink']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['chainlink']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['chainlink']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['chainlink']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['chainlink']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>


                        <tbody>
                            <tr className='row-styling' key={'dogecoin'} onDoubleClick={(e) => redirectHandler('dogecoin')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={dogecoin} alt='doge-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Dogecoin</div>
                                            <div className='symbol-light'>DOGE</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['dogecoin']['usd']}</td>
                                <td className={allAssets['dogecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['dogecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['dogecoin']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['dogecoin']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['dogecoin']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['dogecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['dogecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'ethereum'} onDoubleClick={(e) => redirectHandler('ethereum')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={ethereum} alt='eth-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Ethereum</div>
                                            <div className='symbol-light'>ETH</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['ethereum']['usd']}</td>
                                <td className={allAssets['ethereum']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['ethereum']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['ethereum']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['ethereum']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['ethereum']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['ethereum']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['ethereum']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'ethereum-name-service'} onDoubleClick={(e) => redirectHandler('ethereum-name-service')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={ens} alt='ethereum-name-service-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Ethereum-name-service</div>
                                            <div className='symbol-light'>ENS</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['ethereum-name-service']['usd']}</td>
                                <td className={allAssets['ethereum-name-service']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['ethereum-name-service']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['ethereum-name-service']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['ethereum-name-service']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['ethereum-name-service']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['ethereum-name-service']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['ethereum-name-service']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'eth2-staking-by-poolx'} onDoubleClick={(e) => redirectHandler('eth2-staking-by-poolx')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={eth2} alt='eth2-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Ethereum 2.0</div>
                                            <div className='symbol-light'>ETH2</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['eth2-staking-by-poolx']['usd']}</td>
                                <td className={allAssets['eth2-staking-by-poolx']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['eth2-staking-by-poolx']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['eth2-staking-by-poolx']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['eth2-staking-by-poolx']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['eth2-staking-by-poolx']['usd_market_cap'].toFixed(2)}</td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'litecoin'} onDoubleClick={(e) => redirectHandler('litecoin')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={litecoin} alt='litecoin-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Litecoin</div>
                                            <div className='symbol-light'>LTC</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['litecoin']['usd']}</td>
                                <td className={allAssets['litecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['litecoin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['litecoin']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['litecoin']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['litecoin']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['litecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['litecoin']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'maker'} onDoubleClick={(e) => redirectHandler('maker')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={maker} alt='maker-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Maker</div>
                                            <div className='symbol-light'>MKR</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['maker']['usd']}</td>
                                <td className={allAssets['maker']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['maker']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['maker']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['maker']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['maker']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['maker']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['maker']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'matic-network'} onDoubleClick={(e) => redirectHandler('matic-network')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={polygon} alt='polygon-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Polygon</div>
                                            <div className='symbol-light'>POLY</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['matic-network']['usd']}</td>
                                <td className={allAssets['matic-network']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['matic-network']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['matic-network']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['matic-network']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['matic-network']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['matic-network']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['matic-network']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'near'} onDoubleClick={(e) => redirectHandler('near')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={near} alt='near-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>NEAR Protocol</div>
                                            <div className='symbol-light'>NEAR</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['near']['usd']}</td>
                                <td className={allAssets['near']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['near']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['near']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['near']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['near']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['near']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['near']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'optimism'} onDoubleClick={(e) => redirectHandler('optimism')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={optimism} alt='optimism-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Optimism</div>
                                            <div className='symbol-light'>OP</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['optimism']['usd']}</td>
                                <td className={allAssets['optimism']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['optimism']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['optimism']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['optimism']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['optimism']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['optimism']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['optimism']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'polkadot'} onDoubleClick={(e) => redirectHandler('polkadot')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={polkadot} alt='polkadot-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Polkadot</div>
                                            <div className='symbol-light'>DOT</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['polkadot']['usd']}</td>
                                <td className={allAssets['polkadot']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['polkadot']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['polkadot']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['polkadot']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['polkadot']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['polkadot']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['polkadot']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'ripple'} onDoubleClick={(e) => redirectHandler('ripple')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={ripple} alt='xrp-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Ripple</div>
                                            <div className='symbol-light'>XRP</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['ripple']['usd']}</td>
                                <td className={allAssets['ripple']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['ripple']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['ripple']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['ripple']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['ripple']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['ripple']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['ripple']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'solana'} onDoubleClick={(e) => redirectHandler('solana')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={solana} alt='solana-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Solana</div>
                                            <div className='symbol-light'>SOL</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['solana']['usd']}</td>
                                <td className={allAssets['solana']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['solana']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['solana']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['solana']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['solana']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['solana']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['solana']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'stellar'} onDoubleClick={(e) => redirectHandler('stellar')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={stellar} alt='stellar-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Stellar Lumens</div>
                                            <div className='symbol-light'>XLM</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['stellar']['usd']}</td>
                                <td className={allAssets['stellar']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['stellar']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['stellar']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['stellar']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['stellar']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['stellar']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['stellar']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'tether'} onDoubleClick={(e) => redirectHandler('tether')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={tether} alt='tether-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Tether</div>
                                            <div className='symbol-light'>USDT</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['tether']['usd']}</td>
                                <td className={allAssets['tether']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['tether']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['tether']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['tether']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['tether']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['tether']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['tether']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'tron'} onDoubleClick={(e) => redirectHandler('tron')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={tron} alt='tron-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Tron</div>
                                            <div className='symbol-light'>TRX</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['tron']['usd']}</td>
                                <td className={allAssets['tron']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['tron']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['tron']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['tron']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['tron']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['tron']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['tron']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'uniswap'} onDoubleClick={(e) => redirectHandler('uniswap')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={uniswap} alt='uniswap-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>Uniswap</div>
                                            <div className='symbol-light'>UNI</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['uniswap']['usd']}</td>
                                <td className={allAssets['uniswap']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['uniswap']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['uniswap']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['uniswap']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['uniswap']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['uniswap']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['uniswap']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>


                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'usd-coin'} onDoubleClick={(e) => redirectHandler('usd-coin')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={usdc} alt='usdc-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>US Dollar Coin</div>
                                            <div className='symbol-light'>USDC</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['usd-coin']['usd']}</td>
                                <td className={allAssets['usd-coin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['usd-coin']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['usd-coin']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['usd-coin']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['usd-coin']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['usd-coin']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['usd-coin']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'yearn-finance'} onDoubleClick={(e) => redirectHandler('yearn-finance')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={yearn} alt='yearn-finance-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>yearn.finance</div>
                                            <div className='symbol-light'>YFI</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['yearn-finance']['usd']}</td>
                                <td className={allAssets['yearn-finance']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['yearn-finance']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['yearn-finance']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['yearn-finance']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['yearn-finance']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['yearn-finance']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['yearn-finance']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='row-styling' key={'yfii-finance'} onDoubleClick={(e) => redirectHandler('yfii-finance')} >

                                <td className='crypto-name-td'>
                                    <div className='img-name-div-flex'>
                                        <div className='logo-div'>
                                            <img src={dfi} alt='yfii-finance-logo' className='logo-img' />
                                        </div>
                                        <div>
                                            <div className='crypto-bold'>DFI.money</div>
                                            <div className='symbol-light'>YFII</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${allAssets['yfii-finance']['usd']}</td>
                                <td className={allAssets['yfii-finance']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets['yfii-finance']['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets['yfii-finance']['usd_24h_change'].toFixed(2) :
                                        `+${allAssets['yfii-finance']['usd_24h_change'].toFixed(2)}`}%
                                </td>
                                <td>${allAssets['yfii-finance']['usd_market_cap'].toFixed(0).length < 8 ?
                                    `${allAssets['yfii-finance']['usd_market_cap'].toFixed(2).slice(0, 3)}M` :
                                    `${allAssets['yfii-finance']['usd_market_cap'].toFixed(2).slice(0, 3)}B`}
                                </td>
                                <td>
                                    <div>
                                        <BuySellModal />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}

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
                                    {crypto.usd_24h_change?.toFixed(2)}
                                </div>
                            ))}
                        </div>
                        <div >
                            {Object.values(allAssets).map(crypto => (
                                <div className='crypto-data-column'>
                                    ${crypto.usd_market_cap?.toFixed(2)}
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
                <div>
                    <table>

                    </table>
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