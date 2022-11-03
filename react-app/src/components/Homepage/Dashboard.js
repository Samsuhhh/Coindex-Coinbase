import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';
import './dashboard.css'


const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(true) // for news api if we implement that data
    const sessionUser = useSelector((state) => state.session.user)
    const singleAsset = useSelector((state) => state.assets.singleAsset)
    const dispatch = useDispatch();
    // const assets = useSelector((state) => state.assets.allAssets) 

    // learn protected routes and use instead of sessionUser
    useEffect(() => {
        dispatch(getCurrentUserCards())
        // dispatch(getOneAsset()) // just for testing, move to singleAsset page
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            {/* {sessionUser && ( */}
            <div id='main-wrapper-include-rightSidebar'>
                <div id='center-main-content-column-stack'>
                    <div id='your-balance-summary-div-flex-row'>
                        <div id='your-balance-column'>
                            <div id='balance-div'>Your Balance</div>
                            <div id='balance-cash-value'>$0.00 you broke</div>
                            <div id='balance-caption'>All time</div>
                        </div>
                        <div id='graph-but-we-not-doing-that-lol'>hey I'm a graph</div>
                    </div>
                    <div>Watchlist</div>
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