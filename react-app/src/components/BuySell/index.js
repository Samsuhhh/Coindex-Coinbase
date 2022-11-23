import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './BuySellPage.css';
import BuySellPage from './BuySellPage';


const BuySellModal = () => {
    const [showModal, setShowModal] = useState(false)

    const openModalFunction = (e) => {
        console.log('EE!!!', e)
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        setShowModal(true)
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)} id='buy-sell-nav-button'>
                Buy & Sell
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BuySellPage setShowMain={setShowModal}/>
                </Modal>
            )}
        </div>
    )
}

export default BuySellModal;