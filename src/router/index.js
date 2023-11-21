import { createRouter, createWebHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
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
  { path: '/user-profile', name: 'userProfile' },
  { path: '/article', name: 'article' },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
