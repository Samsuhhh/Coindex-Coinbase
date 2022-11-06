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

    // learn protected routes and use instead of sessionUser
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

    // const getPortfolioBalance = () => {
    //     let total = 0;
    //     Object.values(currWallet).forEach((wallet) => {
    //         let amt = Number(wallet.assetAmount)
    //         Object.values(allAssets).forEach(crypto => {
    //             let cash = cashValueCalculator(amt, Number(crypto.usd))
    //             total += cash
    //         })
    //     })

    //     return total.toFixed(2)
    // }
    // const portfolio = getPortfolioBalance();

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

    return isLoaded && (
        <>
            {/* {sessionUser && ( */}
            <div id='main-wrapper-include-rightSidebar'>
                <div id='center-main-content-column-stack'>
                    <div id='your-balance-summary-div-flex-row'>
                        <div id='your-balance-column'>
                            <div id='balance-div'>
                                <h1>Your Portfolio</h1>
                            </div>
                            <div id='balance-cash-value'> ${portfolio ? portfolio : "0.00"} </div>
                            <div id='balance-caption'>{portfolio ? 'Nice work!' : "Let's go buy some crypto."}</div>
                        </div>
                        <div id='graph-but-we-not-doing-that-lol'>hey I'm a graph</div>
                    </div>
                    <div>
                        
                        <div id='your-assets-container'></div>

                    </div>





                    {/* <div>{singleAsset.name}</div> */}
                    <div>News: Sunday, October 30</div>
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