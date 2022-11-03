import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import btcIcon from '../aIMGS/Bitcoin.png'
import './sidebar.css';

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
            <div>
                <img src={btcIcon} alt='logo' style={{height: "60px", widht: "60px"}}/>
            </div>
            <div id='stack-icons'>
                <ul>
                    <li className='sidebar-item-58x58'>
                        <NavLink to='/home'>
                            <div>Home</div>
                            {/* add image icon for HOME */}
                        </NavLink>
                    </li>
                    <li className='sidebar-item-58x58'>
                        <NavLink to='/wallets'>
                            <div>Assets</div>
                            {/* add image icon for WALLETS */}
                        </NavLink>
                    </li>
                    <li className='sidebar-item-58x58'>
                        <NavLink to='/trade'>
                            <div>Trade</div>
                            {/* add image icon for TRADE */}
                        </NavLink>
                    </li>
                </ul>
            </div>




        </nav>
    )
}
export default Sidebar;