import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistantStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
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
  },
  [actionTypes.login]({ commit }, credentials) {
    return new Promise(resolve => {
      commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then(res => {
          commit(mutationTypes.loginSuccess, res.data.user);
          setItem('accessToken', res.data.user.token);
          resolve(res.data.user);
        })
        .catch(result => {
          commit(mutationTypes.loginFailure, result.response.data.errors);
        });
    });
  }
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure'
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
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
