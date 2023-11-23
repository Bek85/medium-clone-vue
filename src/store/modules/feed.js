import feedApi from '@/api/feedApi';

const state = {
  feedData: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedsStart: '[feed] getFeedsStart',
  getFeedsSuccess: '[feed] getFeedsSuccess',
  getFeedsFailure: '[feed] getFeedsFailure',
};

const mutations = {
  [mutationTypes.getFeedsStart](state) {
    state.isLoading = true;
    state.feedData = null;
    state.error = null;
  },
  [mutationTypes.getFeedsSuccess](state, payload) {
    state.isLoading = false;
    state.feedData = payload;
  },
  [mutationTypes.getFeedsFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

export const actionTypes = {
  getFeeds: '[feed] getFeeds',
};

const actions = {
  async [actionTypes.getFeeds](context, { apiUrl }) {
    try {
      context.commit(mutationTypes.getFeedsStart);
      const res = await feedApi.getFeeds(apiUrl);
      context.commit(mutationTypes.getFeedsSuccess, res.data);
    } catch (error) {
      context.commit(mutationTypes.getFeedsFailure, error.message);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
