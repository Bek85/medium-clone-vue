import authApi from '@/api/authApi';

const state = {
  isSubmitting: false,
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  },
  registerSuccess(state) {
    state.isSubmitting = false;
  },
  registerFailure(state) {
    state.isSubmitting = false;
  },
};

const actions = {
  async register(context, credentials) {
    try {
      context.commit('registerStart');
      const res = await authApi.register(credentials);
      context.commit('registerSuccess', res.data.user);
      console.log('user registered successfully', res.data.user);
    } catch (error) {
      context.commit('registerFailure', error.response.data.errors);
      console.log('result errors', error.message);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
