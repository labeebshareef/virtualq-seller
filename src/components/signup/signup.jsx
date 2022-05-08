import React, {useState} from 'react';

import PropTypes from 'prop-types';
import {useSnackbar} from 'react-simple-snackbar';

import TextField from '@mui/material/TextField';

import {Button, IconButton} from '@mui/material';
import {sentOtp, signUp} from '../../APIServices';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './signup';

const Signup = ({loginClick}) => {
  const [values, setValues] = useState({
    username: '',
    sellerId: '',
    fullName: '',
    otp: '',
    password: '',
  });

  const [error, setError] = useState({
    fullName: {error: false, helperText: ''},
    username: {},
    otp: {},
    password: {},
  });

  const [next, setNext] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableSignUpButton, setDisableSignUpButton] = useState(false);
  const [openSnackbar] = useSnackbar();
  const navigate = useNavigate();

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

  const onNextClick = (e) => {
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
    console.log(values.username);
    if (errorCount === 0) {
      setError({
        username: {},
      });
      const sentOtpBody = {
        email: values.username,
      };
      setDisableNextButton(true);
      sentOtp(sentOtpBody, successHandler, errorHandler);
    }
  };

  const successHandler = (response) => {
    if (response.success) {
      console.log(response);
      setValues({...values, sellerId: response.result._id});
      setNext(true);
    } else {
      openSnackbar(response.message);
    }
    setDisableNextButton(false);
  };

  const signupSuccessHandler = (response) => {
    if (response.success) {
      localStorage.setItem('userLoggedIn', true);
      localStorage.setItem('token', response.result.token);
      localStorage.setItem('user', {
        email: response.result.sellerDetails.email,
        fullName: response.result.sellerDetails.fullName,
      });
      navigate('/appointment');
    } else {
      openSnackbar(response.message);
    }
    setDisableSignUpButton(false);
  };

  const errorHandler = async (response) => {
    openSnackbar(response.error.response.data.message);
    setDisableNextButton(false);
  };

  const onBackClick = () => {
    setNext(false);
  };

  const onSignupClick = () => {
    let errorCount = 0;
    if (!values.fullName) {
      setError({
        ...error,
        username: {
          error: true,
          helperText: 'full name required',
        },
      });
      errorCount++;
    }
    if (!values.otp) {
      setError({
        ...error,
        username: {
          error: true,
          helperText: 'otp required',
        },
      });
      errorCount++;
    }
    if (!values.password) {
      setError({
        ...error,
        username: {
          error: true,
          helperText: 'password required',
        },
      });
      errorCount++;
    }
    if (errorCount === 0) {
      setDisableSignUpButton(true);
      const bodyData = {
        emailOtp: values.otp,
        fullName: values.fullName,
        sellerId: values.sellerId,
        password: values.password,
      };
      signUp(bodyData, signupSuccessHandler, errorHandler);
    }
  };
  return (
    <div className='innerSection'>
      <div className='login-component'>
        {!next &&<>
          <div className='input-field'>
            <TextField
              className='input-field'
              value={values.username}
              error={error?.username?.error}
              helperText={error?.username?.helperText}
              name="username"
              onChange={handleChange}
              id="outlined-basic" label="Email" variant="outlined" />
          </div>
          <Button
            onClick={onNextClick}
            disabled={disableNextButton}
            color="success"
            variant="contained">Next</Button>
        </>
        }
        {next &&<>
          <IconButton aria-label="delete" onClick={onBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <div className='input-field'>
            <TextField
              className='input-field'
              value={values.fullName}
              error={error?.fullName?.error}
              helperText={error?.fullName?.helperText}
              name="fullName"
              onChange={handleChange}
              id="outlined-basic" label="Business name" variant="outlined" />
          </div>
          <div className='input-field'>
            <TextField
              className='input-field'
              value={values.otp}
              error={error?.otp?.error}
              helperText={error?.otp?.helperText}
              name="otp"
              onChange={handleChange}
              id="outlined-basic" label="Email OTP" variant="outlined" />
          </div>
          <div className='input-field'>
            <TextField
              className='input-field'
              value={values.password}
              error={error?.password?.error}
              helperText={error?.password?.helperText}
              name="password"
              type='password'
              onChange={handleChange}
              id="outlined-basic" label="Password" variant="outlined" />
          </div>
          <Button
            onClick={onSignupClick}
            disabled={disableSignUpButton}
            color="success"
            variant="contained">Sign up</Button>
        </>
        }
      </div>
    </div>
  );
};
Signup.propTypes = {
  loginClick: PropTypes.func,
};
export default Signup;
