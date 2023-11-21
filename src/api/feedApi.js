import api from '@/api/api';

const URLS = {
  feedUrl: '/articles',

};

const getFeed = () => {
  return api.get(URLS.feedUrl);
};

export default {
  getFeed
};
