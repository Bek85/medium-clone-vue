import axios from 'axios';
import { getItem } from '@/helpers/persistantStorage';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';
axios.interceptors.request.use(config => {
  const token = getItem('accessToken');
  const authorizationToken = token ? `Token ${token}` : '';
  config.headers.Authorization = authorizationToken;
  console.log(authorizationToken);
  return config;
});

export default axios;
