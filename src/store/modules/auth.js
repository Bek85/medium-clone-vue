const state = {
  isSubmitting: false
};

const actions = {
  register() {}
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  }
};

export default {
  state,
  actions,
  mutations
};
