import feedApi from '@/api/feedApi';

const state = {
  data: null,
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
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
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
  async [actionTypes.getFeed](context, queryParams) {
    try {
      context.commit(mutationTypes.getFeedStart);
      const res = await feedApi.getFeed(queryParams);
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
