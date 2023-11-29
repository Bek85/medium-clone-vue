import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import feeds from '@/store/modules/feed';
import popularTags from '@/store/modules/tags';
import article from '@/store/modules/articles/deleteArticle';
import getArticle from '@/store/modules/articles/getArticle';
import createArticle from '@/store/modules/articles/createArticle';
import updateArticle from '@/store/modules/articles/updateArticle';
import deleteArticle from '@/store/modules/articles/deleteArticle';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feeds,
    popularTags,
    article,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
  },
});
