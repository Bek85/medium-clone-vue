<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp; Follow {{ userProfile.username }}
              </button>
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
                >Edit Profile Settings</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfile' }"
                  >My Articles</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfileFavorites' }"
                  >Favorite Articles</router-link
                >
              </li>
            </ul>
          </div>
          <McvFeed :apiUrl="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userProfileActionTypes } from '@/store/modules/userProfile';
import { mapState, mapGetters } from 'vuex';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import McvFeed from '@/components/Feed.vue';
export default {
  name: 'McvUserProfile',
  components: {
    McvFeed,
  },

  computed: {
    ...mapState({
      userProfile: (state) => state.userProfile.userProfile,
      isLoading: (state) => state.userProfile.isLoading,
      error: (state) => state.userProfile.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) return false;

      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },

    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },

  watch: {
    userProfileSlug() {
      this.fetchUserProfile();
    },
  },

  methods: {
    fetchUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      });
    },
  },

  mounted() {
    this.fetchUserProfile();
  },
};
</script>
