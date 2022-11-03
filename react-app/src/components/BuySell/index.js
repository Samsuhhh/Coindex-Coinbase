import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './buySellPage.css';
import BuySellPage from './BuySellPage';


const BuySellModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button onClick={() => setShowModal(true)} id='buy-sell-nav-button'>
                Buy & Sell
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