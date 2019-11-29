import Caller from './ModelApiCaller';

const prefix = 'transactions/';

export default {
  getAll() {
    return Caller(prefix, 'GET');
  },
  add(transaction) {
    return Caller(prefix, 'POST', transaction);
  }
};
