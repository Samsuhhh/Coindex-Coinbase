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
    const currUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(null);
    const [clicked1, setClicked1] = useState(null);
    const params = useParams();
    // sticky
    // height 100%;
    // min-width: 87px; == width
    // left 0px
    // top 0px
    // z index: 2

    // logo
    // UL or DIVs for icons in navlin
    // width: 54px with padding: 16

    useEffect(() => {
        setClicked(false)
    }, [])

    function activeFunc(value) {
        if (value === 'wallet'){
            setClicked1(false)
            return clicked ? setClicked(false) : setClicked(true)
            }
        if (value === 'graph') {
            setClicked(false)
            return clicked1 ? setClicked1(false) : setClicked1(true)
        }
    }

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
                    <NavLink style={{textDecoration:"none"}} to='/home'>
                        <div className='sidebar-item-58x58'>
                            <div id='sidebar-icon-div'>
                                <img src={home} alt='home-icon'/>
                            </div>
                            <div id='side-button-center'>Home</div>
                        </div>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to='/assets'>
                        <div className='sidebar-item-58x58' onClick={() => activeFunc('wallet')} id={clicked ? 'clicked' : 'not'}>
                            <div id='sidebar-icon-div'>
                                <img src={pie1} alt='graph' className={clicked ? 'clicked-class' : 'not'} />
                            </div>
                            <div id='side-button-center' className={clicked ? 'clicked-class' : 'not'}>Assets</div>
                            {/* add image icon for WALLETS */}
                        </div>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to='/trade' >
                        <div className='sidebar-item-58x58' onClick={() => activeFunc('graph')} id={clicked1 ? 'clicked1' : 'not'}>
                            <div id='sidebar-icon-div' >
                                <img src={trade} alt='graph' className={clicked1 ? 'clicked-class' : 'not'} />
                            </div>
                            <div id='side-button-center' className={clicked1 ? 'clicked-class' : 'not'}>Trade</div>
                            {/* add image icon for TRADE */}
                        </div>
                    </NavLink>
                </div>
            </div>




        </nav>
    )
}
export default Sidebar;