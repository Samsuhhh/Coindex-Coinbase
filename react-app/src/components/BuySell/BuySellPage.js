import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bitLogo from '../../aIMGS/Bitcoin.png'
import switchArrows from '../../aIMGS/arrows-vertical.svg'
import { deleteCard, checkWalletThunk, createTransactionThunk, createWalletThunk, getCurrentUserCards, updateWalletThunk } from '../../store/session';
import { Modal } from '../../context/Modal';
import AddCardForm from '../Card/AddCardForm';
// import PayWithModal from '../Card/PayWithModal/PayWithModal';
import backArrow from '../../aIMGS/arrow-left.svg'
import trashCan from '../../aIMGS/trash-can.svg';
import closeX from '../../aIMGS/close.svg';
import edit from '../../aIMGS/edit.svg';
import './buySellPage.css';
import '../Card/PayWithModal/paywithmodal.css';
import EditCardForm from '../Card/EditCardForm/EditCardForm';



const BuySellPage = () => {

    const defaultWallet = useSelector(state => state.session.wallets)
    const cards = useSelector((state) => state.session.card);
    const allAssets = useSelector((state) => state.assets.allAssets)

    const [showConvert, setShowConvert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCardModal, setShowCardModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    const [transactionType, setTransactionType] = useState('Buy')
    const [assetAmount, setAssetAmount] = useState(0)
    const [cashValue, setCashValue] = useState(0)
    const [card, setCard] = useState('')
    const [assetType, setAssetType] = useState('')
    const [walletAddress, setWalletAddress] = useState(`${defaultWallet[assetType]}`)


    const updateTransactionType = (e) => setTransactionType(e.target.value);
    const updateAssetAmount = (e) => setAssetAmount(e.target.value);
    const updateCashValue = (e) => setCashValue(e.target.value);
    const updateAssetType = (e) => setAssetType(e.target.value);

    // useEffect for error handlers and watch for changes in state values
    useEffect(() => {

    })



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
            await dispatch(createWalletThunk(wallet))
            await dispatch(createTransactionThunk(transaction))
            await dispatch(updateWalletThunk(transaction))
            // Do i pass in transaction from form or response from createdTransactionThunk?? 
        }
    }

    const editHandler = (id) => {

    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteCard(id))
                .then(() => dispatch(getCurrentUserCards()))
        }
    }

    useEffect(() => {
        dispatch(getCurrentUserCards())
            .then(() => { setIsLoaded(true) })

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

    if (!isLoaded) {
        return null
    }

    return isLoaded && (
        <form id='transactions-form'>
            < div id='buy-sell-wrapper' >
                <div id='buy-sell-convert'>
                    <div className='hover'
                        style={{ position: 'absolute', width: '33%', height: '10%' }}
                        onClick={() => setTransactionType("Buy")}
                    ></div>
                    <div className='hover'
                        style={{ position: 'absolute', width: '33%', height: '10%', left: '33%' }}
                        onClick={() => setTransactionType("Sell")}
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
                                onChange={updateCashValue}
                            ></input>
                        </div>
                        <div className='convert-input-wrapper'>
                            <input
                                type='number'
                                id='input'
                                placeholder='0'
                                autoComplete='off'
                                onChange={updateAssetAmount}
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
                                onClick={() => setShowCryptoModal(true)}
                            ></div>
                            {showCryptoModal && isLoaded && (
                                <Modal onClose={() => setShowCryptoModal(false)}>
                                    <div id='crypto-list-container'>
                                        <div id='close-div' onClick={() => setShowCryptoModal(false)}>
                                            <img id='back-arrow-svg' src={backArrow} alt='back arrow' />
                                        </div>
                                        <div id='pay-with-modal-header'>
                                            <span>Select asset</span>
                                        </div>
                                        <div id='crypto-list-content'>
                                            {Object.keys(allAssets).map((crypto) => (
                                                <div id='crypto-card' onClick={updateAssetType}>
                                                    <option
                                                        value={assetType}  
                                                    >
                                                        {crypto}
                                                    </option>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </Modal>
                            )}


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
                                    {/* <PayWithModal setCard={setCard}, card={card}/> */}
                                    <div id='pay-with-modal-container'>
                                        <div id='pay-with-modal-header'>
                                            <span>Pay with</span>
                                        </div>
                                        <div id='pay-with-modal-content'>
                                            {Object.values(cards).map((dCard) => (
                                                <div id='dCard-card-wrapper'>
                                                    <div key={dCard.id} className='mapped-card-div-row-justify' onClick={() => setCard(dCard.id)}>
                                                        <div>{dCard.cardType}</div>
                                                        <div id='card-info-div-col'>
                                                            <div id='card-bank-div'>{dCard.name}</div>
                                                            <div id='card-caption-overflow-wrap'>
                                                                $5,000.00 buying limit remaining. You'll get instant access to your assets
                                                            </div>
                                                        </div>
                                                        <div id='mapped-card-right'>
                                                            <div id='last-four-div'>{dCard.lastFourDigits}</div>
                                                            <div id='auth-action-buttons'>
                                                                <div id='edit-card' onClick={() => setShowEditModal(true)}>
                                                                    <img src={edit} id='edit-pencil' alt='edit pencil' />
                                                                </div>
                                                                {showEditModal && (
                                                                    <Modal onClose={() => setShowEditModal(false)}>
                                                                        <div id='close-x-div' onClick={() => setShowEditModal(false)}>
                                                                            <img id='add-card-cancel-button' src={closeX} alt='close' />
                                                                        </div>
                                                                        <EditCardForm />
                                                                    </Modal>
                                                                )}
                                                                <div id='delete-card' onClick={() => deleteHandler(dCard.id)}>
                                                                    <img src={trashCan} id='trash-can' alt='trash' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div id='pay-with-modal-footer'>
                                            <div id='add-payment-butt-div'>
                                                <div id='add-payment-button' onClick={() => setShowCardModal(true)}>
                                                    <div id='changeToSVG'> + </div>
                                                    Add a payment method
                                                </div>
                                                {showCardModal && isLoaded && (
                                                    <Modal onClose={() => setShowCardModal(false)} >
                                                        <div id='close-x-div' onClick={() => setShowCardModal(false)}>
                                                            <img id='add-card-cancel-button' src={closeX} alt='close' />
                                                        </div>
                                                        <AddCardForm />
                                                    </Modal>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            )}
                            <div className='inner-bit'>
                                <div className='bit-left'>
                                    <span>Buy</span>
                                </div>
                                <div className='bit-mid'>
                                    <img alt='bit logo' id='bit-logo' src={bitLogo} />
                                    <span>Bitcoin</span>
                                    {/* THIS ASSET TYPE NEEDS TO UPDATE WITH WHATEVER IS SELECTED FROM THE MODAL */}
                                    {/* ASK ALEX ABOUT TAGS MODAL AND SETTING THAT STUFF */}

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
                    <div className='butt-for-buy' type='submit'
                        onClick={handleSubmit}
                    >
                        <div className='hover'
                            style={{ position: 'absolute', width: '90%', height: '57px', borderRadius: '30px', marginTop: '2px' }}
                        >
                        </div>
                        <span
                        >Buy Bitcoin</span>
                    </div>
                </div>
                <div className='fifth'>
                    <div className='fifth-inner'>
                        <span id='bal' className='five-left'>BTC balance</span>
                        <span id='btc' className='five-right'>0 BTC ≈ $0.00</span>
                    </div>
                </div>
            </div >
        </form>
    )


}


export default BuySellPage;
