import React, {useEffect, useState} from 'react';

import './appointment.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AppointmentRequest
  from '../../components/appointmentRequest/AppointmentRequest';
import {
  showUpcomingAppointmentRequest,
  manageAppointmentRequest,
  listPreviousAppointmentRequests,
} from '../../APIServices';

/**
 * @return {Component} topbar.
 */
export default function Appointment() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [previousappointmentData, setPreviousAppointmentData] = useState([]);

  const [value, setValue] = React.useState(0);
  const [ARButtonDisable, setARButtonDisable] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getAppointmentData();
    getPreviousAppointmentData();
  }, []);
  const successHandler = (response) => {
    setAppointmentData(response.result);
    // dispatch(showHideLoader(false));
  };
  const previousSuccessHandler = (response) => {
    console.log('previousappointmentData', response.result);
    setPreviousAppointmentData(response.result);
    // dispatch(showHideLoader(false));
  };
  const errorHandler = (response) => {
    setARButtonDisable(false);
    // dispatch(showHideLoader(false));
  };
  const getAppointmentData = async () => {
    await showUpcomingAppointmentRequest(successHandler, errorHandler);
  };
  const getPreviousAppointmentData = async () => {
    await listPreviousAppointmentRequests(previousSuccessHandler, errorHandler);
  };
  const acceptRejectSuccessHandler = (response) => {
    getAppointmentData();
    setARButtonDisable(false);
    // dispatch(showHideLoader(false));
  };
  const handleAcceptRejectClick = async (appointmentRequestId, accept) => {
    setARButtonDisable(true);
    const bodyObject = {
      appointmentRequestId: appointmentRequestId,
      accept: accept,
    };
    await manageAppointmentRequest(bodyObject,
        acceptRejectSuccessHandler, errorHandler);
  };

  const a11yProps = (index) => {
    return {
      'id': `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <div className="home">
      <h1>Appointments</h1>
      <Box sx={{width: '90%', height: '80%'}}>
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
        <Tabs value={value} onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Previous" {...a11yProps(1)} />
        </Tabs>
        {/* </Box> */}
        {value === 0 && <AppointmentRequest
          appointmentData={appointmentData}
          handleAcceptRejectClick={handleAcceptRejectClick}
          upcoming={true}
          ARButtonDisable={ARButtonDisable}
        />}
        {value === 1 && <AppointmentRequest
          appointmentData={previousappointmentData}
          handleAcceptRejectClick={handleAcceptRejectClick}
          upcoming={false}
          ARButtonDisable={ARButtonDisable}
        />}

      </Box>

    </div>
  );
}
