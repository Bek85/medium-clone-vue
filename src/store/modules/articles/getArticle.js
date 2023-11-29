import articlesApi from '@/api/articlesApi';

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

export const getArticleActionTypes = {
  getArticle: '[article] getArticle',
};

const actions = {
  async [getArticleActionTypes.getArticle](context, { slug }) {
    try {
      context.commit(mutationTypes.getArticleStart);
      const res = await articlesApi.getArticle(slug);
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
