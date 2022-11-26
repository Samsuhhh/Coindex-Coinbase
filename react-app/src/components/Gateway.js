import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import * as sessionActions from "../store/session";
import coindex from '../aIMGS/coinbase.png';
import splashLine from '../aIMGS/splash-line-graph.svg';
import lock from '../aIMGS/lock.svg';
import smartphone from '../aIMGS/smartphone.svg';
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
                                <div id='signin-button' onClick={() => history.push('/login')}>
                                    <span>Sign in</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </>
            </div>
            <div id='gateway-halves-container'>
                <div id='main-gateway'>
                    <div id='welcome-header'>Welcome to Coindex</div>
                    <div id='instruct-caption'>Choose your account type to get started.</div>
                    <span id='instruct-caption'>Business accounts are currently disabled. Press 'get started' to sign up for an Individual account.</span>
                    <br></br>
                    <div className='card-container' id='individual-card'>
                        <div className='card-inner-container'>
                            <p className='card-option-title'>Individual</p>
                            <span className='card-explain'>For individuals who want to trade, send and receive crypto, get price alerts, and more</span>
                        </div>
                        <div className='cb-img-div'>
                            <img className='cb-img' src="https://static-assets.coinbase.com/design-system/illustrations/light/delegate-1.svg" alt='cb-person' />
                        </div>
                    </div>
                    <div className='card-container' id='business-card'>
                        <div className='card-inner-container'>
                            <p className='card-option-title'>Business</p>
                            <span className='card-explain'>For companies, institutions, and high net worth clients with a trust who want to accept, custody, trade crypto and more</span>
                        </div>
                        <div className='cb-img-div'>
                            <img id='business-img' className='cb-img' src="https://static-assets.coinbase.com/design-system/illustrations/light/institutions-1.svg" alt='cb-business' />
                        </div>
                    </div>
                    <div id='get-started-button' onClick={() => history.push('/sign-up')}>Get started</div>
                </div>

                <div id='side-gate-info'>
                    <div id='side-info-header'>
                        <div>An individual account is the best way to manage your personal crypto portfolio.</div>
                    </div>
                    <div className='method-list'>
                        <div className='side-info-img-div'>
                            <img src={splashLine} alt='splash-line' className='gateway-img'/>
                        </div>
                        <div className='side-info-list-explain'>
                            <span className='side-explain-header'>Access to hundreds of cryptocurrencies</span>
                            <span>Buy, sell and track your crypto all in one place.</span>
                        </div>
                    </div>
                    <div className='method-list'>
                        <div className='side-info-img-div'>
                            <img src={lock} alt='splash-lock' className='gateway-img' />
                        </div>
                        <div className='side-info-list-explain'>
                            <span className='side-explain-header'>Safe & secure</span>
                            <span>Industry best practices are used to keep your crypto safe.</span>
                        </div>
                    </div>
                    <div className='method-list'>
                        <div className='side-info-img-div'>
                            <img src={smartphone} alt='splash-phone' className='gateway-img' />
                        </div>
                        <div className='side-info-list-explain'>
                            <span className='side-explain-header'>Anytime, anywhere.</span>
                            <span>Stay on top of the markets with the Coindex app for Android or iOS. Coming soon.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gateway;