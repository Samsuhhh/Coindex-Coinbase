import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, getCurrentUserCards } from '../../../store/session';
import { Modal } from '../../../context/Modal';
import AddCardForm from '../AddCardForm';
import trashCan from '../../../aIMGS/trash-can.svg'
import './paywithmodal.css'


const PayWithModal = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const cards = useSelector((state) => state.session.card);

    const clickedCard = document.getElementsByClassName('.mapped-card-div-row-justify');

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteCard(id))
        }
    }

        useEffect(() => {
            dispatch(getCurrentUserCards())
                .then(() => { setIsLoaded(true) })
        }, [dispatch])

        return isLoaded && (
            <div id='pay-with-modal-container'>
                <div id='pay-with-modal-header'>
                    <span>Pay with</span>
                </div>
                <div id='pay-with-modal-content'>
                    {Object.values(cards).map((dCard) => (
                        <div id='dCard-card-wrapper'>
                            <div key={dCard.id} className='mapped-card-div-row-justify'>
                                <div>{dCard.cardType}</div>
                                <div id='card-info-div-col'>
                                    <div id='card-bank-div'>{dCard.name}</div>
                                    <div id='card-caption-overflow-wrap'>
                                        $5,000.00 buying limit remaining. You'll get instant access to your assets
                                    </div>
                                </div>
                                <div id='mapped-card-right'>
                                    <div id='last-four-div'>{dCard.lastFourDigits}</div>
                                    <div id='delete-card' onClick={() => deleteHandler(dCard.id)}>
                                        <img src={trashCan} id='trash-can' alt='trash' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id='pay-with-modal-footer'>
                    <div id='add-payment-butt-div'>
                        <div id='add-payment-button' onClick={() => setShowModal(true)}>
                            <div id='changeToSVG'> + </div>
                            Add a payment method
                        </div>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <AddCardForm />
                            </Modal>
                        )}
                    </div>
                </div>


            </div>



        )
    }

    export default PayWithModal;