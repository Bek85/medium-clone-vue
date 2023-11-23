import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import feeds from '@/store/modules/feed';
import popularTags from '@/store/modules/tags';
import article from '@/store/modules/article';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feeds,
    popularTags,
    article,
  },
});
