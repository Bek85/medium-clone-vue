import { createRouter, createWebHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Register.vue'),
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  { path: '/feed', name: 'yourFeed', component: GlobalFeed },
  { path: '/tags/:slug', name: 'tag', component: GlobalFeed },
  { path: '/articles/:slug', name: 'article', component: GlobalFeed },
  { path: '/articles/new', name: 'createArticle', component: GlobalFeed },
  { path: '/articles/:slug/edit', name: 'editArticle', component: GlobalFeed },
  { path: '/settings', name: 'settings', component: GlobalFeed },
  { path: '/profiles/:slug', name: 'userProfile', component: GlobalFeed },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
