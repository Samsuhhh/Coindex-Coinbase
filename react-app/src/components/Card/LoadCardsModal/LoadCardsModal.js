import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserCards } from '../../../store/session';



const PayWithModal = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const cards = useSelector((state) => state.session.cards);

    useEffect(() => {
        dispatch(getCurrentUserCards())
        .then(() => {setIsLoaded(true)})
    }, [dispatch])

    return isLoaded && (
        <div id='pay-with-modal-container'>
            <div id='pay-with-modal-header'>
                <div>back button(cancel)</div>
                <span>Pay with</span>
            </div>
            <div id='pay-with-modal-content'>
                {cards.map((dCard) => (
                    dCard
                ))}
            </div>


        </div>



    )
}

export default PayWithModal;