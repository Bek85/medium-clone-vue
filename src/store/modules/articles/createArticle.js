import articlesApi from '@/api/articlesApi';
import router from '@/router';

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: '[article] createArticleStart',
  createArticleSuccess: '[article] createArticleSuccess',
  createArticleFailure: '[article] createArticleFailure',
};

const mutations = {
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

export const createArticleActionTypes = {
  createArticle: '[article] createArticle',
};

const actions = {
  async [createArticleActionTypes.createArticle](context, formData) {
    try {
      context.commit(mutationTypes.createArticleStart);
      const { data } = await articlesApi.createArticle(formData);
      const slug = data.article.slug;
      context.commit(mutationTypes.createArticleSuccess);

      router.push({ name: 'article', params: { slug } });
    } catch (error) {
      context.commit(
        mutationTypes.createArticleFailure,
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
