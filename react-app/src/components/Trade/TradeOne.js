import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneAsset } from '../../store/asset';
import { getCurrentUserCards } from '../../store/session';


const TradeOne = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const params = useParams();

    useEffect(() => {
        dispatch(getCurrentUserCards())
        dispatch(getOneAsset()) 
    }, [dispatch])

    return (
        <>
        <div id='single-asset-container'>
                Heyo! ~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~
        </div>
        </>
    )


}

export default TradeOne;