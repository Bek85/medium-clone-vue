import feedsApi from '@/api/articlesApi';
import router from '@/router';

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  updateArticleStart: '[article] updateArticleStart',
  updateArticleSuccess: '[article] updateArticleSuccess',
  updateArticleFailure: '[article] updateArticleFailure',
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

export const updateArticleActionTypes = {
  updateArticle: '[article] updateArticle',
};

const actions = {
  async [updateArticleActionTypes.updateArticle](context, { slug, formData }) {
    try {
      context.commit(mutationTypes.updateArticleStart);
      await feedsApi.updateArticle(slug, formData);

      context.commit(mutationTypes.updateArticleSuccess);

      router.push({ name: 'article', params: { slug } });
    } catch (error) {
      context.commit(
        mutationTypes.updateArticleFailure,
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
