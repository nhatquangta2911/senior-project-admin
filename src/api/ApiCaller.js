import axios from 'axios';

const baseUrl = 'http://54.169.190.136/api';
// const baseUrl = 'http://localhost/api';

export default function Caller(
  endpoint,
  method = 'GET',
  body = {},
  id = '',
  token = ''
) {
  return axios(`${baseUrl}/${endpoint}`, {
    method: method,
    data: body,
    headers: {
      id,
      'x-access-token': token
    }
  });
}
