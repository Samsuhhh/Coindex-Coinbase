import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import BuySellModal from './BuySell';
import './NavBar.css';

const NavBar = () => {
  const currUser = useSelector(state => state.session.user);

  return (
    <div id='nav-wrapper'>
      <nav>
        <div id='nav-content'>
          {currUser &&
            <div>
              <BuySellModal />
            </div>
          }
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>
          <div>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
          {/* <div>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div> */}
          <div>
            <LogoutButton />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
