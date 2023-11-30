import api from '@/api/api';

const URLS = {
  userProfileUrl: '/profiles',
};

const getUserProfile = (slug) => {
  return api.post(`${URLS.userProfileUrl}/${slug}`);
};

export default {
  getUserProfile,
};
