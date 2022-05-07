import React, {useState} from 'react';

import PropTypes from 'prop-types';
import {useSnackbar} from 'react-simple-snackbar';

import TextField from '@mui/material/TextField';

import {Button, IconButton} from '@mui/material';
import {sentOtp, signUp} from '../../APIServices';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  };


  const errorHandler = async (response) => {
    openSnackbar(response.error.response.data.message);
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
          <TextField
            value={values.username}
            error={error?.username?.error}
            helperText={error?.username?.helperText}
            name="username"
            onChange={handleChange}
            id="outlined-basic" label="Email" variant="outlined" />
          <Button
            onClick={onNextClick}
            color="success"
            variant="contained">Next</Button>
        </>
        }
        {next &&<>
          <IconButton aria-label="delete" onClick={onBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <TextField
            value={values.fullName}
            error={error?.fullName?.error}
            helperText={error?.fullName?.helperText}
            name="fullName"
            onChange={handleChange}
            id="outlined-basic" label="Full name" variant="outlined" />
          <TextField
            value={values.otp}
            error={error?.otp?.error}
            helperText={error?.otp?.helperText}
            name="otp"
            onChange={handleChange}
            id="outlined-basic" label="Email OTP" variant="outlined" />
          <TextField
            value={values.password}
            error={error?.password?.error}
            helperText={error?.password?.helperText}
            name="password"
            type='password'
            onChange={handleChange}
            id="outlined-basic" label="Password" variant="outlined" />
          <Button
            onClick={onSignupClick}
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
