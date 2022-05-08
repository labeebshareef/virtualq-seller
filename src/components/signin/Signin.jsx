import './signin.css';
import React, {useState} from 'react';

import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';

const Signin = ({loginClick, disableButton}) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    username: {},
    password: {},
  });
  const validateEmail = (email) => {
    return email.match(
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
    console.log(values);
  };

  const onLoginClick = (e) => {
    let errorCount = 0;
    if (!validateEmail(values.username)) {
      setError({
        ...error,
        username: {
          error: true,
          helperText: 'email not valid',
        },
      });
      errorCount++;
    }
    if (!values.username) {
      setError({
        ...error,
        username: {
          error: true,
          helperText: 'username required',
        },
      });
      errorCount++;
    }
    if (!values.password) {
      setError({
        ...error,
        password: {
          error: true,
          helperText: 'password required',
        },
      });
      errorCount++;
    }
    if (errorCount === 0) {
      setError({
        username: {},
        password: {},
      });
    }
    loginClick(values);
  };

  return (
    <div className='innerSection'>
      {/* <div className="header"><h1>Login</h1></div> */}
      <div className='login-component'>
        {/* <div className="input"> */}
        <div className='input-field'>
          <TextField
            value={values.username}
            error={error.username.error}
            helperText={error.username.helperText}
            name="username"
            onChange={handleChange}
            id="outlined-basic" label="Email" variant="outlined" />
        </div>
        <div className='input-field'>
          <TextField
            className='input-field'
            value={values.password}
            error={error.password.error}
            helperText={error.password.helperText}
            name="password"
            type='password'
            onChange={handleChange}
            id="outlined-basic" label="Password" variant="outlined" />
        </div>
        <Button
          onClick={onLoginClick}
          disabled={disableButton}
          color="success"
          variant="contained">Login</Button>
        {/* </div> */}
      </div>
    </div>
  );
};
Signin.propTypes = {
  loginClick: PropTypes.func.isRequired,
};
export default Signin;
