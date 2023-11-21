import api from '@/api/api';

const URLS = {
  registerUrl: '/users',
  loginUrl: '/users/login'
};

const register = (credentials) => {
  return api.post(URLS.registerUrl, {user: credentials});
};

const login = (credentials) => {
  return api.post(URLS.loginUrl, {user: credentials})
}

export default {
  register,
  login
};
