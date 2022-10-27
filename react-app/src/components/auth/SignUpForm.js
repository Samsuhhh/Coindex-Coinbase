import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [firstNameErr, setFirstNameErr] = useState("")
  const [lastNameErr, setLastNameErr] = useState("")
  const [usernameErr, setUsernameErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [noErr, setNoErr] = useState(true)

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (firstName.length < 2) {
    //   setFirstNameErr("*First name cannot be less than 2 characters")
    //   setNoErr(false)
    // }
    // if (lastName.length < 2) {
    //   setLastNameErr("*Last name cannot be less than 2 characters")
    //   setNoErr(false)
    // }
    // if (username.length < 6) {
    //   setUsernameErr("*Username cannot be less than 6 characters")
    //   setNoErr(false)
    // }
    // if (password.length < 6) {
    //   setPasswordErr("*Password cannot be less than 6 characters")
    //   setNoErr(false)
    // }



    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      console.log(data)

      if (data) {
        setErrors(data)
      }
    }
  };

  // useEffect(() => {
  //   setNoErr(true)
  // }, [noErr])

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
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <div>
          <label>First Name</label>
          <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={firstName}
          placeholder='First name'
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type='text'
            name='last_name'
            onChange={updateLastName}
            value={lastName}
            placeholder='Last name'
          ></input>
        </div>
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='User name'
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email'
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Password'
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Repeat password'
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
