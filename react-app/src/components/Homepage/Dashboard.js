import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './dashboard.css'

const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(false) // for news api if we implement that data
    const sessionUser = useSelector((state) => state.session.user)

    // learn protected routes and use instead of sessionUser
    return (
        <>
            {/* {sessionUser && ( */}
                <div id='main-wrapper-include-rightSidebar'>
                    <div id='center-main-content-column-stack'>
                        <div id='your-balance-summary-div-flex-row' style={{ marginTop: "100px"}}>
                            <div id='your-balance-column'>
                                <div id='balance-div'>Your Balance</div>
                                <div id='balance-cash-value'>$0.00 you broke</div>
                                <div id='balance-caption'>All time</div>
                            </div>
                            <div id='graph-but-we-not-doing-that-lol'>hey I'm a graph</div>
                        </div>
                        <div>Watchlist</div>
                        <div>News: Sunday, October 30</div>
                    </div>
                    <div id='right-sidebar-column'>
                        <div>Top Movers (Most Popular) </div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div>
                        <div>Map over data from route</div>
                    </div>

                </div>

            {/* )} */}


        </>
    )


}


export default Dashboard