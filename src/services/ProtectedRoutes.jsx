import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
const ProtectedRoute = () => {
  const auth = localStorage.getItem('userLoggedIn');
  // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
