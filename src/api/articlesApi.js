import api from '@/api/api';

const URLS = {
  articleUrl: '/articles',
};

const getArticles = (apiUrl) => {
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
  return api.put(`${URLS.articleUrl}/${slug}`, { article: formData });
};

// add to favorites function
const addToFavorites = (slug) => {
  return api.post(`${URLS.articleUrl}/${slug}/favorite`);
};

// remove from favorites function
const removeFromFavorites = (slug) => {
  return api.delete(`${URLS.articleUrl}/${slug}/favorite`);
};

export default {
  getArticles,
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
  addToFavorites,
  removeFromFavorites,
};
