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

const createArticle = (formData) => {
  return api.post(URLS.articleUrl, { article: formData });
};

const updateArticle = (slug, formData) => {
  return api.put(`${URLS.articleUrl}/${slug}`, formData);
};

export default {
  getFeeds,
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
};
