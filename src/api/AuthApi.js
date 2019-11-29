import Caller from './ApiCaller';

const prefix = 'users/';

export default {
  login(user) {
    return Caller(prefix + 'login', 'POST', user);
  },
  getAll() {
    return Caller(prefix, 'GET');
  }
};
