import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';


const TradeAll = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserCards())
        // get all assets thunk here after creation
            .then(() => setIsLoaded(true))
    }, [dispatch])

    
}

export default TradeAll;