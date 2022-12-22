import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadAllWallets, loadWatchlist } from '../../store/session';
import TradeCard from '../Trade/TradeCard';
import './dashboard.css';
import {
    Chart as ChartJS,
    // CategoryScale,
    // LinearScale,
    // PointElement,
    // LineElement,
    // Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import { ChartData, ChartOptions } from 'chart.js';
import { useHistory } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(false) // for news api if we implement that data
    // const sessionUser = useSelector((state) => state.session.user)
    // const singleAsset = useSelector((state) => state.assets.singleAsset)
    const currWallet = useSelector(state => state.session.wallets)
    const watchlist = useSelector(state => state.session.watchlist)
    const history = useHistory();
    // const currentCards = useSelector(state => state.session.card);
    const allAssets = useSelector(state => state.assets.allAssets)
    const dispatch = useDispatch();
    // const assets = useSelector((state) => state.assets.allAssets) 
    const [data, setData] = useState({})
    const [cryptoNews, setCryptoNews] = useState([]);
    // const finnhub = require('finnhub');

    // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    // api_key.apiKey = "ce2m6daad3i1c7jest60ce2m6daad3i1c7jest6g"
    // const finnhubClient = new finnhub.DefaultApi()

    // let news = finnhubClient.marketNews("crypto", { 'limit': 10 }, (error, data, response) => {
    //     console.log('data', data)
    //     setCryptoNews(data)
    //     console.log('res,', response)
    // });


    async function getNews() {
        const baseURL = "https://finnhub.io/api/v1/news?category=crypto&token=ce2m6daad3i1c7jest60ce2m6daad3i1c7jest6g"
        const newsResponse = await fetch(baseURL);
        const res = await newsResponse.json();
        // console.log(newsResponse.json())
        return res;
    }

    useEffect(() => {
        const news = async () => {
            try {
                setIsLoaded(false)
                const todayNews = await getNews();
                setCryptoNews(todayNews.slice(0, 10));
                // console.log(cryptoNews, 'CRYPTOOOO NEWS')
                setIsLoaded(true)
            } catch {
                setCryptoNews([]);
            }
        };
        news();
    }, [])

    useEffect(() => {
        (async () => {
            await dispatch(getCurrentUserCards())
            await dispatch(loadAllWallets())
            await dispatch(loadWatchlist())
            setIsLoaded(true)
        })();


        // dispatch(getOneAsset()) // just for testing, move to singleAsset page
    }, [dispatch])

    const cashValueCalculator = (amount, currPrice) => {
        let val = Number(amount) * Number(currPrice)
        return val
    };

    // const amountCalculator = (cashValue, currPrice) => {
    //     let amt = Number(cashValue) / Number(currPrice)
    //     return amt
    // };

    const getPieData = () => {
        let totals = []
        let labels = Object.keys(currWallet)
        for (let i = 0; i < labels.length; i++) {
            let sum = allAssets[labels[i]].usd * Number(currWallet[labels[i]].assetAmount);
            totals.push(sum)
        }
        return totals
    }


    useEffect(() => {
        const pieData = getPieData()
        if (Object.keys(currWallet) > 1) return;
        setData({
            labels: Object.keys(currWallet),
            datasets: [{
                label: 'My First Dataset',
                data: pieData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 205, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)'
                ],
                hoverOffset: 4
            }]
        });
    }, [currWallet])

    // const assetTotal = getBalance();



    const getPortfolioBalance = () => {
        let total = 0;
        let cash;

        // get current user wallet balances and calculate cash value forEach
        Object.keys(currWallet).forEach(key => {
            let amt = Number(currWallet[key].assetAmount)
            let price = Number(allAssets[key].usd)
            cash = cashValueCalculator(amt, price)
            total += cash
        });

        let split = total.toFixed(2).split('.');
        let bulk = split[0];
        let decimal = split[1];
        let insert = bulk.split('')
        if (bulk.length === 4) {
            insert.splice(1, 0, ',')
            return insert.join('') + '.' + decimal

        } else if (bulk.length === 5) {
            insert.splice(2, 0, ',')
            return insert.join('') + '.' + decimal

        } else if (bulk.length === 6) {
            insert.splice(3, 0, ',')
            return insert.join('') + '.' + decimal

        } else if (bulk.length === 7) {
            insert.splice(1, 0, ',')
            insert.splice(5, 0, ',')
            return insert.join('') + '.' + decimal

        } else if (bulk.length === 8) {
            insert.splice(2, 0, ',')
            insert.splice(6, 0, ',')
            return insert.join('') + '.' + decimal

        } else if (bulk.length === 9) {
            insert.splice(3, 0, ',')
            insert.splice(7, 0, ',')
            return insert.join('') + '.' + decimal
        } else if (bulk.length === 10) {
            insert.splice(1, 0, ',')
            insert.splice(5, 0, ',')
            insert.splice(9, 0, ',')
            return insert.join('') + '.' + decimal
        } else {
            return "0 :("
        }

    }
    const portfolio = getPortfolioBalance();

    // Date UNIX 
    // let today = Date.now();
    // const displayToday = Date(today).toLocaleDateString('en-US')

    // useEffect(() => {
    //     // dispatch(loadAllWallets())

    // }, [dispatch])

    const getTopMovers = () => {
        //    let volumes = allAssets.sort((a,b) => a - b)
        //    return volumes.slice(0, 5)


    }


    if (!isLoaded) {
        return <div>LOADING... </div>
    }

    return isLoaded && (
        <div id='main-wrapper-include-rightSidebar'>
            <div id='center-main-content-column-stack'>
                <div id='your-balance-summary-div-flex-row'>
                    <div id='your-balance-column'>
                        <div id='balance-div'>
                            My Balance: $0
                        </div>
                        <div id='balance-cash-value'>Portfolio value: ${portfolio ? portfolio : "0.00"} </div>
                        <div id='balance-caption'>{portfolio ? 'Nice work!' : "Let's go buy some crypto."}</div>
                    </div>
                    {/* <div id='graph-but-we-not-doing-that-lol'>hey I'm a graph</div> */}
                </div>
                {Object.keys(watchlist).length ? (
                    <div id='watchlist-container'>
                        <h3>Watchlist</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Change(24h)</th>
                                    <th>Mkt. cap</th>
                                    <th></th>
                                    <th>Watch</th>
                                </tr>
                            </thead>
                            {Object.keys(watchlist).map((key) => (
                                <TradeCard key={key} name={key} allAssets={watchlist} />
                            ))}
                        </table>

                    </div>
                ) :
                    <div id='watchlist-container'>
                        <h3>Watchlist</h3>
                        <div>
                            <div>
                                <span id='no-watchlist'>
                                    <h3>START BUILDING YOUR WATCHLIST</h3>
                                    <span id='no-watchlist-instructions'>Wherever you see the star icon, you can use it to add assets here. </span>
                                    <span id='no-watchlist-caption' onClick={() => history.push('/trade')}>
                                        Explore our <span id='italicize'>limited</span> assets
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>

                }



                <div id='news-container'>
                    {/* News: {displayToday} */}
                    {cryptoNews?.map(article => (
                        <div key={article.id} id='article-container'>
                            {/* {console.log(article)} */}
                            <a id='news-redirect' href={`${article.url}`} target="_blank" rel="noreferrer">

                                <div id='news-img-div'>
                                    <img id='news-img' src={article.image} alt='news-img' />
                                </div>
                            </a>
                            <div id='news-details'>
                                <a id='news-redirect' href={`${article.url}`} target="_blank" rel="noreferrer">

                                    <p id='news-header'>
                                        <span>{article.source} &bull; </span>
                                        <span>{new Date(article.datetime * 1000).toLocaleDateString("en-US")}</span>
                                    </p>
                                </a>
                                <a id='news-redirect' href={`${article.url}`} target="_blank" rel="noreferrer">
                                    <p id='news-headline'>{article.headline}</p>
                                    <div dangerouslySetInnerHTML={{ __html: `${article.summary.substring(0, 110)}...` }}></div>
                                    {/* <div>{article.url}</div> */}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div id='right-sidebar-column'>
                {data && (
                    <div>
                        <h3>Portfolio Distribution</h3>
                        <div id='pieChart-container'>
                            <Pie data={data} />
                        </div>
                    </div>
                )}

                <div id='top-movers'>
                    {/* <div>Top Movers (Most Popular) </div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div> */}
                    {/* <h2>UNDER CONSTRUCTION</h2> */}
                    {/* {getTopMovers()} */}
                </div>
            </div>
            {/* <div id='right-sidebar-spacer'>
                    This is a needed spacer so sidebar doesn't overlap
                </div> */}

        </div>

    )


}


export default Dashboard