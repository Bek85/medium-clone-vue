<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'globalFeed' }"
        >Medium Clone</router-link
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'globalFeed' }">
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'createArticle' }">
              <i class="ion-compose"></i> &nbsp; New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'settings' }">
              <i class="ion-gear-a"></i> &nbsp; Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'userProfile',
                params: { slug: currentUser.username },
              }"
            >
              <img class="user-pic" :src="currentUser.image" /> &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'login' }"
              active-class="active"
              >Sign In</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'register' }"
              active-class="active"
              >Sign Up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/auth';

export default {
  name: 'McvTopBar',
  computed: {
    // ...mapState({
    // isLoggedIn: (state) => state.auth.isLoggedIn,
    // currentUser: (state) => state.auth.currentUser,
    // }),
    // currentUser() {
    //   return this.$store.getters[getterTypes.currentUser];
    // },
    // isLoggedIn() {
    //   return this.$store.getters[getterTypes.isLoggedIn];
    // },
    // isAnonymous() {
    //   return this.$store.getters[getterTypes.isAnonymous];
    // },
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous,
    }),
  },
};
</script>
