import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createCardThunk, getCurrentUserCards } from '../../../store/session';
import closeX from '../../../aIMGS/close.svg'
import './AddCardForm.css'

const AddCardForm = ({setShowCardModal}) => {
    const currUser = useSelector(state => state.session.user)

    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

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

    // VALIDATION ERRORS
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


        setErrors(vErrors)
    
        if (!vErrors.length){
            setShowErrors(false)  
        }

    }, [name, expDate, cardNumber, cardType, postalCode, lastFourDigits, CVC])

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

    const handleCancel = async (e) => {
        e.preventDefault()
        setShowModal(false)
        // history.push('/')
    }

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
                        <div id='header-text'>
                            <div>Link Your Card</div>
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
                            <div className='label-and-input'>
                                <label id='fName-label'>Name on card</label>
                                <input
                                    className='wide-input'
                                    type='text'
                                    placeholder='Name on card'
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
                                    placeholder='XXXX XXXX XXXX XXXX'
                                    value={cardNumber}
                                    onChange={updateCardNumber}
                                    required
                                >
                                    {/* <div>
                                        <img src={cardNumber[0] === 4 ? "Visa" : "Mastercard"} />
                                    </div> */}
                                </input>
                            </div>
                            {/*-------  Last Name  -------*/}
                            {/* <div className='label-and-input'>
                                <label id='lName-label'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Last name'
                                    value={lastName}
                                    onChange={updateLastName}
                                    required
                                >
                                </input>
                            </div> */}

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
                                        placeholder='Card Type'
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
                                        placeholder='Last four digits'
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
                                <span className='debit-terms'>By adding a new card, you agree to the</span>
                                <span className='debit-terms'> credit/debit card terms.</span>

                            </div>
                            <div id='addCard-div'>
                                <button id='add-card-button' type='submit'>Add Card</button>
                            </div>
                        </div>
                    </form>
                    {showErrors &&
                        <div id='card-errors-container'>
                            {errors.map((e, i) => {
                                return (
                                    <div id='card-error-div' key={i}>
                                        {e}
                                    </div>
                                )
                            })}
                        </div>
                    }

                </div>

            }
        </>
    )


}


export default AddCardForm;