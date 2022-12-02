import React from 'react';
import './pageNotFound.css';
import sinkingShip from '../../aIMGS/sinkingShip.gif';
import shipwreck from '../../aIMGS/shipwreck.gif';
import { useLocation } from 'react-router-dom';

const PageNotFound = () => {
    const location = useLocation();
    const notFound = [sinkingShip, shipwreck]
    const randImg = () => {
        return notFound[Math.random(0, notFound.length - 1)]
    }

    return (
        <div id='error-page-wrapper'>
            <div id='error-page-content'>
                <div className='error-header'>
                    <span>404 Error: </span>
                    <span>Page Not Found</span>
                </div>
                <div id='abandon-header'>Abandon Ship!!</div>
                <div id='sinking-ship-div'>
                    <img id='sinking-ship-gif' src={location.pathname.length > 7 ? sinkingShip : shipwreck} alt='sinking-ship' />
                </div>
            </div>
        </div>
    )

}


export default PageNotFound;