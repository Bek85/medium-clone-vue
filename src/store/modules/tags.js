import tagsApi from '@/api/tagsApi';

const state = {
  tags: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getTagsStart: '[tags] getTagsStart',
  getTagsSuccess: '[tags] getTagsSuccess',
  getTagsFailure: '[tags] getTagsFailure',
};

const mutations = {
  [mutationTypes.getTagsStart](state) {
    state.isLoading = true;
    state.tags = null;
  },
  [mutationTypes.getTagsSuccess](state, payload) {
    state.isLoading = false;
    state.tags = payload;
  },
  [mutationTypes.getTagsFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

export const actionTypes = {
  getTags: '[tags] getTags',
};

const actions = {
  async [actionTypes.getTags](context) {
    try {
      context.commit(mutationTypes.getTagsStart);
      const res = await tagsApi.getPopularTags();
      context.commit(mutationTypes.getTagsSuccess, res.data.tags);
    } catch (error) {
      context.commit(mutationTypes.getTagsFailure, error.message);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
