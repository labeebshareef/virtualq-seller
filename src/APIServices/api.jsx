import {BASE_WEB_URL} from '../util/constants';
import axios from 'axios';

/**
 * Axios API Handler
 * @param {object} { url, method, body, secure }
 * @param {function} successHandler Pass success handling function
 * @param {function} errorHandler Pass error handling function
 */
export default function api(
    {
      url,
      method = 'get',
      headers,
      body = {},
      secure = true,
    },
    successHandler = null,
    errorHandler = null,
) {
  // Success Handling
  const triggerSuccessHandler = (response) =>
    successHandler ? successHandler(response) : null;

  // URL
  const apiUrl = `${BASE_WEB_URL}${url}`;

  const token = localStorage.getItem('token');

  // Headers
  let headersData = {
    ...headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token,
  };

  // Authorization
  if (secure) {
    headersData = {
      ...headersData,
      // Authorization: `Token ${LSToken}`,
    };
  }
  const status = null;

  // API Call
  axios({
    method,
    url: apiUrl,
    data: body,
    headers: headersData,
  })
      .then((response) => {
        if (status && status > 399) {
          return errorHandler ? errorHandler(response) : null;
        } else {
          console.log(response, status);
          const responseBody = (response && response.data) || null;
          return triggerSuccessHandler(responseBody, response);
        }
      })
      .catch((error) => {
        const errorObj = {error};
        return errorHandler ? errorHandler(errorObj) : null;
      });
}
