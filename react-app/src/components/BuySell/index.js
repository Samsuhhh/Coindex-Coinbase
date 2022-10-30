import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './BuySell.css';
import BuySellPage from './BuySellPage';


const BuySellModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                Buy or Sell babay
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BuySellPage/>
                </Modal>
            )}
        </div>
    )
}

export default BuySellModal;