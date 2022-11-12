import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bitLogo from '../../aIMGS/Bitcoin.png'
import switchArrows from '../../aIMGS/arrows-vertical.svg'
import { deleteCardThunk, checkWalletThunk, createTransactionThunk, createWalletThunk, getCurrentUserCards, updateWalletThunk, updateCardThunk, loadAllWallets, deleteWalletThunk, createCardThunk } from '../../store/session';
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
import { Redirect, useHistory } from 'react-router-dom';
import * as coinImgs from './cryptoImgData.js'
import visaLogo from '../../aIMGS/visa-logo.png'
import mastercardLogo from '../../aIMGS/mastercard.png'

//https://icons.iconarchive.com/icons/cjdowner/cryptocurrency/icons-390.jpg

const randomString = crypto.randomBytes(32).toString('hex');


const BuySellPage = ({setShowMain}) => {
    const coinImg = {
        "apecoin": "https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1647476455",
        "avalanche-2": "https://assets.coingecko.com/coins/images/12559/thumb/coin-round-red.png?1604021818",
        "binancecoin": "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850",
        "bitcoin": "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
        "binance-usd": "https://assets.coingecko.com/coins/images/9576/thumb/BUSD.png?1568947766",
        "cardano": "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860",
        "dogecoin": "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png?1547792256",
        "ethereum": "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
        "eth2-staking-by-poolx": "https://assets.coingecko.com/coins/images/13853/thumb/5fc5b05df7b4c20006fb9fcb_eth_2.0-01.png?1612411843",
        "litecoin": "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png?1547033580",
        "matic-network": "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
        "near": "https://assets.coingecko.com/coins/images/10365/thumb/near_icon.png?1601359077",
        "polkadot": "https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png?1639712644",
        "ripple": "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731",
        "shiba-inu": "https://assets.coingecko.com/coins/images/11939/thumb/shiba.png?1622619446",
        "solana": "https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1640133422",
        "stellar": "https://assets.coingecko.com/coins/images/100/thumb/Stellar_symbol_black_RGB.png?1552356157",
        "tether": "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
        "tron": "https://assets.coingecko.com/coins/images/1094/thumb/tron-logo.png?1547035066",
        "uniswap": "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
        "usd-coin": "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    }

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
    const walletKeys = Object.keys(currWallet)

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

    // const [cardId, setCardId] = useState(null)
    const [name, setName] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cardType, setCardType] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [lastFourDigits, setLastFourDigits] = useState('');
    const [CVC, setCVC] = useState('');

    const [updateErrors, setUpdateErrors] = useState('');
    const [showUpdateErrors, setShowUpdateErrors] = useState(false);
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
            vErrors.push('* Name on card must be bewtween 3 and 40 characters.')
        }
        if (!name.includes(" ")) vErrors.push('* Please include first and last name.')
        // let nameCheck = currUser.firstName + " " + currUser.lastName
        // if (name !== nameCheck) vErrors.push('Name on card must match name on the account.')

        if (expDate.length !== 7) vErrors.push('* Please enter expiration date in this format: MM/YYYY')
        let year = expDate.slice(-4)
        let month = expDate.slice(0, 2)
        // if (year.length > 2 || month.length > 2) vErrors.push('* Invalid expiration date. Required format: MM/YY')
        // if (Number(month) < Number(mm) && Number(year) < Number(yyyy)) vErrors.push('*Your card is expired.')
        if (+year <= 2021 && +month > 11) vErrors.push('Invalid year!')


        // potential logic instead of having two form fields
        // if (cardNumber[0] === '4') setCardType('Visa')
        // else if (cardNumber[0] === '5') setCardType('MasterCard')
        // if (cardNumber[0] !== '5' || cardNumber[0] !-- '4') push('invalid card type')
        if (cardType.length > 10 || cardType.length < 4) vErrors.push('* Invalid card type.')
        if (postalCode.length !== 5) vErrors.push('* Postal code must be 5 digits.')
        if (cardNumber.length !== 16) vErrors.push('* Invalid card number.')
        if (lastFourDigits !== cardNumber.slice(-4)) vErrors.push('* Card information does not match.')
        if (CVC.length !== 3 || CVC.includes(!validNums)) vErrors.push('* Please enter the correct CVC.')



        setUpdateErrors(vErrors)

        if (!vErrors.length){
            setShowUpdateErrors(false)
        }
        
    }, [name, expDate, cardNumber, cardType, postalCode, lastFourDigits, CVC, card, holdAssetPrice ])

    const handleUpdateCardSubmit = async (e) => {
        e.preventDefault();
        if (updateErrors.length){
            setShowUpdateErrors(true)
        } else {
            setShowUpdateErrors(false)
            const data = {
                name: String(name),
                card_type: String(cardType),
                exp_date: String(expDate),
                postal_code: String(postalCode),
                card_number: String(cardNumber),
                last_four_digits: String(lastFourDigits),
                cvc: String(CVC)
            }

            // handle by assigning to session.user
            await dispatch(deleteCardThunk(card.id))
            let updatedCard = await dispatch(createCardThunk(data))
            // if (newCard) assign newCard to User
            if (updatedCard) {
                setShowUpdateErrors(false)
                dispatch(getCurrentUserCards())
                setShowEditModal(false)
                return
                // history.push('/') // redirect to home for now, change to user profile when created
            }


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

    const captializeFirstLetter = (name) => {
        let split = name.split('');
        let res = split[0].toUpperCase();
        split.splice(0, 1, `${res}`)
        return split.join('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setWalletAddress(currWallet[assetType].wallet_address)
        let value = cashValueCalculator(assetAmount, holdAssetPrice);
        let amount = amountCalculator(cashValue, holdAssetPrice)


        // let test = '0.9291029'
        // 
        let transaction;


        // let value = assetAmount * allAssets[`${assetType}`]
        if (!transactionErrors.length) {
            // setShowTransactionErrors(true)

            // 
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

            // if they purchase using a crypto AMOUNT
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
                // if somehow it passes through both conditionals above -> somehow it was don't really know how but figure it out later
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
            console.log('back to the good ol console logs',checkWallet)

            if (checkWallet.wallet_address) {
                if (transactionType === 'Sell') {
                    if (Number(checkWallet.assetAmount) >= Number(assetAmount)) {




                        const newTransaction = await dispatch(createTransactionThunk(transaction))




                        const updatedWallet = await dispatch(updateWalletThunk(newTransaction.id))
                        // await dispatch(loadAllWallets())
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
                    // await dispatch(loadAllWallets())
                    setShowMain(false)


                    // if (Number(updatedWallet.assetAmount) <= 0) {
                    //     
                    //     dispatch(deleteWalletThunk(updatedWallet.id, updatedWallet.assetType))
                    // }
                }
                // window.alert('Transaction Failed :( Existing balance issue.')
                // return
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
                    console.log('newTransaction print line 470',newTransaction)
                    if (newTransaction) {
                        const updatedWallet = await dispatch(updateWalletThunk(newTransaction.id))
                        console.log('updatedWallet print line 473',updatedWallet)
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
                    // window.alert('TRANSACTION WAS UNSUCCESSFUL')
                    // setShowTransactionErrors(false)
                } else {
                    console.log('New wallet failed line 492: ', newWallet)
                }
            }
        } else {
            setShowTransactionErrors(true)
            return
        }
        // await dispatch(loadAllWallets())
        // 
        // if (Number(currWallet[assetType].assetAmount) <= 0){
        //     const deletedWalletMessage = dispatch(deleteWalletThunk(currWallet[assetType].id))
        //     if (deletedWalletMessage) 
        // }
        // window.alert('Transaction Failed :( Please try again')
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

    // const handleConvert = () => {
    //     const inputDiv = document.getElementsByClassName('input-wrapper');
    //     const convertDiv = document.getElementsByClassName('convert-input-wrapper');
    //     const btcText = document.getElementsByClassName('BTC');
    //     const cover = document.getElementsByClassName('cover');

    //     if (!showConvert) {
    //         inputDiv[0].style.display = 'none';
    //         inputDiv[0].style.zIndex = '-1';
    //         convertDiv[0].style.display = 'flex';
    //         convertDiv[0].style.zIndex = '1'
    //         btcText[0].innerText = 'USD'
    //         for (let i = 0; i < 3; i++) {
    //             cover[i].style.zIndex = '100';
    //         }
    //         setShowConvert(true);
    //     } else {
    //         inputDiv[0].style.display = 'flex';
    //         inputDiv[0].style.zIndex = '1';
    //         convertDiv[0].style.display = 'none';
    //         convertDiv[0].style.zIndex = '-1'
    //         btcText[0].innerText = 'BTC'
    //         for (let i = 0; i < 3; i++) {
    //             cover[i].style.zIndex = '-1';
    //         }
    //         setShowConvert(false);
    //     }
    // }

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
                        {/* <div className='switch'>
                            <img id='switch-arrows' alt='switch' src={switchArrows} style={{ color: 'white' }} />
                        </div> */}
                        {/* <div className='BTC'>Crypto</div> */}
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
                                                {/* {assetType && (
                                                    <div id='selected-crypto'>Selected cryptocurrency: {captializeFirstLetter(assetType)}</div>
                                                )} */}
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
                                    // onClick={() => 
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
                                                    <EditCardForm setShowEditModal={setShowEditModal} card={card}/>
                                                    
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
                                        {/* THIS ASSET TYPE NEEDS TO UPDATE WITH WHATEVER IS SELECTED FROM THE MODAL */}
                                        {/* ASK ALEX ABOUT TAGS MODAL AND SETTING THAT STUFF */}

                                    </div>
                                    {/* <div className='bit-right'>
                                        <i className="fa-solid fa-angle-right" />
                                    </div> */}
                                </div>
                            </div>
                            <div className='wells'>
                                <div className='inner-bit'>
                                    <div className='bit-left'>
                                        <span>Banking</span>
                                    </div>
                                    <div className='bit-mid'>
                                        <img alt='bit logo' id='bit-logo' src={cardType === 'Visa' ? visaLogo : mastercardLogo} />
                                        <div id='fix-display2'>
                                            <span>{card ? `${card.cardType} ending in ${card.lastFourDigits}` : 'Select card.'}</span>
                                        </div>
                                    </div>
                                    {/* <div className='bit-right'>
                                        <i className="fa-solid fa-angle-right" />
                                    </div> */}
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

            )
            }

        </div >


    )


}


export default BuySellPage;
