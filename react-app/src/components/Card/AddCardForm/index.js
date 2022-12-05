import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createCardThunk, getCurrentUserCards } from '../../../store/session';
// import closeX from '../../../aIMGS/close.svg'
import './AddCardForm.css'

const AddCardForm = ({setShowCardModal}) => {
    const currUser = useSelector(state => state.session.user)

    // const history = useHistory();
    const dispatch = useDispatch();
    // const params = useParams();

    const [name, setName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cardType, setCardType] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [lastFourDigits, setLastFourDigits] = useState('');
    const [CVC, setCVC] = useState('');
    const [errors, setErrors] = useState('');
    const [showErrors, setShowErrors] = useState('');

    const [showModal, setShowModal] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    // const updateName = (e) => setFirstName(e.target.value);
    // const updateLastName = (e) => setLastName(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateExpDate = (e) => setExpDate(e.target.value);
    const updateCardType = (e) => setCardType(e.target.value);
    const updatePostalCode = (e) => setPostalCode(e.target.value);
    const updateCardNumber = (e) => setCardNumber(e.target.value);
    const updateLastFourDigits = (e) => setLastFourDigits(e.target.value);
    const updateCVC = (e) => setCVC(e.target.value);

    useEffect(() => {
        dispatch(getCurrentUserCards())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const [nameErr, setNameErr] = useState('');
    const splitNameArr = name?.split(" ")
    const [cardNumberErr, setCardNumberErr] = useState('');
    const [cardTypeErr, setCardTypeErr] = useState('');
    const [postalErr, setPostalErr] = useState('');
    const [expDateErr, setExpDateErr] = useState('');
    const [lastFourErr, setLastFourErr] = useState('');
    const [cvcErr, setCvcErr] = useState('');

    // set card inputs' error class
    const [nameErrClass, setNameErrClass] = useState('card-input-invalid');
    const [cardNumErrClass, setCardNumErrClass] = useState('card-input-invalid');
    const [typeErrClass, setTypeErrClass] = useState('card-input-invalid');
    const [postalErrClass, setPostalErrClass] = useState('card-input-invalid');
    const [dateErrClass, setDateErrClass] = useState('card-input-invalid');
    const [lastFourErrClass, setLastFourErrClass] = useState('card-input-invalid');
    const [cvcErrClass, setCvcErrClass] = useState('card-input-invalid');

    useEffect(() => {
        let newEditCheckArr = [];

        // name check
        if (name.length > 40 || name.length < 2) {
            setNameErr('* Full name must be between 3 and 40 characters.');
            newEditCheckArr.push(nameErr);
            showErrors ? setNameErrClass('card-input-invalid') : setNameErrClass('valid-input');
        } else if (!name.includes(" ")) {
            setNameErr('* First AND last name required.');
            newEditCheckArr.push(nameErr);
            showErrors ? setNameErrClass('card-input-invalid') : setNameErrClass('valid-input');
        } else if (splitNameArr.length > 2) {
            setNameErr('* Only include first and last name as seen on your card.');
            newEditCheckArr.push(nameErr);
            showErrors ? setNameErrClass('card-input-invalid') : setNameErrClass('valid-input');
        } else {
            setNameErr('');
            setNameErrClass('valid-input');
        }

        // cardNum check
        const validNums = '0123456789';
        const isNum = (val) => {
            if (/^\d+$/.test(val)) return true
            else return false;
        }
        console.log(isNum(validNums))
        console.log(cardType.toLowerCase())

        if (cardNumber.length !== 16) {
            setCardNumberErr('* Invalid card number length.');
            newEditCheckArr.push(cardNumberErr);
            showErrors ? setCardNumErrClass('card-input-invalid') : setCardNumErrClass('valid-input');
        } else if (!isNum(cardNumber)) {
            setCardNumberErr('* Invalid! Card number must only include digits 0 - 9.')
            newEditCheckArr.push(cardNumberErr);
            showErrors ? setCardNumErrClass('card-input-invalid') : setCardNumErrClass('valid-input');
        } else {
            setCardNumberErr('');
            setCardNumErrClass('valid-input');
        }

        // cardType check
        if (cardType.length < 4 || cardType.length > 10) {
            setCardTypeErr('* Invalid card type length.');
            newEditCheckArr.push(cardTypeErr);
            showErrors ? setTypeErrClass('card-input-invalid') : setTypeErrClass('valid-input');
        } else if ((cardType?.toLowerCase() !== 'visa' && cardType?.toLowerCase() !== 'mastercard')) {
            setCardTypeErr('* Only Mastercard or Visa.');
            newEditCheckArr.push(cardTypeErr);
            showErrors ? setTypeErrClass('card-input-invalid') : setTypeErrClass('valid-input');
        } else if (isNum(cardType)) {
            setCardTypeErr("* Invalid card type (No #'s");
            newEditCheckArr.push(cardTypeErr);
            showErrors ? setTypeErrClass('card-input-invalid') : setTypeErrClass('valid-input');
        } else {
            setCardTypeErr('');
            setTypeErrClass('valid-input');
        }


        // postal code check
        if (postalCode.length !== 5) {
            setPostalErr('* USA Only (5 digits).')
            newEditCheckArr.push(postalErr);
            showErrors ? setPostalErrClass('card-input-invalid') : setPostalErrClass('valid-input');
        } else if (!isNum(postalCode)) {
            setPostalErr('* USA Only (5 digits).');
            newEditCheckArr.push(postalErr);
            showErrors ? setPostalErrClass('card-input-invalid') : setPostalErrClass('valid-input');
        } else {
            setPostalErr('');
            setPostalErrClass('valid-input');
        }

        // date check
        let split = expDate.split('/').join('')
        console.log(split, 'spli', expDate.split('/'))
        // using moment.js
        // TODO tododododo
        let year = expDate.slice(-4)
        let month = expDate.slice(0, 2)
        if (expDate.length !== 7) {
            setExpDateErr('* MM/YYYY');
            newEditCheckArr.push(expDateErr);
            showErrors ? setDateErrClass('card-input-invalid') : setDateErrClass('valid-input');
        } else if (year.length > 4 || month.length > 2) {
            setExpDateErr('* MM/YYYY!');
            newEditCheckArr.push(expDateErr);
            showErrors ? setDateErrClass('card-input-invalid') : setDateErrClass('valid-input');
        } else if (+year < 2022) {
            if (+month < 12) {
                setExpDateErr('* Expired!');
                newEditCheckArr.push(expDateErr);
                showErrors ? setDateErrClass('card-input-invalid') : setDateErrClass('valid-input');
            }
        } else if (!isNum(split)) {
            setExpDateErr('* Invalid')
            newEditCheckArr.push(expDateErr);
            showErrors ? setDateErrClass('card-input-invalid') : setDateErrClass('valid-input');
        } else {
            setExpDateErr('');
            setDateErrClass('valid-input');
        }

        //lastFour check
        if (lastFourDigits.length !== 4) {
            setLastFourErr('* dude.. last FOUR.')
            newEditCheckArr.push(lastFourErr);
            showErrors ? setLastFourErrClass('card-input-invalid') : setLastFourErrClass('valid-input');
        } else if (lastFourDigits !== cardNumber.slice(-4)) {
            setLastFourErr('* Does not match.');
            newEditCheckArr.push(lastFourErr);
            showErrors ? setLastFourErrClass('card-input-invalid') : setLastFourErrClass('valid-input');
        } else if (!isNum(lastFourDigits)) {
            setLastFourErr('* Numbers only.');
            newEditCheckArr.push(lastFourErr);
            showErrors ? setLastFourErrClass('card-input-invalid') : setLastFourErrClass('valid-input');
        } else {
            setLastFourErr('');
            setLastFourErrClass('valid-input');
        }

        // cvc check
        if (CVC.length !== 3) {
            setCvcErr('* Invalid length.')
            newEditCheckArr.push(cvcErr);
            showErrors ? setCvcErrClass('card-input-invalid') : setCvcErrClass('valid-input');
        } else if (!isNum(CVC)) {
            setCvcErr('* Nums only.');
            newEditCheckArr.push(cvcErr);
            showErrors ? setCvcErrClass('card-input-invalid') : setCvcErrClass('valid-input');
        } else {
            setCvcErr('');
            setCvcErrClass('valid-input');
        }

        setErrors(newEditCheckArr);

    }, [name, cardNumber, cardType, expDate, postalCode, lastFourDigits, CVC, showErrors])


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (errors.length){
            setShowErrors(true)
        }

        if (!errors.length) {
            setShowErrors(false)
            const card = {
                name: name,
                card_type: cardType,
                exp_date: expDate,
                postal_code: postalCode,
                card_number: cardNumber,
                last_four_digits: lastFourDigits,
                cvc: CVC,
                user_id: currUser.id
            }

            // handle by assigning to session.user
            let newCard = await dispatch(createCardThunk(card))
            // if (newCard) assign newCard to User
            if (newCard) {
                setShowErrors(false)
                dispatch(getCurrentUserCards())
                setShowModal(false)
                setShowCardModal(false)
                return
                // history.push('/') // redirect to home for now, change to user profile when created
            }


        }
    }

    // const handleCancel = async (e) => {
    //     e.preventDefault()
    //     setShowModal(false)
    //     // history.push('/')
    // }

    return isLoaded && (
        <>
            {/* <div>
                <div>
                    <h1>Hello! Let's start with your card information.</h1>
                </div>             <div>
                    We'll use this information to help you add and save your card for
                    future purchases. Further, the card on file will be where withdrawals are
                    deposited into.
                </div>
            </div> */}
            {showModal &&
                <div id='add-card-form-container'>
                    <div id='add-card-form-header'>
                        <div id='header-text' >
                            <h3>Link Your Card</h3>
                        </div>
                        {/* <div id='close-x-div' onClick={handleCancel}>
                            <img id='add-card-cancel-button' src={closeX} alt='close' />
                        </div> */}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div id='add-card-form-content'>
                            <div id='card-disclaimer'>
                                We do not accept credit cards, prepaid cards, or business cards.
                            </div>
                            {/*-------  Name  -------*/}
                            {/* <div>{showErrors && nameErr.length > 0 && nameErr}</div> */}
                            <div className='label-and-input'>
                                <label id='fName-label'>Name on card</label>
                                <input
                                    // id={nameErr.length > 0 ? 'border-red' : 'valid-input'}
                                    id={nameErrClass}
                                    className='wide-input'
                                    type='text'
                                    placeholder='First and last name'
                                    value={name}
                                    onChange={updateName}
                                    required
                                >
                                </input>
                                <div className='error-div'>{showErrors && nameErr.length > 0 && nameErr}</div>
                            </div>
                            {/*-------  Card number  -------*/}
                            <div className='label-and-input'>
                                <label id='cardNumber-label'>Card Number</label>
                                <input
                                    id={cardNumErrClass}
                                    className='wide-input'
                                    type='text'
                                    placeholder='XXXX XXXX XXXX XXXX'
                                    value={cardNumber}
                                    onChange={updateCardNumber}
                                    required
                                >
                                </input>
                                <div className='error-div'>{showErrors && cardNumberErr.length > 0 && cardNumberErr}</div>
                            </div>
                            <div id='exp-cvc-zip'>
                                {/*-------  Expiration Date  -------*/}

                                <div className='label-and-input'>
                                    <label id='expDate-label'>Expiration</label>
                                    <input
                                        id={dateErrClass}
                                        className='fragmented-input'
                                        type='text'
                                        placeholder='MM/YYYY'
                                        value={expDate}
                                        onChange={updateExpDate}
                                        required
                                    >
                                    </input>
                                    <div className='error-div'>{showErrors && expDateErr.length > 0 && expDateErr}</div>
                                </div>
                                {/*-------  CVC  -------*/}

                                <div className='label-and-input'>
                                    <label id='cvc-label'>CVC</label>
                                    <input
                                        id={cvcErrClass}
                                        className='fragmented-input'
                                        type='text'
                                        placeholder='CVC'
                                        value={CVC}
                                        onChange={updateCVC}
                                        required
                                    >
                                    </input>
                                    <div className='error-div'>{showErrors && cvcErr.length > 0 && cvcErr}</div>
                                </div>
                                {/*-------  Postal Code -------*/}
                                <div className='label-and-input'>
                                    <label id='postal-label'>Postal Code</label>
                                    <input
                                        id={`${postalErrClass}`}
                                        className='fragmented-code'
                                        type='text'
                                        placeholder='* * * * *'
                                        value={postalCode}
                                        onChange={updatePostalCode}
                                        required
                                    >
                                    </input>
                                    <div className='error-div'>{showErrors && postalErr.length > 0 && postalErr}</div>
                                </div>
                            </div>
                            <div id='type-digit-div'>
                                {/*-------  Card Type  -------*/}
                                <div className='label-and-input'>
                                    <label id='cardType-label'>Card Type</label>
                                    <input
                                        id={`${typeErrClass}`}
                                        className='type-digit-inputs'
                                        type='text'
                                        placeholder='Visa or Mastercard'
                                        value={cardType}
                                        onChange={updateCardType}
                                        required
                                    >
                                    </input>
                                    <div className='error-div'>{showErrors && cardTypeErr.length > 0 && cardTypeErr}</div>
                                </div>
                                {/*-------  Last four  -------*/}

                                <div className='label-and-input' >
                                    <label id='lastFour-label'>Last four digits</label>
                                    <input
                                        id={`${lastFourErrClass}`}
                                        className='type-digit-inputs'
                                        type='text'
                                        placeholder='Last four'
                                        value={lastFourDigits}
                                        onChange={updateLastFourDigits}
                                        required
                                    >
                                    </input>
                                    <div className='error-div'>{showErrors && lastFourErr.length > 0 && lastFourErr}</div>
                                </div>
                            </div>
                        </div>
                        <div id='add-card-butt-div'>
                            <div id='terms-div'>
                                <span className='debit-terms'>By adding a new card, you agree to the</span>
                                <span className='debit-terms'> credit/debit card terms.</span>

                            </div>
                            <div id='addCard-div'>
                                <button id='add-card-button' type='submit'>Add Card</button>
                            </div>
                        </div>
                    </form>
                    {/* {showErrors &&
                        <div id='card-errors-container'>
                            {errors.map((e, i) => {
                                return (
                                    <div id='card-error-div' key={i}>
                                        {e}
                                    </div>
                                )
                            })}
                        </div>
                    } */}

                </div>

            }
        </>
    )


}


export default AddCardForm;