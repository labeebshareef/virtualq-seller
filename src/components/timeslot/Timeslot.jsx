
import React from 'react';

import PropTypes from 'prop-types';

import {DeleteOutline} from '@mui/icons-material';
import './timeslot.css';
import {DataGrid} from '@mui/x-data-grid';

/**
 * appointmentRequest manage.
 * @param {object} timeslotData.
 * @param {func} handleDeleteClick.
 * @return {component} returns component
 */
function TimeslotList({timeslotData, handleDeleteClick}) {
  const columns = [
    {
      field: 'timeslot',
      headerName: 'Timeslot',
      valueGetter: (params) => {
        const startTime = new Date(params.row.startTime);
        const endTime = new Date(params.row.endTime);
        return (startTime.getHours() + ':' + startTime.getMinutes() + ' - ' +
              endTime.getHours() + ':' + endTime.getMinutes());
      },
      width: 120,
    },
    {
      field: 'numberOfSlots',
      headerName: 'Number of slots',
      width: 250,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDeleteClick(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={timeslotData}
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      getRowId={(row) => row._id}
    />
  );
}
TimeslotList.propTypes = {
  handleDeleteClick: PropTypes.func.isRequired,
  timeslotData: PropTypes.object.isRequired,
};
export default TimeslotList;
