import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';
import WalletList from '../Wallets/WalletList';
import './tradeone.css'
import { timeConverter } from '../utils/utilityFunctions';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const TradeOne = () => {

    // const sessionUser = useSelector((state) => state.session.user);
    const singleAsset = useSelector(state => state.assets.singleAsset)
    const allAssets = useSelector(state => state.assets.allAssets)
    const [isLoaded, setIsLoaded] = useState(false)
    // const [overview, setOverview] = useState(true)
    // const [walletview, setWalletview] = useState(false)
    const [showMore, setShowMore] = useState(false)


    const dispatch = useDispatch();
    // let pageView;
    const params = useParams();
    const { crypto } = params;
    const [days, setDays] = useState(7)

    // let days=7;

    // history graph code
    // const { res } = useAxios(`/coins/bitcoin/market_chart?vs_currency=usd&days=7`)
    // const {res} = dispatch();
    // console.log(res, 'HISTORY GRAPH DATAA')


    const chartData = singleAsset?.graph?.prices.map(val => ({
        x: val[0],
        y: val[1].toFixed(2)
    }));

    // console.log(chartData, 'CHART DATAAAA')
    const capitalizeFirstLetter = (name) => {
        let split = name.split('');
        let res = split[0]?.toUpperCase();
        split.splice(0, 1, `${res}`)
        return split.join('')
    }


    const options = {
        responsive: true,
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        title: {
            display: false
        },
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                grid: { display: false, drawBorder: false },
                ticks: { display: false },
                // gridLines: { display: false }
            }
            ,
            x: {
                grid: { display: false, drawBorder: false },
                ticks: { autoSkip: true, maxTicksLimit: 20 },
            },
        }
    }
    const data = {
        labels: days === 1 ? chartData?.map(value => new Date(value.x).toLocaleTimeString("en-US")) : chartData?.map(value => new Date(value.x).toLocaleDateString("en-US")),
        // labels: days === 1 ? chartData?.map(date => timeConverter(date.x, 'time')) : chartData?.map(date => timeConverter(date.x, 'else')),
        datasets: [
            {
                fill: false,
                label: capitalizeFirstLetter(crypto),
                data: chartData?.map(value => (value.y)),
                borderColor: '#5D9FD6',
                pointRadius: 0.2,
                pointHoverRadius: 1
            }
        ]
    }

    useEffect(() => {
        dispatch(getCurrentUserCards())
        dispatch(getOneAsset(crypto, days))
            .then(() => setIsLoaded(true))
    }, [dispatch, crypto, days])

    const shortenDigits = (value) => {
        let zeroValue = value.toFixed(0)
        let twoValue = value.toFixed(2)

        if (zeroValue.length >= 7 && zeroValue.length <= 9) {
            if (zeroValue.length === 7) return twoValue.slice(0, 1) + '.' + twoValue.slice(1, 2) + 'M';
            else if (zeroValue.length === 8) return twoValue.slice(0, 2) + '.' + twoValue.slice(2, 3) + 'M';
            else if (zeroValue.length === 9) return twoValue.slice(0, 3) + '.' + twoValue.slice(3, 4) + 'M';
        } else if (zeroValue.length >= 10) {
            if (zeroValue.length === 10) return twoValue.slice(0, 1) + '.' + twoValue.slice(1, 2) + 'B';
            else if (zeroValue.length === 11) return twoValue.slice(0, 2) + '.' + twoValue.slice(2, 3) + 'B';
            else if (zeroValue.length === 12) return twoValue.slice(0, 3) + '.' + twoValue.slice(3, 4) + 'B';
        } else return value

    }

    // if (!res) {
    //     return <div>Loading...</div>
    // }


    // if (overview) {
    //     pageView = {

    //     }
    // }

    return isLoaded && (
        <div id='single-asset-container'>
            <div id='single-asset-header'>
                <div id='header-left-row'>
                    <div id='crypto-img'>
                        <img alt='crypto-img' src={singleAsset.smallImg} />
                    </div>
                    <div id='name-symbol-container'>
                        <h1>
                            <span id='name-span'>
                                {singleAsset.name}
                            </span>
                            <span id='symbol-span'>
                                {singleAsset?.symbol?.toUpperCase()}
                            </span>
                        </h1>
                    </div>
                </div>
                {/* <div>Watchlist</div> */}
            </div>
            <div id='pageview-buttons-container-row'>
                <div className='pageView'>Overview</div>
                <div className='pageView'>Wallet</div>
                <div className='pageView'>Vault</div>
            </div>
            <div id='details-content-include-right'>
                <div id='details-leftCenter-container'>
                    <div id='crypto-details-container'>
                        <div id='details-header'>
                            <div id='header-left'>
                                <div id='price-div'>
                                    <div id='dolla-dolla'>$</div><span>{singleAsset.current_price.toFixed(2).split('.').shift()}</span>
                                    <span id='price-cents'>.{(singleAsset.current_price).toFixed(2).slice(-2)}</span>
                                </div>
                                <span> </span>
                                <h2 id='tradeOne-24h' className={allAssets[crypto]['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                                    {allAssets[crypto]['usd_24h_change'].toFixed(2).slice(0, 1) === '-' ?
                                        allAssets[crypto]['usd_24h_change'].toFixed(2) :
                                        `+${allAssets[crypto]['usd_24h_change'].toFixed(2)}`}%
                                </h2>
                            </div>
                            <div id='header-right'>
                                {/* <div className='graph-set-days' onClick={() => setDays(.041)}>1H</div> */}
                                <div className='graph-set-days' onClick={() => setDays(1)}>1D</div>
                                <div className='graph-set-days' onClick={() => setDays(7)}>1W</div>
                                <div className='graph-set-days' onClick={() => setDays(30)}>1M</div>
                                <div className='graph-set-days' onClick={() => setDays(365)}>1Y</div>
                            </div>
                        </div>
                        <div id='history-graph'>
                            <Line options={options} data={data} />
                        </div>
                    </div>
                    <div id='market-stats-container'>
                        <div id='market-stats-header'>
                            Market stats
                        </div>
                        <div id='market-details-row'>
                            <div id='mktd-row1'>
                                <div className='mktd'>
                                    <div id='mktd-header'>Market cap</div>
                                    <div>
                                        ${shortenDigits(singleAsset.market_cap)}
                                    </div>
                                </div>
                                <div className='mktd'>
                                    <div id='mktd-header'>Total volume</div>
                                    <div>
                                        ${shortenDigits(singleAsset.total_volume)}
                                    </div>
                                </div>
                                <div className='mktd'>
                                    <div id='mktd-header'>Circulating supply</div>
                                    <div>
                                        {shortenDigits(singleAsset.supply)} {singleAsset.symbol.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                            <div id='mktd-row2'>
                                <div id='atl-ath-split' className='mktd'>
                                    <div id='mktd-header'>High</div>
                                    <div>24H: ${singleAsset.high_24hr}</div>
                                    <div> ATH: ${singleAsset.ath}</div>
                                    {/* <div id='mktd-header'>ATL:</div><span> ${singleAsset.atl.toFixed(2)}</span> */}
                                </div>
                                <div id='atl-ath-split' className='mktd'>
                                    <div id='mktd-header'>Low</div>
                                    <div>24H: ${singleAsset.low_24hr}</div>
                                    <div> ATL: ${singleAsset.atl.toFixed(2)}</div>
                                    {/* <div id='mktd-header'>ATL:</div><span> ${singleAsset.atl.toFixed(2)}</span> */}
                                </div>
                                <div className='mktd'>
                                    <div id='mktd-header'>Popularity</div>
                                    <div>#{singleAsset.rank}</div>
                                </div>
                                {/* <div className='mktd'></div> */}
                            </div>
                        </div>
                    </div>
                    <div id='single-description-container'>
                        <div id='description-header'>
                            Overview
                        </div>

                        <p dangerouslySetInnerHTML={showMore ? { __html: singleAsset.description.en } : { __html: `${singleAsset.description.en.substring(0, 300)}...` }} id='description-content'>
                            {/* {showMore ? singleAsset.description['en'] : `${singleAsset.description['en'].substring(0, 300)}...`} */}
                        </p>

                    </div>
                    <div id='more-button' onClick={() => setShowMore(!showMore)}>
                        {showMore ? "View less" : 'View more'}
                    </div>
                </div>
                <div id='wallet-list-tradeOne'>
                    {/* <BuySellPage/> */}
                    <WalletList />
                </div>
            </div>

        </div>
    )


}

export default TradeOne;