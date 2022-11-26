import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { authenticate, logout } from '../../store/session';
import { getCurrentUserCards, login } from '../../store/session';
import './loginForm.css'



const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    (async () => {
      await dispatch(logout())
      await dispatch(authenticate());
      setIsLoaded(true);
    })();
  }, [dispatch]);


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    await dispatch(login('demo@aa.io', 'password'));
    history.push('/assets')
    return
  }


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/assets' />;
  }

  return isLoaded && (
    <div id='login-wrapper'>
      <div id='login-container'>
        <div>
          <h1>Sign in to Coindex</h1>
          <div id='sign-in-caption'>Not your device?   Give it back you thief!</div>
        </div>
        <form onSubmit={onLogin} id='login-form'>
          <div id='errors-mapped'>
            {errors.map((error, ind) => (
              <div id='error-div' key={ind}>
                {error}
              </div>
            ))}
          </div>
          <div id='login-form-content'>
            <div id='label-div'>
              <label htmlFor='email'>Email</label>
            </div>
            <div id='input-div'>
              <input
                className='login-input'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div div id='label-div'>
              <label htmlFor='password'>Password</label>
            </div>
            <div id='input-div'>
              <input
                className='login-input'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <div id='auth-buttons'>
                <div className='login-div'>
                  <button id='reg-login-btn' type='submit' className='auth-button'>Login</button>
                </div>
                <div className='login-div'>
                  <button
                    id='demo-login'
                    type='submit'
                    onClick={demoUserLogin}
                  >Demo Login</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
