import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './splash.css'
import { logout } from "../../store/session";

// EXPLORE PAGE WHEN NOT LOGGED IN
const Splash = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(logout())
    }, [dispatch])
    
    return(
        <>
        <div id='splash-container'>
            <div id='splash-right'>
                <h1>The future of money is here</h1>
                <h2>Over 108 million (definitely real) people and businesses trust us to buy, sell, and manage crypto.</h2>
            </div>
        </div>
        
        </>
    )
}




export default Splash;