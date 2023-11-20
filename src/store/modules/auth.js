import authApi from '@/api/authApi';
import router from '@/router';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = false;
    state.validationErrors = payload;
  },
};

const actions = {
  async register(context, credentials) {
    try {
      context.commit('registerStart');
      const res = await authApi.register(credentials);
      context.commit('registerSuccess', res.data.user);
      router.push({ name: 'home' });
    } catch (error) {
      context.commit('registerFailure', error.response.data.errors);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
