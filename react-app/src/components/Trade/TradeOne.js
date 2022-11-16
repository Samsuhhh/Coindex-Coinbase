import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';


const TradeOne = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const assetDetail = useSelector(state => state.assets.singleAsset)
    const [overview, setOverview] = useState(true)
    const [walletview, setWalletview] = useState(false)
    const dispatch = useDispatch();
    let pageView;
    const params = useParams();
    const {crypto} = params;
    

    useEffect(() => {
        dispatch(getCurrentUserCards())
        dispatch(getOneAsset(crypto)) 
    }, [dispatch, crypto])

    if (overview) {
        pageView = {
            
        }
    }



    return (
        
        <div id='single-asset-container'>

        </div>
    )


}

export default TradeOne;