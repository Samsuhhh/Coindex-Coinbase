import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadAllWallets, loadWatchlist } from '../../store/session';
import TradeCard from '../Trade/TradeCard';
import './dashboard.css'


const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(true) // for news api if we implement that data
    // const sessionUser = useSelector((state) => state.session.user)
    // const singleAsset = useSelector((state) => state.assets.singleAsset)
    const currWallet = useSelector(state => state.session.wallets)
    const watchlist = useSelector(state => state.session.watchlist)
    // const currentCards = useSelector(state => state.session.card);
    const allAssets = useSelector(state => state.assets.allAssets)
    const dispatch = useDispatch();
    // const assets = useSelector((state) => state.assets.allAssets) 

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
        // console.log(newsResponse.json())
        return newsResponse.json();
    }

    useEffect(() => {
        const news = async () => {
            try {
                setIsLoaded(false)
                const todayNews = await getNews();
                setCryptoNews(todayNews);
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




    // const assetTotal = getBalance();

    const cashValueCalculator = (amount, currPrice) => {
        let val = Number(amount) * Number(currPrice)
        return val
    };

    // const amountCalculator = (cashValue, currPrice) => {
    //     let amt = Number(cashValue) / Number(currPrice)
    //     return amt
    // };

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
            return "You're dummy rich."
        }

    }
    const portfolio = getPortfolioBalance();

    // Date UNIX 
    // let today = Date.now();
    // const displayToday = Date(today).toLocaleDateString('en-US')

    // useEffect(() => {
    //     // dispatch(loadAllWallets())

    // }, [dispatch])


    if (!isLoaded) {
        return <div>LOADING... </div>
    }

    return isLoaded && (
        <>
            {/* {sessionUser && ( */}
            <div id='main-wrapper-include-rightSidebar'>
                <div id='center-main-content-column-stack'>
                    <div id='your-balance-summary-div-flex-row'>
                        <div id='your-balance-column'>
                            <div id='balance-div'>
                                Your Portfolio
                            </div>
                            <div id='balance-cash-value'>Total value: ${portfolio ? portfolio : "0.00"} </div>
                            <div id='balance-caption'>{portfolio ? 'Nice work!' : "Let's go buy some crypto."}</div>
                        </div>
                        {/* <div id='graph-but-we-not-doing-that-lol'>hey I'm a graph</div> */}
                    </div>
                    <div id='watchlist-container'>
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
                                <TradeCard name={key} allAssets={watchlist}/>
                            ))}
                        </table>

                    </div>

                    <div id='news-container'>
                        {/* News: {displayToday} */}
                        {cryptoNews?.map(article => (
                            <div id='article-container'>
                                {/* {console.log(article)} */}
                                <div id='news-img-div'>
                                    <img id='news-img' src={article.image} alt='news-img' />
                                </div>
                                <div id='news-details'>
                                    <p id='news-header'>
                                        <span>{article.source} </span>
                                        <span>{article.datetime}</span>
                                    </p>
                                    <a id='news-redirect' href={`${article.url}`}>
                                        <p id='news-headline'>{article.headline}</p>
                                        <div dangerouslySetInnerHTML={{__html: article.summary}}></div>
                                        {/* <div>{article.url}</div> */}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id='right-sidebar-column'>
                    <div>
                        <h2>Doughnut Chart</h2>
                        </div>
                    <div id='top-movers'>
                        {/* <div>Top Movers (Most Popular) </div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div> */}
                        <h2>UNDER CONSTRUCTION</h2> 
                    </div>
                </div>
                {/* <div id='right-sidebar-spacer'>
                    This is a needed spacer so sidebar doesn't overlap
                </div> */}

            </div>

            {/* )} */}


        </>
    )


}


export default Dashboard