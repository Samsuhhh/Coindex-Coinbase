import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bitLogo from '../../aIMGS/Bitcoin.png'
// import switchArrows from '../../aIMGS/arrows-vertical.svg'
import { deleteCardThunk, checkWalletThunk, createTransactionThunk, createWalletThunk, getCurrentUserCards, updateWalletThunk, updateCardThunk, loadAllWallets, deleteWalletThunk, createCardThunk } from '../../store/session';
import { Modal } from '../../context/Modal';
import AddCardForm from '../Card/AddCardForm';
import backArrow from '../../aIMGS/arrow-left.svg'
import trashCan from '../../aIMGS/trash-can.svg';
import closeX from '../../aIMGS/close.svg';
import edit from '../../aIMGS/edit.svg';
import './BuySellPage.css';
import '../Card/PayWithModal/paywithmodal.css';
import EditCardForm from '../Card/EditCardForm/EditCardForm';
import * as crypto from 'crypto';
import { useHistory } from 'react-router-dom';
// import * as coinImgs from './cryptoImgData.js'
import visaLogo from '../../aIMGS/visa-logo.png'
import mastercardLogo from '../../aIMGS/mastercard.png'

// const randomString = crypto.randomBytes(32).toString('hex');


const BuySellPage = ({ setShowMain }) => {

    const symbols = {
        "apecoin": "APE",
        "avalanche": "AVAX",
        "binance_coin": "BNB",
        "bitcoin": "BTC",
        "binance_usd": "BUSD",
        "cardano": "ADA",
        "dogecoin": "DOGE",
        "ethereum": "ETH",
        "eth2-staking-by-poolx": "ETH2",
        "litecoin": "LTC",
        "polygon": "MATC",
        "near": "NEAR",
        "polkadot": "DOT",
        "ripple": "XRP",
        "solana": "SOL",
        "stellar": "XLM",
        "tether": "USDT",
        "tron": "TRX",
        "uniswap": "UNI",
        "usd-coin": "USDC"
    }



    const history = useHistory();
    const currUser = useSelector(state => state.session.user)
    const currWallet = useSelector(state => state.session.wallets)
    const currentCards = useSelector(state => state.session.card);
    const allAssets = useSelector(state => state.assets.allAssets)

    // const [showConvert, setShowConvert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCardModal, setShowCardModal] = useState(false);
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    // current price added to transactions model for ease of access to data; holding value there too

    const [transactionType, setTransactionType] = useState('Buy')
    const [assetAmount, setAssetAmount] = useState(null)
    // const [cashInput, setCashInput] = useState(null)
    const [cashValue, setCashValue] = useState(null)
    const [card, setCard] = useState(null)
    const [assetType, setAssetType] = useState('')
    const [walletAddress, setWalletAddress] = useState(currWallet[assetType]?.wallet_address)
    const [transactionErrors, setTransactionErrors] = useState([])
    const [showTransactionErrors, setShowTransactionErrors] = useState(false)
    const [selected, setSelected] = useState(null)
    // const holdAssetPrice = allAssets[assetType]?.usd
    const walletKeys = Object.keys(currWallet)

    // const updateTransactionType = (e) => setTransactionType(e.target.value);
    const updateAssetAmount = (e) => setAssetAmount(e.target.value);
    const updateCashValue = (e) => setCashValue(e.target.value);
    // const updateAssetType = (e) => setAssetType(e.target.value);

    useEffect(() => {
        dispatch(loadAllWallets())
    }, [dispatch])

    useEffect(() => {
        dispatch(getCurrentUserCards())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    // On buy sell modal page -> if transactions.keys.length changes, close modal
    // useEffect for error handlers and watch for changes in state values

    useEffect(() => {
        const tErrors = [];
        if (!assetType || !Object.keys(allAssets).includes(assetType)) tErrors.push('Please select a valid asset type.')
        if (!transactionType.length) tErrors.push('Please select a transaction type: Buy or Sell.')
        if (cashValue > 5000 && transactionType === 'Buy') tErrors.push('You can only buy up to $5,000 per transaction.')
        if (cashValue > 5000 && transactionType === 'Sell') tErrors.push('You can only sell up to $5,000 per transaction.')
        if (!assetAmount) tErrors.push("Your transaction's must be worth at least $5.")
        // if (transactionType === 'Sell' && currWallet[assetType]?.assetAmount < assetAmount) {
        //     tErrors.push(`"You can't sell what you don't have... Your ${assetType} balance is ${walletAddress.assetAmount}.`)
        // }
        if (!card) tErrors.push('Please select a card for this transaction.')
        if (transactionType === 'Sell' && !walletKeys.includes(assetType)) tErrors.push("You don't own this asset.")

        if (walletKeys.includes(assetType) && Number(assetAmount) > Number(currWallet[assetType].assetAmount) && transactionType === 'Sell') tErrors.push(`You don't have enough ${assetType} to sell.`)
        if (walletKeys.includes(assetType) && cashValue > Number(currWallet[assetType].cashValue) && transactionType === 'Sell') tErrors.push(`You don't have enough ${assetType} to sell.`)


        if (assetAmount && transactionType === 'Buy' && assetType) {
            if (Number(assetAmount) * allAssets[assetType]?.usd > 5000) {
                tErrors.push('The value of the transaction exceeds the transaction limit of $5,000.')
            }
        } else if (assetAmount && transactionType === 'Sell') {
            if (Number(assetAmount) * allAssets[assetType]?.usd > 5000) {
                tErrors.push('The value of the transaction exceeds the transaction limit of $5,000.')
            }
        }



        if (assetType && cashValue) {
            if (!currWallet[assetType] && transactionType === 'Sell') {
                tErrors.push('You do not own this asset.')
            }
            if (currWallet[assetType] && transactionType === 'Sell') {
                if (Number(currWallet[assetType].cashValue) < Number(cashValue)) {
                    tErrors.push(`You don't have enough ${assetType} to sell.`)
                } else if (Number(currWallet[assetType].cashValue) === Number(cashValue)) {
                    window.alert(`You have sold all of your ${assetType}. Your ${assetType} wallet will be deleted.`)
                    // setCashValue(Number(currWallet[assetType].cashValue))
                    // setAssetAmount(Number(currWallet[assetType].assetAmount))
                }
            }
        }

        if (!currWallet[assetType] && cashValue && assetType && transactionType === 'Sell') tErrors.push('You cannot sell this asset.')

        // if the assetamount is less than what they own, ask if they want to sell all their assets and delete their wallet
        // if (assetAmount > currWallet[assetType].assetAmount && transactionType === 'Sell'){
        //          if(window.confirm(`You have exceeded your wallet balance. Would you like to sell all ${currWallet[assetType].assetAmount} ${assetType} instead?`)){
        //                 setAssetAmount(currWallet[assetType].assetAmount)
        // } else {
        //         tErrors.push('Please exit and create a new transaction.')
        // }
        // }


        setTransactionErrors(tErrors)

    }, [assetType, transactionType, cashValue, card, walletAddress, assetAmount, allAssets])


    const [showEditModal, setShowEditModal] = useState(false)


    const cashValueCalculator = (amount, currPrice) => {
        let val = Number(amount) * Number(currPrice)
        return val
    };

    const amountCalculator = (cashValue, currPrice) => {
        let amt = Number(cashValue) / Number(currPrice)
        return amt
    };

    const captializeFirstLetter = (name) => {
        let split = name.split('');
        let res = split[0].toUpperCase();
        split.splice(0, 1, `${res}`)
        return split.join('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let transaction;

        if (!transactionErrors.length) {

            if (cashValue === null) {
                transaction = {
                    transaction_type: transactionType,
                    asset_amount: assetAmount,
                    cashValue: String(allAssets[assetType]?.usd * assetAmount),
                    asset_type: assetType,
                    card_id: card.id,
                    wallet_address: currWallet[assetType]?.wallet_address,
                    asset_price: String(allAssets[assetType]?.usd)
                    // user_id: currUser.id
                }
                // if they purchase with CASH amount
            } else if (assetAmount === null) {
                transaction = {
                    transaction_type: transactionType,
                    cash_value: cashValue,
                    asset_type: assetType,
                    asset_amount: String(cashValue / allAssets[assetType]?.usd),
                    card_id: card.id,
                    wallet_address: currWallet[assetType]?.wallet_address,
                    asset_price: String(allAssets[assetType]?.usd)
                }
            } else {
                transaction = {
                    transaction_type: transactionType,
                    asset_amount: assetAmount,
                    cashValue: cashValue,
                    asset_type: assetType,
                    card_id: card.id,
                    wallet_address: currWallet[assetType]?.wallet_address,
                    asset_price: String(allAssets[assetType]?.usd)

                }
            }


            let checkWallet = await dispatch(checkWalletThunk(assetType))
            console.log('back to the good ol console logs', checkWallet)

            if (checkWallet.wallet_address) {
                if (transactionType === 'Sell') {
                    if (Number(checkWallet.assetAmount) >= Number(assetAmount)) {

                        const newTransaction = await dispatch(createTransactionThunk(transaction))

                        const updatedWallet = await dispatch(updateWalletThunk(newTransaction.id))

                        if (!updatedWallet) {
                            window.alert('Pending transaction failed because you do not have enough assets to sell.')
                            setShowMain(false)
                            return
                        }


                        if (Number(updatedWallet.assetAmount) <= 0) {

                            setShowTransactionErrors(false)
                            window.alert(`You have sold all of your ${assetType} and the wallet will be deleted.`)
                            dispatch(deleteWalletThunk(updatedWallet.id, updatedWallet.assetType))
                        }
                    }
                } else if (transactionType === 'Buy') {

                    const newTransaction = await dispatch(createTransactionThunk(transaction))

                    await dispatch(updateWalletThunk(newTransaction.id))
                    setShowMain(false)

                }

            } else {

                const newWallet = await dispatch(createWalletThunk(checkWallet.assetType))
                console.log('new wallet after initial creation: ', newWallet)

                if (newWallet) {

                    console.log('hey hi new wallet here', newWallet)
                    const transaction2 = {
                        asset_amount: transaction.asset_amount,
                        transaction_type: transaction.transaction_type,
                        cash_value: transaction.cash_value,
                        asset_type: transaction.asset_type,
                        card_id: transaction.card_id,
                        wallet_address: newWallet.wallet_address,
                        asset_price: String(allAssets[assetType]?.usd)

                    }
                    const newTransaction = await dispatch(createTransactionThunk(transaction2))
                    console.log('newTransaction print line 470', newTransaction)
                    if (newTransaction) {
                        const updatedWallet = await dispatch(updateWalletThunk(newTransaction.id))
                        console.log('updatedWallet print line 473', updatedWallet)
                        if (Number(updatedWallet.assetAmount) <= 0) {

                            window.alert(`You are selling all of your ${assetType} balance and the wallet will be deleted.`)

                            dispatch(deleteWalletThunk(updatedWallet.id, updatedWallet.assetType))
                            setShowMain(false)

                            return

                        }
                        setShowMain(false)
                        history.push('/trade')
                    } else {
                        console.log('Transaction failed line 487: ', newTransaction)
                    }

                } else {
                    console.log('New wallet failed line 492: ', newWallet)
                }
            }
        } else {
            setShowTransactionErrors(true)
            return
        }
        history.push('/trade')
        setShowMain(false)
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteCardThunk(id))
                .then(() => dispatch(getCurrentUserCards()))
        }
    }

    const selectCardCloseModal = (dCard) => {
        setSelected(true)
        setCard(dCard)
    }


    if (!isLoaded) {
        return (
            <h1>LOADING. . .</h1>
        )
    }

    return isLoaded && (
        <div>
            <form id='transactions-form'>
                < div id='buy-sell-wrapper'>
                    <div id='buy-sell-convert'>
                        <div className='hover'
                            style={{ position: 'absolute', width: '33%', height: '10%' }}
                            onClick={() => setTransactionType("Buy")}
                        ></div>
                        <div className='hover'
                            style={{ position: 'absolute', width: '33%', height: '10%', left: '33%' }}
                            onClick={() => setTransactionType("Sell")}
                        ></div>
                        <div
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
                                    placeholder='$0'
                                    autoComplete='off'
                                    onChange={updateCashValue}
                                ></input>
                            </div>
                            <div className='convert-input-wrapper'>
                                <input
                                    type='number'
                                    id='input'
                                    placeholder='00.0000'
                                    autoComplete='off'
                                    onChange={updateAssetAmount}
                                ></input>
                                <div className='units-BTC'>
                                    {assetType ? symbols[assetType] : "C."}
                                </div>
                            </div>
                            <span id='buy-up-to'>You can buy up to $5,000.00</span>
                            <div className='one-time'>
                                <div className='hover-2'
                                    style={{ position: 'absolute', width: '230px', height: '42px', borderRadius: '3px' }}
                                    onClick={() => console.log('One Time Purchase')}
                                ></div>
                                <span id='cash-value-display'>{assetType ? `Cash value: $${(assetAmount * allAssets[assetType]?.usd).toFixed(2)}` : 'Waiting for asset type ...'}</span>
                                <i className="fa-solid fa-angle-down"
                                    style={{ marginLeft: '15px' }}
                                />
                            </div>
                        </div>
                        <div className='prices'>
                            <div className='hover-2'
                                style={{ position: 'absolute', height: '37px', width: '108px', borderRadius: '30px' }}
                                onClick={() => console.log('100')}
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

                    </div>
                    <div style={{ display: 'none' }}>
                        <input value={walletAddress}></input>
                    </div>

                    <div className='third'>
                        <div className='inside-third'>
                            <div className='bitcoin'>
                                <div className='hover-2'
                                    style={{ position: 'absolute', width: '90%', height: '55px', borderTopRightRadius: '7px', borderTopLeftRadius: '7px' }}
                                    onClick={() => setShowCryptoModal(true)}
                                ></div>
                                {/* ~~~~~~~~ Modal layer2: Select Asset to Purchase or Sell ~~~~~~~~ */}
                                {showCryptoModal && isLoaded && (
                                    <Modal onClose={() => setShowCryptoModal(false)}>
                                        <div id='crypto-list-container'>
                                            <div id='close-div' onClick={() => setShowCryptoModal(false)}>
                                                <img id='back-arrow-svg' src={backArrow} alt='back arrow' />
                                            </div>
                                            <div id='pay-with-modal-header'>
                                                <div id='selected-crypto'>{assetType ? `Selected: ${captializeFirstLetter(assetType)}` : "Select asset"}</div>
                                            </div>
                                            <div id='crypto-list-content'>
                                                {Object.keys(allAssets).map((crypto) => (
                                                    <div id='crypto-card' onClick={() => setAssetType(crypto)}>
                                                        {captializeFirstLetter(crypto)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </Modal>
                                )}

                                <div className='hover-2'
                                    style={{ position: 'absolute', width: '90%', height: '55px', borderBottomRightRadius: '7px', borderBottomLeftRadius: '7px', marginTop: '55px' }}
                                    onClick={() => setShowModal(true)}
                                >
                                </div>
                                {/* ~~~~~~~~ Modal layer3: Select the card you want to use ~~~~~~~~ */}
                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <div id='close-div' onClick={() => setShowModal(false)}>
                                            <img id='back-arrow-svg' src={backArrow} alt='back arrow' />
                                        </div>
                                        <div id='pay-with-modal-container'>
                                            <div id='pay-with-modal-header'>
                                                <span>Banking info</span>
                                            </div>
                                            <div id='pay-with-modal-content' className='select-card-loop'>
                                                {Object.values(currentCards).map((dCard) => (
                                                    <div id='dCard-card-wrapper' onClick={() => selectCardCloseModal(dCard)}>
                                                        {/* <div id='dCard-card-wrapper' className={selected ? 'selected-card' : 'unselected'} onClick={() => selected ? setSelected(false) : setSelected(true)}> */}
                                                        <div key={dCard.id} className='mapped-card-div-row-justify' >
                                                            <div>{dCard.cardType}</div>
                                                            <div id='card-info-div-col'>
                                                                <div id='card-bank-div'>{dCard.name}</div>
                                                                <div id='card-caption-overflow-wrap'>
                                                                    $5,000.00 buying limit per transaction. You'll get instant access to your assets.
                                                                </div>
                                                            </div>
                                                            <div id='mapped-card-right'>
                                                                <div id='last-four-div'>{dCard.lastFourDigits}</div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* ~~~~~~~~ Modal layer4: Edit card  ~~~~~~~~ */}
                                            {showEditModal && (
                                                <Modal onClose={() => setShowEditModal(false)} >
                                                    <div id='close-x-div' onClick={() => setShowEditModal(false)}>
                                                        <img id='add-card-cancel-button' src={closeX} alt='close' />
                                                    </div>
                                                    <EditCardForm setShowEditModal={setShowEditModal} card={card} />

                                                </Modal>
                                            )}

                                            <div id='pay-with-modal-footer'>
                                                <div id='add-payment-butt-div'>
                                                    <div id='add-payment-button' onClick={() => setShowCardModal(true)}>
                                                        <div id='changeToSVG'> + </div>
                                                        Add a payment method
                                                    </div>
                                                </div>

                                                {selected && (

                                                    <div id='auth-action-buttons'>
                                                        Selected Card: {card.cardType} {card.lastFourDigits}
                                                        <div id='edit-card' onClick={() => setShowEditModal(true)}>
                                                            <img src={edit} id='edit-pencil' alt='edit pencil' />
                                                        </div>
                                                        <div id='delete-card' onClick={() => deleteHandler(card.id)}>
                                                            <img src={trashCan} id='trash-can' alt='trash' />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* ~~~~~~~~ Modal layer5: Add a new card ~~~~~~~~ */}

                                            {showCardModal && (
                                                <Modal onClose={() => setShowCardModal(false)} >
                                                    <div id='close-x-div' onClick={() => setShowCardModal(false)}>
                                                        <img id='add-card-cancel-button' src={closeX} alt='close' />
                                                    </div>
                                                    <AddCardForm setShowCardModal={setShowCardModal} />
                                                </Modal>
                                            )}

                                        </div>
                                    </Modal>
                                )}

                                <div className='inner-bit'>
                                    <div className='bit-left'>
                                        <span>{transactionType}</span>
                                    </div>
                                    <div className='bit-mid'>
                                        {/* <img alt='bit logo' id='bit-logo' src={!assetType ? bitLogo : coinImgs[assetType]} /> */}
                                        <img alt='bit logo' id='bit-logo' src={bitLogo} />
                                        <div id='fix-display'>
                                            <span>{assetType ? `${symbols[assetType]} : ${(captializeFirstLetter(assetType))}` : 'Select asset type.'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='wells'>
                                <div className='inner-bit'>
                                    <div className='bit-left'>
                                        <span>Banking</span>
                                    </div>
                                    <div className='bit-mid'>
                                        <img alt='bit logo' id='bit-logo' src={card?.cardType === 'Visa' ? visaLogo : mastercardLogo} />
                                        <div id='fix-display2'>
                                            <span>{card ? `${card.cardType} ending in ${card.lastFourDigits}` : 'Select card.'}</span>
                                        </div>
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
                            >{transactionType} {assetType}</span>
                        </div>
                    </div>
                    <div className='fifth'>
                        <div className='fifth-inner'>
                            <span id='bal' className='five-left'>{assetType} balance</span>
                            <span id='btc' className='five-right'>{currWallet[assetType]?.assetAmount} ≈ {currWallet[assetType] ? '$' + cashValueCalculator(currWallet[assetType].assetAmount, allAssets[assetType]?.usd) : '?'}</span>
                        </div>
                    </div>
                </div >
            </form>

            {showTransactionErrors && (
                <Modal onClose={() => setShowTransactionErrors(false)} >
                    <div id='transaction-errors-modal' >
                        {transactionErrors.map((e, i) => {
                            return (
                                <div id='transaction-error-card'>
                                    <div id='tError-left'>

                                    </div>
                                    <div id='tError-right'>
                                        {e}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Modal>
            )}
        </div >
    )
}


export default BuySellPage;
