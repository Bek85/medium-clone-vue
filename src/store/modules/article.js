import feedsApi from '@/api/feedsApi';
import router from '@/router';

const state = {
  articleData: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',
  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure',
  createArticleStart: '[article] createArticleStart',
  createArticleSuccess: '[article] createArticleSuccess',
  createArticleFailure: '[article] createArticleFailure',
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.articleData = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.articleData = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
  [mutationTypes.createArticleStart]() {
    state.isSubmitting = true;
  },
  [mutationTypes.createArticleSuccess]() {
    state.isSubmitting = false;
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle',
  createArticle: '[article] createArticle',
};

const actions = {
  async [actionTypes.getArticle](context, { slug }) {
    try {
      context.commit(mutationTypes.getArticleStart);
      const res = await feedsApi.getArticle(slug);
      context.commit(mutationTypes.getArticleSuccess, res.data.article);
    } catch (error) {
      context.commit(mutationTypes.getArticleFailure, error.message);
    }
  },

  async [actionTypes.deleteArticle](context, { slug }) {
    try {
      context.commit(mutationTypes.deleteArticleStart);
      await feedsApi.deleteArticle(slug);
      context.commit(mutationTypes.deleteArticleSuccess);
      router.push({ name: 'globalFeed' });
    } catch (error) {
      context.commit(mutationTypes.deleteArticleFailure, error.message);
    }
  },
  async [actionTypes.createArticle](context, formData) {
    try {
      context.commit(mutationTypes.createArticleStart);
      const { data } = await feedsApi.createArticle(formData);
      const slug = data.article.slug;
      context.commit(mutationTypes.createArticleSuccess);

      router.push({ name: 'article', params: { slug } });
    } catch (error) {
      context.commit(mutationTypes.createArticleFailure, error.message);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
