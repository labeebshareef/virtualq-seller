import api from './api';
import {APIConstants} from '../util/APIConstants';

export const showUpcomingAppointmentRequest =
async (successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.upcomingAppointmentRequests,
        method: 'get',
      },
      successHandler,
      errorHandler,
  );
};

export const manageAppointmentRequest =
async (body, successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.manageAppointmentRequest,
        method: 'post',
        body,
      },
      successHandler,
      errorHandler,
  );
};

export const listPreviousAppointmentRequests =
async ( successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.listPreviousAppointmentRequests,
        method: 'get',

      },
      successHandler,
      errorHandler,
  );
};
