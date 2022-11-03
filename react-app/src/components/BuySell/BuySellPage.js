import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bitLogo from '../../aIMGS/Bitcoin.png'
import switchArrows from '../../aIMGS/arrows-vertical.svg'
import { checkWalletThunk, createTransactionThunk, createWalletThunk, getCurrentUserCards, updateWalletThunk } from '../../store/session';
import './buySellPage.css';
import AddCardModal from './index2';
import { Modal } from '../../context/Modal';
import AddCardForm from '../Card/AddCardForm';
import PayWithModal from '../Card/PayWithModal/PayWithModal';
import backArrow from '../../aIMGS/arrow-left.svg'



const BuySellPage = () => {
    const [showConvert, setShowConvert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    const [transactionType, setTransactionType] = useState('')
    const [assetAmount, setAssetAmount] = useState(0)
    const [cashValue, setCashValue] = useState(0)
    const [card, setCard] = useState('')
    const [walletAddress, setWalletAddress] = useState('')
    const [assetType, setAssetType] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transaction = {
            transaction_type: transactionType,
            asset_amount: assetAmount,
            cash_value: cashValue,
            asset_type: assetType,
            card: card,
            wallet_address: walletAddress
        }

        let checkWallet = await dispatch(checkWalletThunk(assetType))

        if (checkWallet) {
            const newTransaction = await dispatch(createTransactionThunk(transaction))
            await dispatch(updateWalletThunk(newTransaction))
        } else {
            const wallet = {
                asset_type: assetType,
                asset_amount: assetAmount,
                cash_value: cashValue
            }
            const newWallet = await dispatch(createWalletThunk(wallet))
            await dispatch(createTransactionThunk(transaction))
            await dispatch(updateWalletThunk(transaction))
            // Do i pass in transaction from form or response from createdTransactionThunk?? 
        }
    }

    useEffect(() => {
        dispatch(getCurrentUserCards())
            .then(() => setIsLoaded(true))
    }, [dispatch])


    const handleConvert = () => {
        const inputDiv = document.getElementsByClassName('input-wrapper');
        const convertDiv = document.getElementsByClassName('convert-input-wrapper');
        const btcText = document.getElementsByClassName('BTC');
        const cover = document.getElementsByClassName('cover');

        if (!showConvert) {
            inputDiv[0].style.display = 'none';
            inputDiv[0].style.zIndex = '-1';
            convertDiv[0].style.display = 'flex';
            convertDiv[0].style.zIndex = '1'
            btcText[0].innerText = 'USD'
            for (let i = 0; i < 3; i++) {
                cover[i].style.zIndex = '100';
            }
            setShowConvert(true);
        } else {
            inputDiv[0].style.display = 'flex';
            inputDiv[0].style.zIndex = '1';
            convertDiv[0].style.display = 'none';
            convertDiv[0].style.zIndex = '-1'
            btcText[0].innerText = 'BTC'
            for (let i = 0; i < 3; i++) {
                cover[i].style.zIndex = '-1';
            }
            setShowConvert(false);
        }
    }

    return isLoaded && (
        <div id='buy-sell-wrapper'>
            <form id='transactions-form'>
                <div id='buy-sell-convert'>
                    <div className='hover'
                        style={{ position: 'absolute', width: '33%', height: '10%' }}
                        onClick={() => console.log('Buy Top Left Button')}
                    ></div>
                    <div className='hover'
                        style={{ position: 'absolute', width: '33%', height: '10%', left: '33%' }}
                        onClick={() => console.log('Sell Top Middle')}
                    ></div>
                    <div className='hover'
                        style={{ position: 'absolute', width: '33%', height: '10%', left: '66.6%' }}
                        onClick={() => console.log('Convert Top Right')}
                    ></div>
                    <div id='buy'
                    >
                        <span>Buy</span>
                    </div>
                    <div id='sell'>
                        <span>Sell</span>
                    </div>
                    <div id='convert'>
                        <span>Convert</span>
                    </div>
                </div>
                <div className='second-inner'>
                    <div className='second-input'>
                        <div className='input-wrapper'>
                            <i className="fa-solid fa-dollar-sign"
                                style={{ color: 'rgb(138, 145, 158)', paddingTop: '10px', fontSize: '25px' }}
                            />
                            <input
                                type='number'
                                id='input'
                                placeholder='0'
                                autoComplete='off'
                            ></input>
                        </div>
                        <div className='convert-input-wrapper'>
                            <input
                                type='number'
                                id='input'
                                placeholder='0'
                                autoComplete='off'
                            ></input>
                            <div className='units-BTC'>
                                BTC
                            </div>
                        </div>
                        <span id='buy-up-to'>You can buy up to $5,000.00</span>
                        <div className='one-time'>
                            <div className='hover-2'
                                style={{ position: 'absolute', width: '230px', height: '42px', borderRadius: '30px' }}
                                onClick={() => console.log('One Time Purchase')}
                            ></div>
                            <span>One time purchase</span>
                            <i className="fa-solid fa-angle-down"
                                style={{ marginLeft: '15px' }}
                            />
                        </div>
                    </div>
                    <div className='prices'>
                        <div className='hover-2'
                            style={{ position: 'absolute', height: '37px', width: '108px', borderRadius: '30px' }}
                            onClick={() => console.log('$100')}
                        ></div>
                        <div className='hover-2'
                            style={{ position: 'absolute', height: '37px', width: '108px', borderRadius: '30px', left: '135px' }}
                            onClick={() => console.log('$250')}
                        ></div>
                        <div className='hover-2'
                            style={{ position: 'absolute', height: '37px', width: '108px', borderRadius: '30px', left: '252px' }}
                            onClick={() => console.log('$500')}
                        ></div>
                        <div className='pricebutt'>
                            <span>$100</span>
                        </div>
                        <div className='pricebutt'>
                            <span>$250</span>
                        </div>
                        <div className='pricebutt'>
                            <span>$500</span>
                        </div>
                        <div className='cover'></div>
                        <div className='cover'
                            style={{ left: '135px' }}
                        ></div>
                        <div className='cover'
                            style={{ left: '252px' }}
                        ></div>
                    </div>
                    <div className='switch'
                        onClick={() => handleConvert()}
                    > <img id='switch-arrows' alt='switch' src={switchArrows} style={{ color: 'white' }} />
                        {/* <i className="fa-solid fa-repeat"
                        style={{ color: 'white' }}
                    /> */}
                    </div>
                    <div className='BTC'>BTC</div>
                </div>
                <div className='third'>
                    <div className='inside-third'>
                        <div className='bitcoin'>
                            <div className='hover-2'
                                style={{ position: 'absolute', width: '90%', height: '55px', borderTopRightRadius: '7px', borderTopLeftRadius: '7px' }}
                                onClick={() => console.log('Buy Middle Button')}
                            ></div>
                            <div className='hover-2'
                                style={{ position: 'absolute', width: '90%', height: '55px', borderBottomRightRadius: '7px', borderBottomLeftRadius: '7px', marginTop: '55px' }}
                                // onClick={() => console.log('Pay With')}
                                onClick={() => setShowModal(true)}
                            >
                            </div>
                            {/* <AddCardModal/> */}
                            {/* this modal works but have to change to load all cards */}
                            {showModal && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <div id='close-div' onClick={() => setShowModal(false)}>
                                        <img id='back-arrow-svg' src={backArrow} alt='back arrow' />
                                    </div>
                                    <PayWithModal />
                                </Modal>
                            )}
                            <div className='inner-bit'>
                                <div className='bit-left'>
                                    <span>Buy</span>
                                </div>
                                <div className='bit-mid'>
                                    <img alt='bit logo' id='bit-logo' src={bitLogo} />
                                    <span>Bitcoin</span>
                                </div>
                                <div className='bit-right'>
                                    <i className="fa-solid fa-angle-right" />
                                </div>
                            </div>
                        </div>
                        <div className='wells'>
                            <div className='inner-bit'>
                                <div className='bit-left'>
                                    <span>Pay with</span>
                                </div>
                                <div className='bit-mid'>
                                    <i id='wells-logo' className="fa-solid fa-building-columns" />
                                    <span>Visa Chase</span>
                                </div>
                                <div className='bit-right'>
                                    <i className="fa-solid fa-angle-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='fourth'>
                    <div className='butt-for-buy'
                        onClick={() => console.log('Buy Bitcoin Blue Button')}
                    >
                        <div className='hover'
                            style={{ position: 'absolute', width: '90%', height: '57px', borderRadius: '30px', marginTop: '2px' }}
                        >
                        </div>
                        <span
                        >Buy Bitcoin</span>
                    </div>
                </div>
            </form>
            <div className='fifth'>
                <div className='fifth-inner'>
                    <span id='bal' className='five-left'>BTC balance</span>
                    <span id='btc' className='five-right'>0 BTC ≈ $0.00</span>
                </div>
            </div>
        </div >
    )


}


export default BuySellPage;
