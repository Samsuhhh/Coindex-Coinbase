import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getCurrentUserCards, updateCardThunk } from '../../../store/session';
import closeX from '../../../aIMGS/close.svg'
import '../AddCardForm/AddCardForm.css'
import { Modal } from '../../../context/Modal';

const EditCardForm = () => {
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
    const [card, setCard] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showModal, setShowModal] = useState(null);
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
            vErrors.push('Name on card must be bewtween 2 and 25 characters.')
        }
        // let nameCheck = currUser.firstName + " " + currUser.lastName
        // if (name !== nameCheck) vErrors.push('Name on card must match name on the account.')

        if (expDate.length !== 7) vErrors.push('Please enter expiration date in this format: MM/YYYY')
        // potential logic instead of having two form fields
        // if (cardNumber[0] === '4') setCardType('Visa')
        // else if (cardNumber[0] === '5') setCardType('MasterCard')
        // if (cardNumber[0] !== '5' || cardNumber[0] !-- '4') push('invalid card type')
        if (cardType.length > 10 || cardType.length < 4) vErrors.push('Invalid card type.')
        if (postalCode.length !== 5) vErrors.push('Postal code must be 5 digits.')
        if (cardNumber.length !== 16) vErrors.push('Invalid card number.')
        if (lastFourDigits !== cardNumber.slice(-4)) vErrors.push('Card information does not match.')
        if (CVC.length !== 3 || CVC.includes(!validNums)) vErrors.push('Please enter the correct CVC.')

        setErrors(vErrors)

    }, [name, expDate, cardNumber, cardType, postalCode, lastFourDigits, CVC])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(true)

        if (!errors.length) {
            const card = {
                name: name,
                card_type: cardType,
                exp_date: expDate,
                postal_code: postalCode,
                card_number: cardNumber,
                last_four_digits: lastFourDigits,
                cvc: CVC,
                user_id: Number(currUser.id)
            }
            
            // handle by assigning to session.user
            let updatedCard = await dispatch(updateCardThunk(card, card.id))
            // if (newCard) assign newCard to User
            if (updatedCard) {
                setShowErrors(false)
                dispatch(getCurrentUserCards())
                // setShowEditModal(false)
                // history.push('/') // redirect to home for now, change to user profile when created
            }

        }
        
    }


    const handleClick = (card) => {
        // setShowModal(false)
        setShowEditModal(true)
        setCard(card)
        
    }


    const handleCancel = async (e) => {
        e.preventDefault()
        // setShowModal(false)
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

            <Modal onClose={() => setShowModal(false)}>
                <div id='close-div' onClick={() => setShowModal(false)}>X
                    {/* <img id='back-arrow-svg' src={backArrow} alt='back arrow' /> */}
                </div>
                {/* <PayWithModal setCard={setCard}, card={card}/> */}
                <div id='pay-with-modal-container'>
                    <div id='pay-with-modal-header'>
                        <span>Banking info</span>
                    </div>
                    <div id='pay-with-modal-content' className='select-card-loop'>
                        {Object.values(currCard).map((dCard) => (
                            <div id='dCard-card-wrapper' onClick={() => handleClick(dCard.id)}>
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
                        <div>Selected card Id: {`${card}`}</div>
                    </div>
                </div>
            </Modal>

            {showEditModal &&
                <div id='add-card-form-container'>
                    <div id='add-card-form-header'>
                        <div id='header-text'>
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
                        <div>
                            {errors.map((e, i) => {
                                return (
                                    <div key={i}>
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


export default EditCardForm;