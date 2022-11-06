import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AddCardForm from './components/Card/AddCardForm'
import Dashboard from './components/Homepage/Dashboard';
import Sidebar from './components/Sidebar';
import TradeAll from './components/Trade/TradeAll';
import { getAllAssets } from './store/asset';
import { Modal } from './context/Modal';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getAllAssets())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  // Routes to Implement
  // /home 
  // /trade 
  // /assets (wallets)
  // /trade or /explore (assets)

  // PROTECTED ROUTE ONLY ALLOWS FOR PAGES TO BE RENDERED WHEN LOGGED IN

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <>
          <Sidebar />

          <ProtectedRoute path='/wallets' exact={true}>
            <h2>sup</h2>
          </ProtectedRoute>
          <ProtectedRoute path='/user/cards/add'>
            <AddCardForm />
          </ProtectedRoute>
          <ProtectedRoute path='/home' exact={true}>
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path='/trade'>
            <TradeAll/>
          </ProtectedRoute>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <h1>My Home Page</h1>
          </ProtectedRoute>
        </>
      </Switch>
    </BrowserRouter>






  );
}

export default App;
