import api from './api';
import {APIConstants} from '../util/APIConstants';

export const login = (body, successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.login,
        method: 'post',
        body,
      },
      successHandler,
      errorHandler,
  );
};

export const logout = ( successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.logout,
        method: 'get',
      },
      successHandler,
      errorHandler,
  );
};

export const sentOtp = (body, successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.sentOtp,
        method: 'post',
        body,
      },
      successHandler,
      errorHandler,
  );
};

export const signUp = (body, successHandler, errorHandler) => {
  return api(
      {
        url: APIConstants.signUp,
        method: 'post',
        body,
      },
      successHandler,
      errorHandler,
  );
};
