import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import AssetsPortolioPage from './components/Assets/AssetsPortfolioPage';
import Footer from './components/Footer/Footer';
import Splash from './components/unauthorized/Splash';
import TradeAll2 from './components/Trade/TradeAll2';
import TradeOne from './components/Trade/TradeOne';
import Gateway from './components/Gateway';
import PageNotFound from './components/404Page/PageNotFound';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.session.user)

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
      <Footer currUser={currUser} />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
          <NavBar />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
          <NavBar />
        </Route>
        <Route path='/gateway' exact={true}>
          <Gateway />

        </Route>
        <Route path='/' exact={true}>
          <Splash />
          <NavBar />

        </Route>


        <>
          <Sidebar />
          <NavBar />
          <ProtectedRoute path='/assets' exact={true}>
            <AssetsPortolioPage />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/user/cards/add'>
            <AddCardForm />
          </ProtectedRoute> */}
          <ProtectedRoute path='/home' exact={true}>
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path='/trade/:crypto' exact={true}>
            <TradeOne />
          </ProtectedRoute>
          <ProtectedRoute path='/trade' exact={true}>
            <TradeAll />
          </ProtectedRoute>

          <ProtectedRoute path='/trade2'>
            <TradeAll2 />
          </ProtectedRoute>

          {/* <Route path="*" exact={true}>
            <PageNotFound/>
          </Route> */}

          {/* <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <h1>My Home Page</h1>
          </ProtectedRoute> */}
        </>
      </Switch>
    </BrowserRouter>






  );
}

export default App;
