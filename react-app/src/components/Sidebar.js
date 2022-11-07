import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import btcIcon from '../aIMGS/Bitcoin.png'
import './sidebar.css';
import coindex from '../aIMGS/coinbase.png';

const Sidebar = () => {
    const currUser = useSelector(state => state.session.user)

    // sticky
    // height 100%;
    // min-width: 87px; == width
    // left 0px
    // top 0px
    // z index: 2

    // logo
    // UL or DIVs for icons in navlink
    // width: 54px with padding: 16

    return (
        <nav id='Sidebar-flex-column'>
            <div id='logo-logo'>
                <img src={coindex} alt='logo' style={{ height: "60px", widht: "60px" }} />
                <div id='wordLogo'>oindex-ss</div>
            </div>
            <div id='stack-icons'>
                <div>
                    <NavLink style={{textDecoration:"none"}} to='/home'>
                        <div className='sidebar-item-58x58'>
                            <div id='sidebar-icon-div'>
                                {/* icon */}
                            </div>
                            <div id='side-button-center'>Home</div>
                            {/* add image icon for HOME */}
                        </div>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to='/wallets'>
                        <div className='sidebar-item-58x58'>
                            <div id='sidebar-icon-div'>
                                {/* icon */}
                            </div>
                            <div id='side-button-center'>Assets</div>
                            {/* add image icon for WALLETS */}
                        </div>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to='/trade'>
                        <div className='sidebar-item-58x58'>
                            <div id='sidebar-icon-div'>
                                {/* icon */}
                            </div>
                            <div id='side-button-center'>Trade</div>
                            {/* add image icon for TRADE */}
                        </div>
                    </NavLink>
                </div>
            </div>




        </nav>
    )
}
export default Sidebar;