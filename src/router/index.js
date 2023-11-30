import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    // component: GlobalFeed,
    component: () =>
      import(/* webpackChunkName: "globalFeed" */ '@/views/GlobalFeed.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },
  {
    path: '/feed',
    name: 'yourFeed',
    // component: YourFeed,
    component: () =>
      import(/* webpackChunkName: "feeds" */ '@/views/YourFeed.vue'),
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    // component: TagFeed,
    component: () =>
      import(/* webpackChunkName: "popularTags" */ '@/views/TagFeed.vue'),
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: () =>
      import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: () =>
      import(
        /* webpackChunkName: "createArticle" */ '@/views/CreateArticle.vue'
      ),
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: () =>
      import(/* webpackChunkName: "editArticle" */ '@/views/EditArticle.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: () =>
      import(/* webpackChunkName: "userProfile" */ '@/views/UserProfile.vue'),
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: () =>
      import(
        /* webpackChunkName: "user favorites" */ '@/views/UserProfile.vue'
      ),
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
