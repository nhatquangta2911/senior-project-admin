import Caller from './ModelApiCaller';

const prefix = 'layers/';

export default {
  getAll() {
    return Caller(prefix, 'GET');
  }
};
