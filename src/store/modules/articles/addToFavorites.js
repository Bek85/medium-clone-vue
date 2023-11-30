import articlesApi from '@/api/articlesApi';

// create mutation types and action types
const mutationTypes = {
  addToFavoritesStart: '[favorites] addToFavoritesStart',
  addToFavoritesSuccess: '[favorites] addToFavoritesSuccess',
  addToFavoritesFailure: '[favorites] addToFavoritesFailure',
};

export const favoritesActionTypes = {
  toggleFavorites: '[favorites] addToFavorites',
};

// create mutations without state
const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},
};

// create actions
const actions = {
  async [favoritesActionTypes.toggleFavorites](context, { slug, isFavorited }) {
    try {
      context.commit(mutationTypes.addToFavoritesStart);

      const res = isFavorited
        ? await articlesApi.addToFavorites(slug)
        : await articlesApi.removeFromFavorites(slug);

      context.commit(mutationTypes.addToFavoritesSuccess, res.data.article);
    } catch (error) {
      context.commit(
        mutationTypes.addToFavoritesFailure,
        error.response.data.errors
      );
    }
  },
};

export default {
  mutations,
  actions,
};
