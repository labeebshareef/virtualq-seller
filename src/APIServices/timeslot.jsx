import api from './api';
import {APIConstants} from '../util/APIConstants';

export const getSellerProfile =async (successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.getSellerProfile,
        method: 'get',
      },
      successHandler,
      errorHandler,
  );
};

export const deleteTimeslot = async (body, successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.deleteTimeslot,
        method: 'post',
        body,
      },
      successHandler,
      errorHandler,
  );
};

export const addTimeSlot = async (body, successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.addTimeslot,
        method: 'post',
        body,
      },
      successHandler,
      errorHandler,
  );
};
