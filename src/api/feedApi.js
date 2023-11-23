import api from '@/api/api';

// const URLS = {
//   feedUrl: '/articles',
// };

const getFeed = (apiUrl) => {
  return api.get(apiUrl);
};

export default {
  getFeed,
};
