import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import getArticles from '@/store/modules/articles/getArticles';
import popularTags from '@/store/modules/tags';
import getArticle from '@/store/modules/articles/getArticle';
import createArticle from '@/store/modules/articles/createArticle';
import updateArticle from '@/store/modules/articles/updateArticle';
import deleteArticle from '@/store/modules/articles/deleteArticle';
import settings from '@/store/modules/settings';

settings;
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    getArticles,
    popularTags,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    settings,
  },
});
