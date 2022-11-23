import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import './signupForm.css'

import { authenticate } from '../../store/session';
import { logout } from '../../store/session';

const SignUpForm = () => {

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const history = useHistory() ;

  const [showErrors, setShowErrors] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [firstNameErr, setFirstNameErr] = useState("")
  const [lastNameErr, setLastNameErr] = useState("")
  const [usernameErr, setUsernameErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [noErr, setNoErr] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(logout())
      await dispatch(authenticate());
      setIsLoaded(true);
    })();
  }, [dispatch]);


  const onSignUp = async (e) => {
    e.preventDefault();
    setShowErrors(true)



    if (password === repeatPassword && !errors.length) {
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      console.log(data)

      if (data) {
        setErrors(data)
        setShowErrors(false)
        return <Redirect to='/trade'/>
      }
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    await dispatch(login('demo@aa.io', 'password'));
    history.push('/trade') 
    return
  }



  useEffect(() => {
    let vErrors = [];

    if (firstName.length < 2 || firstName.length > 15) {
      vErrors.push("* First name must be between 2 and 15 characters.")
    }
    if (lastName.length < 2 || lastName.length > 15) {
      vErrors.push("* Last name cannot be less than 2 characters")

    }
    if (username.length < 6 || username.length > 20) {
      vErrors.push("* Username must be between 6 and 20 characters.")

    }
    if (password.length < 6 || password.length > 15) {
      vErrors.push("* Password must be between 6 and 15 characters.")

    }

    if (password !== repeatPassword) {
      vErrors.push("* Password fields must match!!")
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) vErrors.push('* Please enter a valid email address')


    setErrors(vErrors)



  }, [firstName, lastName, username, password, email, repeatPassword])

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/assets' />;
  }

  return isLoaded && (
    <div id='signup-container'>

      <form onSubmit={onSignUp}>

        {showErrors && (
          <div id='signup-errors'>
            {errors.map((error, ind) => (
              <div id='sError' key={ind}>{error}</div>
            ))}
          </div>

        )}
        <div id='signup-content'>
          <div>
            <div>
              <div id='label-div'>
                <label>First Name</label>

              </div>
              <input
                id='signup-input'
                type='text'
                name='first_name'
                onChange={updateFirstName}
                value={firstName}
                placeholder='First name'
              ></input>
            </div>
            <div>
              <div>
                <label>Last Name</label>

              </div>
              <input
                id='signup-input'
                type='text'
                name='last_name'
                onChange={updateLastName}
                value={lastName}
                placeholder='Last name'
              ></input>
            </div>
          </div>
          <div>
            <div>
              <label>User Name</label>

            </div>
            <input
              id='signup-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='User name'
            ></input>
          </div>
          <div>
            <div>
              <label>Email</label>

            </div>
            <input
              id='signup-input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
            ></input>
          </div>
          <div>
            <div>

              <label>Password</label>
            </div>
            <input
              id='signup-input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
            ></input>
          </div>
          <div>
            <div>
              <label>Confirm Password</label>

            </div>
            <input
              id='signup-input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Repeat password'
            ></input>
          </div>
          <div id='justify-div'>
            <button
              id='signup-btn'
              type='submit'>Sign Up</button>

            {/* <div>
              <button
                id='demo-login'
                type='submit'
                onClick={demoUserLogin}
              >Demo Login</button>
            </div> */}
          </div>
        </div>

      </form>
    </div>
  );
};

export default SignUpForm;
