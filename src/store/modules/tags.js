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
  [mutationTypes.getTagsFailure](state) {
    state.isLoading = false;
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
    } catch {
      context.commit(mutationTypes.getTagsFailure);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
