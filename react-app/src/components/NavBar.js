import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import BuySellModal from './BuySell';
// import EditCardModal from './Card/EditCardForm/index2';
import './NavBar.css';
import coindex from '../aIMGS/coinbase.png'
import user from '../aIMGS/user.svg'
import { Modal } from '../context/Modal';


const NavBar = () => {
  const currUser = useSelector(state => state.session.user);
  const [openMenu, setOpenMenu] = useState(false)
  let sessionLinks;

  const openDropdown = () => {
    console.log('SUP')
    if (!openMenu) setOpenMenu(true)
    if (openMenu) setOpenMenu(false)
  }

  useEffect(() => {
    if(openMenu) setOpenMenu(false)
  }, [currUser])


  if (currUser) {
    sessionLinks = (
      <>
        <div id='nav-wrapper'>
          <nav>
            <div id='nav-content'>
              <div>
                <BuySellModal />
              </div>

              <div id='user-profile' onClick={openDropdown}>
                <img src={user} alt='user-profile' id='user-img' />
              </div>
              {openMenu && (

                <Modal onClose={() => setOpenMenu(false)} >
                  <div id='dropdown'>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <div>
                      <LogoutButton />
                    </div>
                  </div>
                </Modal>

              )}
            </div>
          </nav>
        </div>
      </>
    )
  } else {
    sessionLinks = (
      <div id='nav-wrapper'>
        <div id='logo-logo-logo'>
          <img src={coindex} alt='logo' style={{ height: "60px", widht: "60px" }} />
          <div id='wordLogo'>oindex-ss</div>
        </div>
        <nav>
          <div id='nav-content'>
            {/* <NavLink style={{ textDecoration: "none" }} to='/' exact={true} activeClassName='active'>
              <div className='navBar-buttons'>
                Home
              </div>
            </NavLink> */}
            <div id='coindex-logo'>

            </div>
            <NavLink style={{ textDecoration: "none" }} to='/login' exact={true} activeClassName='active'>
              <div className='navBar-buttons'>
                Login
              </div>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to='/sign-up' exact={true} activeClassName='active'>
              <div className='navBar-buttons'>
                Sign Up
              </div>
            </NavLink>
            {/* <div>
                      <NavLink style={{textDecoration:"none"}}  to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div> */}
          </div>
        </nav>
      </div>
    )
  }


  return (
    <div id='nav-wrapper'>
      <>{sessionLinks}</>
    </div>
  );
}

export default NavBar;
