import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import btcIcon from '../aIMGS/Bitcoin.png'
import './sidebar.css';
import coindex from '../aIMGS/coinbase.png';
import trade from '../aIMGS/line-graph.svg';
import pie from '../aIMGS/pie-chart.svg';
import pie1 from '../aIMGS/pie-chart1.svg';
import home from '../aIMGS/home.svg';

const Sidebar = () => {
    // const currUser = useSelector(state => state.session.user);
    const [clickedHome, setClickedHome] = useState(true);
    const [clickedAssets, setClickedAssets] = useState(null);
    const [clickedTrade, setClickedTrade] = useState(null);



    // const params = useParams();
    // sticky
    // height 100%;
    // min-width: 87px; == width
    // left 0px
    // top 0px
    // z index: 2

    // logo
    // UL or DIVs for icons in navlin
    // width: 54px with padding: 16




    // useEffect(() => {
    //     setClicked(false)
    // }, [])

    // function activeFunc(value) {
    //     if (value === 'wallet'){
    //         setClicked1(false)
    //         return clicked ? setClicked(false) : setClicked(true)
    //         }
    //     if (value === 'graph') {
    //         setClicked(false)
    //         return clicked1 ? setClicked1(false) : setClicked1(true)
    //     }
    // }

    return (
        <nav id='Sidebar-flex-column'>
            <NavLink to='/trade' style={{ textDecoration: "none" }}>
                <div id='logo-logo'>
                    <img src={coindex} alt='logo' style={{ height: "60px", widht: "60px" }} />
                    <div id='wordLogo'>oindex-ss</div>
                </div>
            </NavLink>
            <div id='stack-icons'>
                <div>
                    <NavLink style={{ textDecoration: "none" }} to='/home'>
                        <div className='sidebar-item-58x58' id={clickedHome ? 'clicked' : 'not'} onClick={() => {
                            setClickedHome(true);
                            setClickedAssets(false);
                            setClickedTrade(false)
                        }}>
                            <div id='sidebar-icon-div'>
                                <img src={home} alt='home-icon' className={clickedHome ? 'clicked-class' : 'not'} />
                            </div>
                            <div id='side-button-center' className={clickedHome ? 'clicked-class' : 'not'}>Home</div>
                        </div>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to='/assets'>
                        <div className='sidebar-item-58x58' id={clickedAssets ? 'clicked' : 'not'} onClick={() => {
                            setClickedAssets(true);
                            setClickedHome(false);
                            setClickedTrade(false)
                        }}>
                            <div id='sidebar-icon-div'>
                                <img src={pie1} alt='graph' className={clickedAssets ? 'clicked-class' : 'not'} />
                            </div>
                            <div id='side-button-center' className={clickedAssets ? 'clicked-class' : 'not'}>Assets</div>
                            {/* add image icon for WALLETS */}
                        </div>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to='/trade' >
                        <div className='sidebar-item-58x58' id={clickedTrade ? 'clicked' : 'not'} onClick={() => {
                            setClickedTrade(true)
                            setClickedAssets(false);
                            setClickedHome(false);
                        }}>
                            <div id='sidebar-icon-div' >
                                <img src={trade} alt='graph' className={clickedTrade ? 'clicked-class' : 'not'} />
                            </div>
                            <div id='side-button-center' className={clickedTrade ? 'clicked-class' : 'not'}>Trade</div>
                            {/* add image icon for TRADE */}
                        </div>
                    </NavLink>
                </div>
            </div>




        </nav>
    )
}
export default Sidebar;