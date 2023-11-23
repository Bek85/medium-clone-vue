import { createRouter, createWebHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
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
    component: () =>
      import(/* webpackChunkName: "feed" */ '@/views/YourFeed.vue'),
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: () =>
      import(/* webpackChunkName: "tag" */ '@/views/TagFeed.vue'),
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: GlobalFeed,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
