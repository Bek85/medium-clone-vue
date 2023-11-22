import api from '@/api/api';

const URLS = {
  feedUrl: '/articles',
};

const getFeed = (queryParams) => {
  if (queryParams) {
    return api.get(`${URLS.feedUrl}/?${queryParams}`);
  } else {
    return api.get(URLS.feedUrl);
  }
};

export default {
  getFeed,
};
