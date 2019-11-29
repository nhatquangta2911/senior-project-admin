import Caller from './ModelApiCaller';

const prefix = 'activationFunctions/';

export default {
  getAll() {
    return Caller(prefix, 'GET');
  }
};
