import articlesApi from '@/api/articlesApi';

const state = {
  articles: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticlesStart: '[feed] getArticlesStart',
  getArticlesSuccess: '[feed] getArticlesSuccess',
  getArticlesFailure: '[feed] getArticlesFailure',
};

const mutations = {
  [mutationTypes.getArticlesStart](state) {
    state.isLoading = true;
    state.articles = null;
    state.error = null;
  },
  [mutationTypes.getArticlesSuccess](state, payload) {
    state.isLoading = false;
    state.articles = payload;
  },
  [mutationTypes.getArticlesFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

export const getArticlesActionTypes = {
  getArticles: '[article] getArticles',
};

const actions = {
  async [getArticlesActionTypes.getArticles](context, { apiUrl }) {
    try {
      context.commit(mutationTypes.getArticlesStart);
      const res = await articlesApi.getArticles(apiUrl);
      context.commit(mutationTypes.getArticlesSuccess, res.data);
    } catch (error) {
      context.commit(mutationTypes.getArticlesFailure, error.message);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
