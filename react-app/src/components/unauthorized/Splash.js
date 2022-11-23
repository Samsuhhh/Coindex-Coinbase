import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './splash.css'
import { logout } from "../../store/session";
import splash from '../../aIMGS/cb-splash.png';


// EXPLORE PAGE WHEN NOT LOGGED IN
const Splash = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <div id='splash-page-wrapper'>
            <div id='splash-container'>
                <div id='splash-left'>
                    <img src={splash} alt='cb-splash' id='splash-img1-phones' />
                </div>
                <div id='splash-right'>
                    <div id='splash-title'>The future of money is here</div>
                    {/* <span id='splash-separator'>      </span> */}
                    <p id='splash-caption'>Over 108 million (definitely 100% real) people and businesses trust us to buy, sell, and manage crypto.</p>
                    <div id='splash-signup'>
                        <div id='splash-input-div'>
                            <input 
                            id="splash-input"
                            placeholder="DavidTHERogers@aa.io"
                            />
                        </div>
                        <button type='submit' id='splash-submit-btn'>
                            <span id='splash-btn-text'>Sign up</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}




export default Splash;