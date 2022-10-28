import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom';

// Have to create redux state for this


const AddCardForm = () => {
    const history = useHistory()
    const params = useParams()

    const [errors, setErrors] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cardType, setCardType] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [lastFourDigits, setLastFourDigits] = useState('');
    const [CVC, setCVC] = useState('');

    const updateFirstName = (e) => setFirstName(e.target.value);
    const updateLastName = (e) => setLastName(e.target.value);
    const updateExpDate = (e) => setExpDate(e.target.value);
    const updateCardType = (e) => setCardType(e.target.value);
    const updatePostalCode = (e) => setPostalCode(e.target.value);
    const updateCardNumber = (e) => setCardNumber(e.target.value);
    const updateLastFourDigits = (e) => setLastFourDigits(e.target.value);
    const updateCVC = (e) => setCVC(e.target.value);

    // VALIDATION ERRORS
    useEffect(() => {
        const validNums = '0123456789'
        const vErrors = [];
        if (firstName.length > 25 || firstName.length < 3) {
            vErrors.push('First name must be between 3 and 25 characters. ')
        }
        if (lastName.length > 25 || lastName.length < 2) {
            vErrors.push('Last name must be bewtween 2 and 25 characters.')
        }
        if (expDate.length !== 5) vErrors.push('Please enter expiration date in this format: MM/YYYY')
        // potential logic instead of having two form fields
        // if (cardNumber[0] === '4') setCardType('Visa')
        // else if (cardNumber[0] === '5') setCardType('MasterCard')
        // if (cardNumber[0] !== '5' || cardNumber[0] !-- '4') push('invalid card type')
        if (cardType.length > 10 || cardType.length < 4) vErrors.push('Invalid card type.')
        if (postalCode.length !== 5) vErrors.push('Postal code must be 5 digits.')
        if (cardNumber.length !== 16) vErrors.push('Invalid card number.')
        if (lastFourDigits !== cardNumber.slice(14)) vErrors.push('Card information does not match.')
        if (CVC.length !== 3 || CVC.includes(!validNums)) vErrors.push('Please enter the correct CVC.')

        setErrors(vErrors)

    }, [firstName, lastName, expDate, cardNumber, cardType, postalCode, lastFourDigits, CVC])

    const handleSubmit = async (e) => {
        if (!errors.length) {
            const card = {
                first_name: firstName,
                last_name: lastName,
                exp_date: expDate,
                card_type: cardType,
                postal_code: postalCode,
                card_number: cardNumber,
                last_four_digits: lastFourDigits,
                cvc: CVC
            }

            // let newCard = await dispatch(addCardThunk(newCard))
            // if (newCard) assign newCard to User?


        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <>
            <div>
                <div>
                    <h1>Hello! Let's start with your card information.</h1>
                </div>
                <div>
                    We'll use this information to help you add and save your card for
                    future purchases. Further, the card on file will be where withdrawals are
                    deposited into.
                </div>
            </div>
            <div id='form-content'>
                <form onSubmit={handleSubmit}>
                    {/*-------  First Name  -------*/}
                    <div>
                        <label id='fName-label'>First Name</label>
                        <input
                        type='text'
                        placeholder='First name'
                        value={firstName}
                        onChange={updateFirstName}
                        required
                        >
                        </input>
                    </div>
                    {/*-------  Last Name  -------*/}
                    <div>
                        <label id='lName-label'>Last Name</label>
                        <input
                        type='text'
                        placeholder='Last name'
                        value={lastName}
                        onChange={updateLastName}
                        required
                        >
                        </input>
                    </div>
                    <div>
                        <label id='expDate-label'>Expiration Date</label>
                        <input
                        type='text'
                        placeholder='Expiration date'
                        value={expDate}
                        onChange={updateExpDate}
                        required
                        >
                        </input>
                    </div>
                    <div>
                        <label id='cardType-label'>Card Type</label>
                        <input
                        type='text'
                        placeholder='Card Type'
                        value={cardType}
                        onChange={updateCardType}
                        required
                        >
                        </input>
                    </div>
                    <div>
                        <label id='postal-label'>Postal Code</label>
                        <input
                        type='text'
                        placeholder='Postal code'
                        value={postalCode}
                        onChange={updatePostalCode}
                        required
                        >
                        </input>
                    </div>
                    <div>
                        <label id='cardNumber-label'>Card Number</label>
                        <input
                        type='text'
                        placeholder='Card number'
                        value={cardNumber}
                        onChange={updateCardNumber}
                        required
                        >
                        </input>
                    </div>
                    <div>
                        <label id='lastFour-label'>Last four digits</label>
                        <input
                        type='text'
                        placeholder='Card number'
                        value={lastFourDigits}
                        onChange={updateLastFourDigits}
                        required
                        >
                        </input>
                    </div>
                    <div>
                        <label id='cvc-label'>CVC</label>
                        <input
                        type='text'
                        placeholder='CVC'
                        value={CVC}
                        onChange={updateCVC}
                        required
                        >
                        </input>
                    </div>
                    <button id='add-card-button' type='submit'>Add Card</button>
                    <button id='add-card-cancel-button' type='cancel'>Cancel</button>
                </form>
            </div>

        </>
    )


}


export default AddCardForm;