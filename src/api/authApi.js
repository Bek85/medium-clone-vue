import api from '@/api/api';

const URLS = {
  registerUrl: '/users',
};

const register = (credentials) => {
  return api.post(URLS.registerUrl, credentials);
};

export default {
  register,
};
