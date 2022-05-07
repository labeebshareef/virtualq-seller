import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useSnackbar} from 'react-simple-snackbar';
import {useNavigate} from 'react-router-dom';

import Signin from '../signin/Signin';
import Signup from '../signup/signup';
import {login} from '../../APIServices';

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const LoginComponent = () => {
  const [value, setValue] = React.useState(0);
  const [openSnackbar] = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const loginClick = async (values) => {
    const bodyData = {
      email: values.username,
      password: values.password,
    };
    await login(bodyData, successHandler, errorHandler);
    console.log('test', values);
  };
  const successHandler = (response) => {
    if (response.success) {
      localStorage.setItem('userLoggedIn', true);
      localStorage.setItem('token', response.result.token);
      localStorage.setItem('user', {
        email: response.result.email,
        fullName: response.result.fullName,
      });
      navigate('/appointment');
    } else {
      openSnackbar(response.message);
    }
  };
  const errorHandler = async (response) => {
    openSnackbar(response.error.response.data.message);
  };
  return (
    <Box sx={{width: '100%', height: '60vh'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Signup" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Signin loginClick={loginClick} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup/>
      </TabPanel>
    </Box>
  );
};

export default LoginComponent;
