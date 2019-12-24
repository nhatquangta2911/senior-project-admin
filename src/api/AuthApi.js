import Caller from './ApiCaller';

const prefix = 'users/';

export default {
  login(user) {
    return Caller(prefix + 'login', 'POST', user);
  },
  getAll() {
    return Caller(prefix, 'GET');
  },
  ban(id) {
    return Caller(prefix + 'ban', 'POST', {}, id);
  },
  active(id) {
    return Caller(prefix + 'active', 'POST', {}, id);
  }
};
