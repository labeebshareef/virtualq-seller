import React from 'react';

import PropTypes from 'prop-types';

import './appointmentRequest.css';
import {DataGrid} from '@mui/x-data-grid';
import {DBCONSTANTS} from '../../util/constants';
import Button from '@mui/material/Button';

/**
 * appointmentRequest manage.
 * @param {object} appointmentData.
 * @param {func} handleAcceptRejectClick.
 * @param {bool} upcoming.
 * @return {component} returns component
 */
function AppointmentRequest({appointmentData,
  handleAcceptRejectClick, upcoming}) {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 90,
      valueGetter: (params) => params.row.userId?.fullName,
    },

    {
      field: 'email',
      headerName: 'Email',
      valueGetter: (params) => params.row.userId?.email,
      width: 250,
    },
    {
      field: 'date',
      headerName: 'Date',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.getDate() + '-' +
          (date.getMonth() + 1) + '-' + date.getFullYear();
      },
      width: 120,
    },
    {
      field: 'timeslot',
      headerName: 'Timeslot',
      valueGetter: (params) => {
        const startTime =
          new Date(params.row.appointmentId.timeslotObject.startTime);
        const endTime =
          new Date(params.row.appointmentId.timeslotObject.endTime);
        return (startTime.getHours() + ':' + startTime.getMinutes() + ' - ' +
          endTime.getHours() + ':' + endTime.getMinutes());
      },
      width: 120,
    },
    {
      field: 'remaining slots',
      headerName: 'Remaining Slots',
      valueGetter: (params) => params.row.appointmentId?.remainingSlotsNumber,
      width: 140,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        if (params.row.requestStatus === DBCONSTANTS.PENDING) {
          if (upcoming) {
            return (
              <>
                <Button variant="contained"
                  color="success"
                  onClick={() => handleAcceptRejectClick(params.row._id, true)}>
                  Accept
                </Button>
                <Button className="rejectButton"
                  variant="contained"
                  color="error"
                  onClick={() =>
                    handleAcceptRejectClick(params.row._id, false)}>
                  Reject
                </Button>
              </>
            );
          } else {
            return (
              <>
                <span className="pending">Pending</span>
              </>
            );
          }
        }
        if (params.row.requestStatus === DBCONSTANTS.ACCEPTED) {
          return (
            <>
              <span className="accepted">Accepted</span>
            </>
          );
        }
        if (params.row.requestStatus === DBCONSTANTS.REJECTED) {
          return (
            <>
              <span className="rejected">Rejected</span>
            </>
          );
        }
      },
    },
  ];
  return (
    <DataGrid
      rows={appointmentData}
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      // checkboxSelection
      getRowId={(row) => row._id}
    />
  );
}

AppointmentRequest.propTypes = {
  handleAcceptRejectClick: PropTypes.func.isRequired,
  appointmentData: PropTypes.any.isRequired,
  upcoming: PropTypes.bool.isRequired,
};

export default AppointmentRequest;
