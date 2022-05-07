import React, {useState, useEffect} from 'react';

import './timeslot.css';
import Box from '@mui/material/Box';
import {
  getSellerProfile,
  deleteTimeslot,
  addTimeSlot,
} from '../../APIServices';
import TimeslotList from '../../components/timeslot/Timeslot';
import {Button} from '@mui/material';
import {useSnackbar} from 'react-simple-snackbar';
import AddTimeslot from '../../components/addTimeslot/AddTimeslot';

/**
 * @return {Component} Timeslot.
 */
export default function Timeslot() {
  const [timeslotData, setTimeslotData] = useState([]);
  const [sellerId, setSellerId] = useState([]);
  const [openSnackbar] = useSnackbar();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getSellerProfileAPI();
  }, []);
  const successHandler = (response) => {
    setTimeslotData(response.result.timeSlots);
    setSellerId(response.result._id);
    console.log('timeslotData');

    // dispatch(showHideLoader(false));
  };
  const successAddHandler = (response) => {
    setOpen(false);
    setTimeslotData(response.result.timeSlots);
    openSnackbar('success');

    // dispatch(showHideLoader(false));
  };
  const errorHandler = async (response) => {
    openSnackbar(response.error.response.data.message);
    // dispatch(showHideLoader(false));
  };
  const getSellerProfileAPI = async () => {
    await getSellerProfile(successHandler, errorHandler);
  };
  const handleDelete = async (id) => {
    const bodyData = {
      sellerId: sellerId,
      timeslotId: id,
    };
    await deleteTimeslot(bodyData, successHandler, errorHandler);
    getSellerProfileAPI();
  };

  const handleAddTimeSlot = async (e) => {
    const bodyData = {
      startTime: e.startTime,
      endTime: e.endTime,
      noOfSlots: e.slot,
    };
    await addTimeSlot(bodyData, successAddHandler, errorHandler);
    getSellerProfileAPI();
  };

  return (
    <div className="userList">
      <div className="headerParent">
        <h1 className="timeslot-header">Timeslots
          <div className="addButton"><Button
            onClick={handleOpen}
            variant="contained">Add Timeslot</Button></div>
        </h1>
      </div>
      <AddTimeslot
        open={open}
        handleClose={handleClose}
        handleAddTimeSlot={handleAddTimeSlot}
      />
      <Box sx={{width: '80%', height: '80%'}}>
        <TimeslotList
          timeslotData={timeslotData}
          handleDeleteClick={handleDelete} />
      </Box>
    </div>
  );
}
