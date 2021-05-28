import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistantStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
};

export const actionTypes = {
  register: '[auth] register'
};

const actions = {
  [actionTypes.register]({ commit }, credentials) {
    return new Promise(resolve => {
      commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then(res => {
          commit(mutationTypes.registerSuccess, res.data.user);
          setItem('accessToken', res.data.user.token);
          resolve(res.data.user);
        })
        .catch(result => {
          commit(mutationTypes.registerFailure, result.response.data.errors);
        });
    });
  }
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure'
};

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
    state.validationErrors = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
