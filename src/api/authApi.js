import api from '@/api/api';

const URLS = {
  registerUrl: '/users',
  loginUrl: '/users'
};

const register = (credentials) => {
  return api.post(URLS.registerUrl, credentials);
};

const login = (credentials) => {
  return api.post(URLS.loginUrl, credentials)
}

export default {
  register,
  login
};
