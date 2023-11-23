import feedsApi from '@/api/feedsApi';

const state = {
  article: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.article = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

export const actionTypes = {
  getArticle: '[article] getArticle',
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
};

export default {
  state,
  mutations,
  actions,
};
