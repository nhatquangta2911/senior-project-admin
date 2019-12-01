import Caller from './ModelApiCaller';

const prefix = 'transactions/';

export default {
  getAll() {
    return Caller(prefix, 'GET');
  },
  add(transaction) {
    return Caller(prefix, 'POST', transaction);
  },
  delete(id) {
    return Caller(prefix + id, 'DELETE');
  },
  update(id, transaction) {
    return Caller(prefix + id, 'PUT', transaction);
  }
};
