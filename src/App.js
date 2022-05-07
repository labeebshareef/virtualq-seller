import React from 'react';

import './App.css';
import Appointment from './pages/appointment/appointment';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Timeslot from './pages/timeslot/Timeslot';
import ProtectedRoute from './services/ProtectedRoutes';
import SnackbarProvider from 'react-simple-snackbar';

const App = () => {
  return (
    <SnackbarProvider>
      <Router>
        {/* <Topbar /> */}
        {/* <div className="container"> */}
        {/* <Sidebar /> */}
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route exact
            element={<ProtectedRoute />}
          >
            <Route exact path="/appointment"
              element={<Layout component={<Appointment />} />}>

            </Route>
            <Route path="/timeslot"
              element={<Layout component={<Timeslot />} />}>
            </Route>
          </Route>
        </Routes>
        {/* </div> */}
      </Router>
    </SnackbarProvider>
  );
};

export default App;
