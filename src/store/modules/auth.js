import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistantStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
};

const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      context.commit('registerStart');
      authApi
        .register(credentials)
        .then(res => {
          context.commit('registerSuccess', res.data.user);
          setItem('accessToken', res.data.user.token);
          resolve(res.data.user);
        })
        .catch(result => {
          context.commit('registerFail', result.response.data.errors);
        });
    });
  }
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
  registerFail(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
