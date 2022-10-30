import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import * as sessionActions from "../store/session";


const Nav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    // have to update navBar title ie: 'Assets' if on assets page; possibly useParams
    const sessionUser = useSelector((state) => state.session.user);
    const [showMenu, setShowMenu] = useState('');
    
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu)
    
        return () => document.removeEventListener('click', closeMenu);

    }, [showMenu])

    // todo: POTENTIALLY add another useEffect dispatching Thunk for route: 'Get top 7 most popular cryptos'

    let sessionLinks;
    if (sessionUser){
        sessionLinks = (
            <>
            <div id='curr-page-title-div'> 
                HOME
            </div>
            </>
        )
    }


    return (
        <>
        </>
    )
}

export default Nav