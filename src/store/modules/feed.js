import feedApi from '@/api/feedApi';

const state = {
  feedData: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure',
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.feedData = null;
    state.error = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.feedData = payload;
  },
  [mutationTypes.getFeedFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

export const actionTypes = {
  getFeed: '[feed] getFeed',
};

const actions = {
  async [actionTypes.getFeed](context, { apiUrl }) {
    try {
      context.commit(mutationTypes.getFeedStart);
      const res = await feedApi.getFeed(apiUrl);
      context.commit(mutationTypes.getFeedSuccess, res.data);
    } catch (error) {
      context.commit(mutationTypes.getFeedFailure, error.message);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
