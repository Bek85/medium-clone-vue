import api from '@/api/api';

const URLS = {
  registerUrl: '/users',
  loginUrl: '/users/login',
  currentUserUrl: '/user',
};

const register = (credentials) => {
  return api.post(URLS.registerUrl, { user: credentials });
};

const login = (credentials) => {
  return api.post(URLS.loginUrl, { user: credentials });
};

const getCurrentUser = () => {
  return api.get(URLS.currentUserUrl);
};

export default {
  register,
  login,
  getCurrentUser,
};
