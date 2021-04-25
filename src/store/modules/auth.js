import authApi from '@/api/auth';

const state = {
  isSubmitting: false
};

const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      context.commit('registerStart');
      authApi
        .register(credentials)
        .then(res => {
          console.log('response', res);
          context.commit('registerSuccess', res.data.user);
          resolve(res.data.user);
        })
        .catch(result => {
          context.commit('registerFail', result.response.data.errors);
          console.log('result errors', result);
        });
    });
  }
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  },
  registerSuccess(state) {
    state.isSubmitting = false;
  },
  registerFail(state) {
    state.isSubmitting = false;
  }
};

export default {
  state,
  actions,
  mutations
};
