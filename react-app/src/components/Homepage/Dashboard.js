import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards, loadAllWallets } from '../../store/session';
import './dashboard.css'


const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(true) // for news api if we implement that data
    const sessionUser = useSelector((state) => state.session.user)
    const singleAsset = useSelector((state) => state.assets.singleAsset)
    const currUser = useSelector(state => state.session.user)
    const currWallet = useSelector(state => state.session.wallets)
    const currentCards = useSelector(state => state.session.card);
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
                console.log(cryptoNews, 'CRYPTOOOO NEWS')
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
            setIsLoaded(true)
        })();


        // dispatch(getOneAsset()) // just for testing, move to singleAsset page
    }, [dispatch])




    // const assetTotal = getBalance();

    const cashValueCalculator = (amount, currPrice) => {
        let val = Number(amount) * Number(currPrice)
        return val
    };

    const amountCalculator = (cashValue, currPrice) => {
        let amt = Number(cashValue) / Number(currPrice)
        return amt
    };

    const getPortfolioBalance = () => {
        let total = 0;
        Object.values(currWallet).forEach((wallet) => {
            let amt = Number(wallet.assetAmount)
            Object.keys(currWallet).forEach(key => {
                let price = allAssets[key].usd
                let cash = cashValueCalculator(amt, price)
                total += cash
            })
        })

        return total.toFixed(2)
    }
    const portfolio = getPortfolioBalance();

    useEffect(() => {
        dispatch(loadAllWallets())
    }, [dispatch])

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
                    <div>

                        <div id='your-assets-container'></div>

                    </div>

                    <div id='news-container'>
                        News: Sunday, October 30
                        {cryptoNews?.map(article => (
                            <div id='article-container'>
                                <div id='news-img-div'>
                                    <img id='news-img' src={article.image} alt='news-img'/>
                                </div>
                                <div id='news-details'>
                                    <div>{article.headline}</div>
                                    <div>{article.summary}</div>
                                    <div>{article.source}</div>
                                    <div>{article.url}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id='right-sidebar-column'>
                    <div id='top-movers'>
                        <div>Top Movers (Most Popular) </div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div>
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