import './login.css';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import LoginComponent from '../../components/loginComponent/loginComponent';
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (isLoggedIn) {
      navigate('/appointment');
    }
  }, []);


  return (
    <div className='main'>
      <div className='leftSection'>
        <div className="logo">
          <span className='logo-main'>VirtualQ </span>
          <span className='logo-sub'>Seller</span>
        </div>
      </div>
      <div className='sideSection'>
        <div className='loginComponent'>
          <LoginComponent/>
        </div>
      </div>
    </div>
  );
};
export default Login;
