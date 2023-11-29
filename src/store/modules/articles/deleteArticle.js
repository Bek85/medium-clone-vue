import feedsApi from '@/api/articlesApi';
import router from '@/router';

const state = {
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure',
};

const mutations = {
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
};

export const deleteArticleActionTypes = {
  deleteArticle: '[article] deleteArticle',
};

const actions = {
  async [deleteArticleActionTypes.deleteArticle](context, { slug }) {
    try {
      context.commit(mutationTypes.deleteArticleStart);
      await feedsApi.deleteArticle(slug);
      context.commit(mutationTypes.deleteArticleSuccess);
      router.push({ name: 'globalFeed' });
    } catch (error) {
      context.commit(
        mutationTypes.deleteArticleFailure,
        error.response.data.errors
      );
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
