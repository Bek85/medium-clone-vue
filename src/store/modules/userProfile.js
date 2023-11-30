import userProfile from '@/api/userProfileApi';

const state = {
  userProfile: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getUserProfileStart: '[userProfile] Get userProfile start',
  getUserProfileSuccess: '[userProfile] Get userProfile success',
  getUserProfileFailure: '[userProfile] Get userProfile failure',
};

export const userProfileActionTypes = {
  getUserProfile: '[userProfile] Get userProfile',
};

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true;
    state.userProfile = null;
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.userProfile = payload;
  },
  [mutationTypes.getUserProfileFailure](state, payload) {
    state.error = payload;
    state.isLoading = false;
  },
};

const actions = {
  [userProfileActionTypes.getUserProfile](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart);
      userProfile
        .getUserProfile(slug)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile);
          resolve(userProfile);
        })
        .catch((error) => {
          context.commit(
            mutationTypes.getUserProfileFailure,
            error.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
