import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import * as sessionActions from "../store/session";
import coindex from '../aIMGS/coinbase.png';
import './gateway.css';

const Gateway = () => {
    const disNavpatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    // have to update navBar title ie: 'Assets' if on assets page; possibly useParams
    const sessionUser = useSelector((state) => state.session.user);

    // todo: POTENTIALLY add another useEffect dispatching Thunk for route: 'Get top 7 most popular cryptos'



    return (
        <>
            <div id='gateway-nav-wrapper'>
                <>
                    <nav>
                        <div id='gate-nav-content'>
                            <div id='gateway-logo'>
                                <img src={coindex} alt='logo' id='gateway-logo-img' />
                                <div id='gateLogo'>oindex-ss</div>
                            </div>
                            <div id='auth-button'>
                                <p id='already-question'>Already have an account?</p>
                                <div id='signin-button'>
                                    <span>Sign in</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </>
            </div>
            <div id='gateway-halves-container'>
                <div id='main-gateway'>
                    <div id='welcome-header'>Weclome to Coindex</div>
                    <div id='instruct-caption'>Choose your account type to get started</div>
                    <br></br>
                    <div className='card-container'>
                        <div className='card-inner-container'>
                            <p className='card-option-title'>Individual</p>
                            <p className='card-explain'>For individuals who want to trade, send and receive crypto, get price alerts, and more</p>
                        </div>
                        <div className='cb-img-div'>
                            <img className='cb-img' src="https://static-assets.coinbase.com/design-system/illustrations/light/delegate-1.svg" alt='cb-person' />
                        </div>
                    </div>
                    <div className='card-container'>
                        <div className='card-inner-container'>
                            <p className='card-option-title'>Business</p>
                            <p className='card-explain'>For companies, institutions, and high net worth clients with a trust who want to accept, custody, trade crypto and more</p>
                        </div>
                        <div className='cb-img-div'>
                            <img id='business-img' className='cb-img' src="https://static-assets.coinbase.com/design-system/illustrations/light/institutions-1.svg" alt='cb-business' />
                        </div>
                    </div>
                    <div id='get-started-button'>Get started</div>
                </div>
                <div id='side-gate-info'>
                    <div id='side-info-header'>
                        <div>An individual account is the best way to manage your personal crypto portfolio.</div>
                    </div>
                    <div id='method-list'>
                        <div>
                            <span>Access to hundreds of cryptocurrencies</span>
                            <p>Buy, sell and track your crypto all in one place.</p>
                        </div>
                    </div>
                    <div id='method-list'>
                        <div>
                            <span>Safe & secure</span>
                            <p>Industry best practices are used to keep your crypto safe.</p>
                        </div>
                    </div>
                    <div id='method-list'>
                        <div>
                            <span>Anytime, anywhere.</span>
                            <p>Stay on top of the markets with the Coindex app for Android or iOS. Coming soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gateway;