import api from '@/api/api';

const URLS = {
  tagsUrl: '/tags',
};

const getPopularTags = () => {
  return api.get(URLS.tagsUrl);
};

export default {
  getPopularTags,
};
