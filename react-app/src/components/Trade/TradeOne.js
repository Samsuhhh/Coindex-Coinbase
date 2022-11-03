import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';


const TradeOne = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserCards())
        dispatch(getOneAsset()) // just for testing, move to singleAsset page
    }, [dispatch])
}

export default TradeOne;