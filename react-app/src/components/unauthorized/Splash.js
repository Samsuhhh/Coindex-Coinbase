import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './splash.css'
import { logout } from "../../store/session";
import splash from '../../aIMGS/cb-splash.png';
import arrow from '../../aIMGS/arrow-left.svg';
import gary from '../../aIMGS/gary.png';
import john from '../../aIMGS/john.png';

// EXPLORE PAGE WHEN NOT LOGGED IN
const Splash = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <div id='splash-page'>
            <div id='splash-page-wrapper'>
                <div id='splash-container'>
                    <div id='splash-left'>
                        <img src="https://images.ctfassets.net/c5bd0wqjc7v0/2vt7DsLNuaKgFMBoVlOJ3g/8310b52e72b948a1e641ffde3c0e4e53/freeMoney-1.png?fm=webp&q=100&w=1180" alt='cb-splash' id='splash-img1-phones' />
                    </div>
                    <div id='splash-right'>
                        <div id='splash-title'>The future of money is here</div>
                        {/* <span id='splash-separator'>      </span> */}
                        <p id='splash-caption'>Over 108 million <span id='italicize'>*definitely 100% <span id='underline'>real</span></span> people and businesses trust us to buy, sell, and manage crypto.</p>
                        <div id='splash-signup'>
                            <div id='splash-input-div'>
                                <input
                                    id="splash-input"
                                    placeholder="THE.DavidRogers@aa.io"
                                    disabled='true'
                                />
                            </div>
                            <div type='submit' id='splash-submit-btn'>
                                <span id='splash-btn-text'>Sign up</span>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </div>
                <div id='crypto-advocacy-container'>
                    
                    <div id='advocate-left'>
                        <img src={john} alt='oh-my' id='john-png' />
                    </div>
                    <div id='john-quote' className="media">
                        <span>A quote from one of our biggest crypto advocates.</span>
                        <span id='italicize'>"I love cryptocurrency. Crypto to the moon!" </span>
                        <span id='john-container'>
                            <span>
                                <img src={arrow} alt='arrow' id='point-at-john' />
                            </span>
                            <span>a.k.a. this guy</span>
                        </span>
                    </div>
                    <div id='advocate-right'>
                        <div id='advocate-main'>
                            <div id='advocate-title'>
                                <div>Crypto Advocacy</div>
                            </div>
                            <p id='adv-caption'>Find out more about where your Member of Congress stands on crypto!</p>
                        </div>
                        <a href="https://www.coinbase.com/public-policy/legislative-portal" target="_blank" rel="noreferrer">
                            <div id='fafo-more'>
                                <div>Find out more</div>
                                <img src={arrow} alt='arrow' id='fafo-arrow' />
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div id='disclaimer-container'>
                <div id='splash-title' className='splash-disclaimer'>
                    {"This is definitely NOT a real site and you should NOT enter any sensitive information. If you enter your real card information, I WILL be buying dinner with it. Thank you. pls hire me."}
                </div>
            </div>
        </div>
    )
}




export default Splash;