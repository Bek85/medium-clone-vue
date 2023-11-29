import authApi from '@/api/authApi';
import router from '@/router';
import { setItem } from '@/helpers/persistToStorage';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

  logout: '[auth] logout',
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
    state.isLoggedIn = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoading = false;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },
  [mutationTypes.updateCurrentUserFailure](state, payload) {
    state.validationErrors = payload;
  },
  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

export const authActionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};

const actions = {
  async [authActionTypes.register](context, credentials) {
    try {
      context.commit(mutationTypes.registerStart);

      const res = await authApi.register(credentials);

      context.commit(mutationTypes.registerSuccess, res.data.user);

      setItem('accessToken', res.data.user.token);

      router.push({ name: 'globalFeed' });
    } catch (error) {
      context.commit(mutationTypes.registerFailure, error.response.data.errors);
    }
  },

  async [authActionTypes.login](context, credentials) {
    try {
      context.commit(mutationTypes.loginStart);

      const res = await authApi.login(credentials);

      context.commit(mutationTypes.loginSuccess, res.data.user);

      setItem('accessToken', res.data.user.token);

      router.push({ name: 'globalFeed' });
    } catch (error) {
      context.commit(mutationTypes.loginFailure, error.response.data.errors);
    }
  },

  async [authActionTypes.getCurrentUser](context) {
    try {
      context.commit(mutationTypes.getCurrentUserStart);

      const res = await authApi.getCurrentUser();

      context.commit(mutationTypes.getCurrentUserSuccess, res.data.user);

      router.push({ name: 'globalFeed' });
    } catch {
      context.commit(mutationTypes.getCurrentUserFailure);
    }
  },
  async [authActionTypes.updateCurrentUser](context, formData) {
    try {
      context.commit(mutationTypes.updateCurrentUserStart);

      const res = await authApi.updateCurrentUser(formData);

      context.commit(mutationTypes.updateCurrentUserSuccess, res.data.user);

      router.push({ name: 'globalFeed' });
    } catch (error) {
      context.commit(
        mutationTypes.updateCurrentUserFailure,
        error.response.data.errors
      );
    }
  },
  [authActionTypes.logout](context) {
    setItem('accessToken', '');
    context.commit(mutationTypes.logout);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
