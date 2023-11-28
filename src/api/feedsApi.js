import api from '@/api/api';

const URLS = {
  articleUrl: '/articles',
};

const getFeeds = (apiUrl) => {
  return api.get(apiUrl);
};

const getArticle = (slug) => {
  return api.get(`${URLS.articleUrl}/${slug}`);
};

const deleteArticle = (slug) => {
  return api.delete(`${URLS.articleUrl}/${slug}`);
};

export default {
  getFeeds,
  getArticle,
  deleteArticle,
};
