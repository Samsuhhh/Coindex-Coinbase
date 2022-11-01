import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssets, getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';


const TradeAll = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const allAssets = useSelector((state) => state.assets.allAssets)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserCards())
        dispatch(getAllAssets())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            <div className='trade-share-container-include-right'>

                <div className='trade-share-content'>
                    <div id='trade-all-header'></div>
                    
                </div>
                <div>Buy Sell</div>
            </div>
        </>
    )
}

export default TradeAll;