import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import BuySellModal from './BuySell';


const NavBar = () => {
  const currUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div id='temp-navbar' style={{ backgroundColor: "white", display: "flex", width: "100%", border: "1px solid black", justifyContent: "flex-end", position: "fixed", top: "0" }}>
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
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
