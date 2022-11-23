import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';


const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <div id='navbar-signout' onClick={onLogout}>Sign out</div>;
  // return <button className='navBar-buttons' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
