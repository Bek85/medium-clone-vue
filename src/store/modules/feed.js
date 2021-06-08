import feedApi from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  error: null
};

export const actionTypes = {
  getFeed: '[feed] getFeed'
};

const actions = {
  [actionTypes.getFeed]({ commit }, { apiUrl }) {
    return new Promise(resolve => {
      commit(mutationTypes.getFeedStart);
      feedApi
        .getFeed(apiUrl)
        .then(res => {
          commit(mutationTypes.getFeedSuccess, res.data);
          resolve(res.data);
        })
        .catch(() => {
          commit(mutationTypes.getFeedFailure);
        });
    });
  }
};

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure'
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },

  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },

  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false;
  }
};

export default {
  state,
  actions,
  mutations
};
