import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import '../../BuySell/BuySellPage.css';
import EditCardForm from './EditCardForm';
import closeX from '../../../aIMGS/close.svg'

const EditCardModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button onClick={() => setShowModal(true)} id='buy-sell-nav-button'>
                UPDATE CARD
            </button>
            {showModal && (
                <>
                    <div id='close-x-div' onClick={() => setShowModal(false)}>
                        <img id='add-card-cancel-button' src={closeX} alt='close' />
                    </div>
                    <Modal onClose={() => setShowModal(false)}>
                        <EditCardForm />
                    </Modal>
                </>
            )}
        </div>
    )
}

export default EditCardModal;