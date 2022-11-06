import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bitLogo from '../../aIMGS/Bitcoin.png'
import switchArrows from '../../aIMGS/arrows-vertical.svg'
import { deleteCardThunk, checkWalletThunk, createTransactionThunk, createWalletThunk, getCurrentUserCards, updateWalletThunk, updateCardThunk, loadAllWallets, deleteWalletThunk } from '../../store/session';
import { Modal } from '../../context/Modal';
import AddCardForm from '../Card/AddCardForm';
// import PayWithModal from '../Card/PayWithModal/PayWithModal';
import backArrow from '../../aIMGS/arrow-left.svg'
import trashCan from '../../aIMGS/trash-can.svg';
import closeX from '../../aIMGS/close.svg';
import edit from '../../aIMGS/edit.svg';
import './BuySellPage.css';
import '../Card/PayWithModal/paywithmodal.css';
import EditCardForm from '../Card/EditCardForm/EditCardForm';
import * as crypto from 'crypto';



const randomString = crypto.randomBytes(32).toString('hex');


const BuySellPage = () => {

    const currUser = useSelector(state => state.session.user)
    const currWallet = useSelector(state => state.session.wallets)
    const currentCards = useSelector(state => state.session.card);
    const allAssets = useSelector(state => state.assets.allAssets)

    const [showConvert, setShowConvert] = useState(false);
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
    const holdAssetPrice = allAssets[assetType]?.usd

    const updateTransactionType = (e) => setTransactionType(e.target.value);
    const updateAssetAmount = (e) => setAssetAmount(e.target.value);
    const updateCashValue = (e) => setCashValue(e.target.value);
    const updateAssetType = (e) => setAssetType(e.target.value);

    useEffect(() => {
        dispatch(loadAllWallets())
    }, [dispatch])

    useEffect(() => {
        dispatch(getCurrentUserCards())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])


    // useEffect for error handlers and watch for changes in state values
    useEffect(() => {
        const tErrors = [];
        if (!assetType.length || !Object.keys(allAssets).includes(assetType)) tErrors.push('Please select a valid asset type.')
        if (!transactionType.length) tErrors.push('Please select a transaction type: Buy or Sell.')
        if (cashValue > 5000) tErrors.push('You can only buy up to $5,000 per transaction.')
        if (cashValue <= 0) tErrors.push("Your transaction's cash value is invalid.")
        // if (transactionType === 'Sell' && currWallet[assetType]?.assetAmount < assetAmount) {
        //     tErrors.push(`"You can't sell what you don't have... Your ${assetType} balance is ${walletAddress.assetAmount}.`)
        // }
        if (!card) tErrors.push('Please select a card for this transaction.')


        setTransactionErrors(tErrors)

    }, [assetType, transactionType, cashValue, card, walletAddress, assetAmount, allAssets])

    // const [cardId, setCardId] = useState(null)
    const [name, setName] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cardType, setCardType] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [lastFourDigits, setLastFourDigits] = useState('');
    const [CVC, setCVC] = useState('');
    const [updateErrors, setUpdateErrors] = useState('');
    const [showUpdateErrors, setShowUpdateErrors] = useState('');
    const [showEditModal, setShowEditModal] = useState(false)


    // const updateName = (e) => setFirstName(e.target.value);
    // const updateLastName = (e) => setLastName(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateExpDate = (e) => setExpDate(e.target.value);
    const updateCardType = (e) => setCardType(e.target.value);
    const updatePostalCode = (e) => setPostalCode(e.target.value);
    const updateCardNumber = (e) => setCardNumber(e.target.value);
    const updateLastFourDigits = (e) => setLastFourDigits(e.target.value);
    const updateCVC = (e) => setCVC(e.target.value);



    // DATE VALIDATION VARIABLES
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    // today = mm + '/' + dd + '/' + yyyy;

    // ADD/EDIT CARD VALIDATION ERRORS
    useEffect(() => {
        const validNums = '0123456789'
        const vErrors = [];
        // if (firstName.length > 25 || firstName.length < 3) {
        //     vErrors.push('First name must be between 3 and 25 characters. ')
        // }
        if (name.length > 40 || name.length < 2) {
            vErrors.push('Name on card must be bewtween 3 and 40 characters.')
        }
        if (!name.includes(" ")) vErrors.push('Please include first and last name.')
        // let nameCheck = currUser.firstName + " " + currUser.lastName
        // if (name !== nameCheck) vErrors.push('Name on card must match name on the account.')

        if (expDate.length !== 7) vErrors.push('Expiration date fromat must be: MM/YYYY')
        let year = expDate.slice(-4)
        let month = expDate.slice(0, 2)
        if (year.length > 4 || month.length > 2) vErrors.push('Invalid expiration date.')
        if (Number(month) < Number(mm) && Number(year) < Number(yyyy)) vErrors.push('Your card is expired.')

        // potential logic instead of having two form fields
        // if (cardNumber[0] === '4') setCardType('Visa')
        // else if (cardNumber[0] === '5') setCardType('MasterCard')
        // if (cardNumber[0] !== '5' || cardNumber[0] !-- '4') push('invalid card type')
        if (cardType.length > 10 || cardType.length < 4) vErrors.push('Invalid card type.')
        if (postalCode.length !== 5) vErrors.push('Postal code must be 5 digits.')
        if (cardNumber.length !== 16) vErrors.push('Invalid card number.')
        if (lastFourDigits !== cardNumber.slice(-4)) vErrors.push('Card information does not match.')
        if (CVC.length !== 3 || CVC.includes(!validNums)) vErrors.push('Please enter the correct CVC.')

        setUpdateErrors(vErrors)

    }, [name, expDate, cardNumber, cardType, postalCode, lastFourDigits, CVC, card, holdAssetPrice, mm, yyyy])

    const handleUpdateCardSubmit = async (e) => {
        e.preventDefault();
        setShowUpdateErrors(true)

        if (!updateErrors.length) {
            const data = {
                name: name,
                card_type: cardType,
                exp_date: expDate,
                postal_code: postalCode,
                card_number: cardNumber,
                last_four_digits: lastFourDigits,
                cvc: CVC,
                user_id: currUser.id
            }
            console.log('Handling submit')
            // handle by assigning to session.user
            let updatedCard = await dispatch(updateCardThunk(data, card.id))
            // if (newCard) assign newCard to User
            if (updatedCard) {
                setShowUpdateErrors(false)
                dispatch(getCurrentUserCards())
                setShowEditModal(false)
                // history.push('/') // redirect to home for now, change to user profile when created
            }

            console.log('What the huhhhh?? Card form failure')
        }
    }

    const cashValueCalculator = (amount, currPrice) => {
        let val = Number(amount) * Number(currPrice)
        return val
    };

    const amountCalculator = (cashValue, currPrice) => {
        let amt = Number(cashValue) / Number(currPrice)
        return amt
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowTransactionErrors(true)
        // setWalletAddress(currWallet[assetType].wallet_address)



        let value = cashValueCalculator(assetAmount, holdAssetPrice);
        let amount = amountCalculator(cashValue, holdAssetPrice)

        // let test = '0.9291029'
        // console.log('TESTING TESTING TESTINGGGGG', Number(test))
        let transaction;
        console.log('TRANSACTION ASSET AMOUNT/TYPE:', assetAmount, assetType)
        console.log('TRANSACTION ASSET VALUEEE:', value, amount)
        // let value = assetAmount * allAssets[`${assetType}`]
        if (!transactionErrors.length) {

            // console.log('checking the wallet response',checkWallet.wallet_address)


            // if (assetAmount === null && assetType) setAssetAmount(Number(cashValue) / holdAssetPrice)
            // if (cashValue === null && assetType) setCashValue(Number(assetAmount) * holdAssetPrice)

            // if (assetAmount) {
            //     setAssetAmount(String(assetAmount))
            // } else {
            //     setAssetAmount(String(amount))
            // };

            // if (cashValue) {
            //     setCashValue(String(cashValue))
            // } else {
            //     setCashValue(String(value))
            // };

            if (cashValue === null) {
                transaction = {
                    transaction_type: transactionType,
                    asset_amount: assetAmount,
                    cashValue: String(allAssets[assetType].usd * assetAmount),
                    asset_type: assetType,
                    card_id: card.id,
                    wallet_address: currWallet[assetType]?.wallet_address,
                    // user_id: currUser.id
                }
            } else if (assetAmount === null) {
                transaction = {
                    transaction_type: transactionType,
                    cash_value: cashValue,
                    asset_type: assetType,
                    asset_amount: String(cashValue / allAssets[assetType].usd),
                    card_id: card.id,
                    wallet_address: currWallet[assetType]?.wallet_address,
                }
            } else {
                transaction = {
                    transaction_type: transactionType,
                    asset_amount: assetAmount,
                    cashValue: cashValue,
                    asset_type: assetType,
                    card_id: card.id,
                    wallet_address: currWallet[assetType]?.wallet_address
                }
            }

            //save
            // const transaction2 = {
            //     transaction_type: transactionType,
            //     asset_amount: (assetAmount ? +assetAmount : +amount),
            //     cash_value: (cashValue ? +cashValue : +value),
            //     asset_type: assetType,
            //     card_id: card.id,
            //     wallet_address: randomString,
            //     // user_id: currUser.id
            // } 
            // // experiment
            // if (currWallet[assetType] === transaction.asset_type) {
            //     // run new transaction and update wallet route using transaction data.
            //     // 1) dispatch create transaction thunk
            //     // 2) query for existing wallet using transaction data in same create T route and
            //     //  update using T form data
            //     // Use const transaction
            // } else {
            //     // run new transaction2, create and update wallet
            //     // 1) dispatch create transaction thunk
            //     // 2) in new transaction thunk, create wallet using transaction2 data
            //     // 3) therefore wallet is up to date
            // }
            // //experiment end
            //save

            let checkWallet = await dispatch(checkWalletThunk(assetType))
            if (checkWallet) {
                console.log('Address side pleaseee, if you see this you WINNINGG :D')
                const newTransaction = await dispatch(createTransactionThunk(transaction))
                console.log('OOOOGGGAAABOOOGGAAA', newTransaction.id)
                console.log('OOOOGGGAAABOOOGGAAA~~~~~~~~~', newTransaction.amount)
                console.log('raw transaction:', transaction)
                console.log('NEW TRANSACTION:', newTransaction)
                const updatedWallet = await dispatch(updateWalletThunk(newTransaction.id))
                await dispatch(loadAllWallets())
                console.log('CHECKING existing WALLET udpate response : ', updatedWallet)
                console.log('CHECKING updatedx wallet assetAmount: ', updatedWallet.assetAmount)
                if (Number(updatedWallet.assetAmount) < 0) {
                    console.log('Delete if statement has been hit')
                    dispatch(deleteWalletThunk(updatedWallet.id, updatedWallet.assetType))
                }

            } else {
                console.log("create new wallet SIDE HITTING :||||")
                // const wallet = {
                //     asset_type: assetType,
                //     user_id: currUser.id,
                //     asset_amount: 0,
                //     address: randomString,
                //     id: 1
                // }
                const newWallet = await dispatch(createWalletThunk(assetType))
                console.log('WAIT A MINUTE IN NEW WALLET FRONTEND~~~~~~~~', newWallet)
                if (newWallet) {

                    console.log('printing newWallet stuff cuz what is going on:', newWallet['wallet'].wallet_address)
                    console.log('printing newWallet stuff cuz what is going on:', newWallet['id'])
                    console.log('printing newWallet stuff cuz what is going on:', newWallet['asset_type'])
                    console.log('printing newWallet stuff cuz what is going on:', newWallet.id)
                    const transaction2 = {
                        asset_amount: transaction.asset_amount,
                        transaction_type: transaction.transaction_type,
                        cash_value: transaction.cash_value,
                        asset_type: transaction.asset_type,
                        card_id: transaction.card_id,
                        wallet_address: newWallet['wallet'].wallet_address
                    }
                    const newTransaction = await dispatch(createTransactionThunk(transaction2))
                    if (newTransaction) {


                        const updatedWallet = await dispatch(updateWalletThunk(newTransaction['id']))
                        if (Number(updatedWallet.assetAmount) < 0.0000000000) {

                            // if (window.confirm(
                            //     `You are attempting to sell more than you own, which would be nice, but is not allowed.\n Would you like to sell all ${updatedWallet.assetType} ${updatedWallet.assetAmount}?`
                            // )) {
                            console.log('Delete if statement has been hit')
                            dispatch(deleteWalletThunk(updatedWallet.id, updatedWallet.assetType))
                            // }
                        }
                    }
                    // window.alert('TRANSACTION WAS UNSUCCESSFUL')
                }
                // window.alert('Failed to create new wallet.')

                // Do i pass in transaction from form or response from createdTransactionThunk?? 
            }

        }
        // await dispatch(loadAllWallets())
        // console.log('CAN I DO THIS?? ', Number(currWallet[assetType].assetAmount))
        // if (Number(currWallet[assetType].assetAmount) <= 0){
        //     const deletedWalletMessage = dispatch(deleteWalletThunk(currWallet[assetType].id))
        //     if (deletedWalletMessage) console.log('WALLET HAS BEEN DELETED BEACUSE IT WAS EMPTY')
        // }
        // window.alert('Transaction Failed :( Please try again')
    }


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteCardThunk(id))
                .then(() => dispatch(getCurrentUserCards()))
        }
    }

    //   const selectedDiv = () => selected ? 'selected-card' : 'unselected-card'
    const selectCardCloseModal = (dCard) => {
        // selected-card-loop
        // const selCard = document.getElementsByClassName('select-card-loop')
        // selCard[dCard.id].style.display = 'none'
        setSelected(true)
        setCard(dCard)
        // setShowModal(false)
    }

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
                                    placeholder='$0'
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
                        <div className='switch'
                            onClick={() => handleConvert()}
                        > <img id='switch-arrows' alt='switch' src={switchArrows} style={{ color: 'white' }} />
                            {/* <i className="fa-solid fa-repeat"
                        style={{ color: 'white' }}
                    /> */}
                        </div>
                        <div className='BTC'>BTC</div>
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
                                                <span>Select asset</span>
                                            </div>
                                            <div id='crypto-list-content'>
                                                {Object.keys(allAssets).map((crypto) => (
                                                    <div id='crypto-card' onClick={() => setAssetType(crypto)}>
                                                        {crypto}
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
                                {/* ~~~~~~~~ Modal layer3: Select the card you want to use ~~~~~~~~ */}
                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <div id='close-div' onClick={() => setShowModal(false)}>
                                            <img id='back-arrow-svg' src={backArrow} alt='back arrow' />
                                        </div>
                                        {/* <PayWithModal setCard={setCard}, card={card}/> */}
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
                                                    {/* <EditCardForm /> */}
                                                    <div id='add-card-form-container'>
                                                        <div id='add-card-form-header'>
                                                            <div id='header-text'>
                                                                <h3>Link Your Card</h3>
                                                            </div>
                                                            {/* <div id='close-x-div' onClick={handleCancel}>
                                                                                    <img id='add-card-cancel-button' src={closeX} alt='close' />
                                                                                 </div> */}
                                                        </div>
                                                        <form onSubmit={handleUpdateCardSubmit}>
                                                            <div id='add-card-form-content'>
                                                                <div id='card-disclaimer'>
                                                                    We do not accept credit cards, prepaid cards, or business cards.
                                                                </div>
                                                                {/*-------  Name  -------*/}
                                                                <div className='label-and-input'>
                                                                    <label id='fName-label'>Name on card</label>
                                                                    <input
                                                                        className='wide-input'
                                                                        type='text'
                                                                        placeholder={card.name}
                                                                        value={name}
                                                                        onChange={updateName}
                                                                        required
                                                                    >
                                                                    </input>
                                                                </div>
                                                                {/*-------  Card number  -------*/}
                                                                <div className='label-and-input'>
                                                                    <label id='cardNumber-label'>Card Number</label>
                                                                    <input
                                                                        id='cardNumber-input'
                                                                        className='wide-input'
                                                                        type='text'
                                                                        placeholder={`XXXX XXXX XXXX ${card.lastFourDigits}`}
                                                                        value={cardNumber}
                                                                        onChange={updateCardNumber}
                                                                        required
                                                                    >
                                                                        {/* <div>
                                                                                                <img src={cardNumber[0] === 4 ? "Visa" : "Mastercard"} />
                                                                                            </div> */}
                                                                    </input>
                                                                </div>
                                                                <div id='exp-cvc-zip'>
                                                                    {/*-------  Expiration Date  -------*/}

                                                                    <div className='label-and-input'>
                                                                        <label id='expDate-label'>Expiration</label>
                                                                        <input
                                                                            className='fragmented-input'
                                                                            type='text'
                                                                            placeholder='MM/YYYY'
                                                                            value={expDate}
                                                                            onChange={updateExpDate}
                                                                            required
                                                                        >
                                                                        </input>
                                                                    </div>
                                                                    {/*-------  CVC  -------*/}

                                                                    <div className='label-and-input'>
                                                                        <label id='cvc-label'>CVC</label>
                                                                        <input
                                                                            className='fragmented-input'
                                                                            type='text'
                                                                            placeholder='CVC'
                                                                            value={CVC}
                                                                            onChange={updateCVC}
                                                                            required
                                                                        >
                                                                        </input>
                                                                    </div>
                                                                    {/*-------  Postal Code -------*/}
                                                                    <div className='label-and-input'>
                                                                        <label id='postal-label'>Postal Code</label>
                                                                        <input
                                                                            className='fragmented-code'
                                                                            type='text'
                                                                            placeholder='Postal code'
                                                                            value={postalCode}
                                                                            onChange={updatePostalCode}
                                                                            required
                                                                        >
                                                                        </input>
                                                                    </div>
                                                                </div>
                                                                <div id='type-digit-div'>
                                                                    {/*-------  Card Type  -------*/}
                                                                    <div className='label-and-input'>
                                                                        <label id='cardType-label'>Card Type</label>
                                                                        <input
                                                                            className='type-digit-inputs'
                                                                            type='text'
                                                                            placeholder={card.cardType}
                                                                            value={cardType}
                                                                            onChange={updateCardType}
                                                                            required
                                                                        >
                                                                        </input>
                                                                    </div>
                                                                    {/*-------  Last four  -------*/}

                                                                    <div className='label-and-input'>
                                                                        <label id='lastFour-label'>Last four digits</label>
                                                                        <input
                                                                            className='type-digit-inputs'
                                                                            type='text'
                                                                            placeholder={card.lastFourDigits}
                                                                            value={lastFourDigits}
                                                                            onChange={updateLastFourDigits}
                                                                            required
                                                                        >
                                                                        </input>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id='add-card-butt-div'>
                                                                <div id='terms-div'>
                                                                    <span className='debit-terms'>By editing your card, you still agree to the</span>
                                                                    <span className='debit-terms'> credit/debit card terms.</span>

                                                                </div>
                                                                <div id='addCard-div'>
                                                                    <button id='add-card-button' type='submit'>Update Card</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        {showUpdateErrors &&
                                                            <div>
                                                                {updateErrors.map((e, i) => {
                                                                    return (
                                                                        <div key={i}>
                                                                            {e}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        }

                                                    </div>
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

                                            {showCardModal && isLoaded && (
                                                <Modal onClose={() => setShowCardModal(false)} >
                                                    <div id='close-x-div' onClick={() => setShowCardModal(false)}>
                                                        <img id='add-card-cancel-button' src={closeX} alt='close' />
                                                    </div>
                                                    <AddCardForm />
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
                                        <img alt='bit logo' id='bit-logo' src={bitLogo} />
                                        <span>{assetType ? assetType.toUpperCase() : 'Select asset type.'}</span>
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
                                        <span>Banking</span>
                                    </div>
                                    <div className='bit-mid'>
                                        <i id='wells-logo' className="fa-solid fa-building-columns" />
                                        <span>{card ? `${card.cardType} XXXX XXXX XXXX ${card.lastFourDigits}` : 'Select card.'}</span>
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
                <Modal onClose = {() => setShowTransactionErrors(false)} >
                    <div id='close-x-div' onClick={() => setShowTransactionErrors(false)}>
                        <img id='add-card-cancel-button' src={closeX} alt='close' />
                    </div>
                    <div  >
                        {transactionErrors.map((e, i) => {
                            return (
                                <div>
                                    {e}
                                </div>
                            )
                        })}
                    </div>
                </Modal>

            )
            }

        </div >


    )


}


export default BuySellPage;
