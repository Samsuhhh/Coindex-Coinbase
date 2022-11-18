import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createCardThunk, deleteCardThunk, getCurrentUserCards, updateCardThunk } from '../../../store/session';
import closeX from '../../../aIMGS/close.svg'
import '../AddCardForm/AddCardForm.css'
import { Modal } from '../../../context/Modal';



const EditCardForm = ({ setShowEditModal, card }) => {
    const currUser = useSelector(state => state.session.user)
    const currCard = useSelector(state => state.session.card)
    const dispatch = useDispatch();

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
    const [isLoaded, setIsLoaded] = useState(false)
    // const [card, setCard] = useState(null)
    // const [showEditModal, setShowEditModal] = useState(false)
    const [showUpdateErrors, setShowUpdateErrors] = useState(false);
    const [updateErrors, setUpdateErrors] = useState([]);


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

        if (!vErrors.length) {
            setShowUpdateErrors(false)
        }

    }, [name, expDate, cardNumber, cardType, postalCode, lastFourDigits, CVC, card ])
    const handleUpdateCardSubmit = async (e) => {
        e.preventDefault();
        if (updateErrors.length) {
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

            <div id='add-card-form-container'>
                <div id='add-card-form-header'>
                    <div id='header-text'>
                        <h3>Link Your Card</h3>
                    </div>
                </div>

                {showUpdateErrors && (
                    <div id='card-errors-container'>

                        {updateErrors.map((error, i) => (
                            <div id='card-error-div' key={i}>
                                {error}
                            </div>
                        ))}
                    </div>
                )}

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

                            </input>
                        </div>
                        <div id='exp-cvc-zip'>
                            {/*-------  Expiration Date  -------*/}

                            <div className='label-and-input'>
                                <label id='expDate-label'>Expiration</label>
                                <input
                                    className='fragmented-input'
                                    type='text'
                                    placeholder='MM/YY'
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

        </>
    )


}


export default EditCardForm;