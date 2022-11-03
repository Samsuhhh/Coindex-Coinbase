import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './BuySellPage.css';
import AddCardForm from '../Card/AddCardForm';


const AddCardModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddCardForm />
                </Modal>
            )}
        </div>
    )
}

export default AddCardModal;