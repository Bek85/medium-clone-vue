import authApi from '@/api/authApi';
import router from '@/router';
import { setItem } from '@/helpers/persistToStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure'
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = false;
    state.validationErrors = payload;
  },
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
}

const actions = {
  async [actionTypes.register](context, credentials) {
    try {
      context.commit(mutationTypes.registerStart);
      const res = await authApi.register(credentials);
      context.commit(mutationTypes.registerSuccess, res.data.user);
      setItem('accessToken', res.data.user.token);
      router.push({ name: 'home' });
    } catch (error) {
      context.commit(mutationTypes.registerFailure, error.response.data.errors);
    }
  },

  async [actionTypes.login](context, credentials) {
    try {
      const res = await authApi.login(credentials);
      console.log(res)


    } catch (error) {
      console.log(error)

    }
  }
};

export default {
  state,
  mutations,
  actions,
};
