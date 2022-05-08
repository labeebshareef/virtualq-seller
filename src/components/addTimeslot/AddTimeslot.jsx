import React, {useState} from 'react';

import PropTypes from 'prop-types';

import './addTimeslot.css';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {Button} from '@mui/material';
/**
 * add timeslot.
 * @param {bool} open boolean.
 * @param {func} handle close function.
 * @param {func} timeslot add function.
 * @return {component} returns component
 */
function AddTimeslot({open, handleClose, handleAddTimeSlot}) {
  const [values, setValues] = useState({
    startTime: new Date('2018-01-01T00:00:00.000Z'),
    endTime: new Date('2018-01-01T00:00:00.000Z'),
    slot: 0,
  });
  const [error, setError] = useState({
    startTime: {},
    endTime: {},
    slot: {},
  });
  const handleChange = (e) => {
    const {value} = e.target;
    const parsedInt = parseInt(value.toString().replace('/[^d]/g', ''));

    if (value) {
      setValues({...values, [e.target.name]: parsedInt});
    } else {
      setValues({...values, [e.target.name]: 0});
    }
    return null;
  };

  const handleStartTimeChange = (e) => {
    setValues({...values, 'startTime': e});
  };

  const handleEndTimeChange = (e) => {
    setValues({...values, 'endTime': e});
  };

  const onAddClick = (e) => {
    if (values.startTime >= values.endTime) {
      setError({
        ...error,
        startTime: {
          error: true,
          helperText: 'start time should be less than end time',
        }, endTime: {
          error: true,
          helperText: 'start time should be less than end time',
        },
      });
      console.log(error);
      return;
    }

    if (values.slot <= 0) {
      setError({
        ...error,
        slot: {
          error: true,
          helperText: 'Slot should be greater than 0',
        },
      });
      console.log(error);
      return;
    }
    handleAddTimeSlot(values);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Timeslot
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="input">
            <TimePicker
              error={error.startTime.error}
              errorStyle={error.startTime.error ? {borderColor: 'red'} :
              {borderColor: 'red'}}
              label="Start Time"
              name="startTime"
              value={values.startTime}
              onChange={handleStartTimeChange}
              renderInput={(params) => <TextField
                error={error.startTime.error}
                helperText={error.startTime.helperText}
                {...params} />}
            />
          </div>
          <div className="input">
            <TimePicker
              // error={error.endTime.error}
              label="End Time"
              name="endTime"
              value={values.endTime}
              onChange={handleEndTimeChange}
              renderInput={(params) => <TextField
                error
                helperText={error.endTime.helperText}
                {...params} />}
            />
          </div>
          <div className="input">
            <TextField
              value={values.slot}
              error={error.slot.error}
              helperText={error.slot.helperText}
              name="slot"
              onChange={handleChange}
              id="outlined-basic" label="Slot" variant="outlined" />
          </div>
        </LocalizationProvider>
        <div className="modal-button">
          <Button
            onClick={onAddClick}
            variant="contained">Add Timeslot</Button>
        </div>
      </Box>
    </Modal>
  );
}
AddTimeslot.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleAddTimeSlot: PropTypes.func.isRequired,
};

export default AddTimeslot;
