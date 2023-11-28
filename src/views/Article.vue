<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
              class="btn btn-outline-secondary btn-sm"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button class="btn btn-outline-danger btn-sm">
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <McvSpinner v-if="isLoading" />
      <McvErrorMessage v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>

          <div class="tag-list">
            <span
              v-for="tag in article.tagList"
              :key="tag"
              class="tag-default tag-pill"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvErrorMessage from '@/components/ErrorMessage.vue';
import McvSpinner from '@/components/Spinner.vue';
import { actionTypes as articleActionType } from '@/store/modules/article';
import { mapState, mapGetters } from 'vuex';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';

export default {
  name: 'MvcArticle',
  components: {
    McvSpinner,
    McvErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      error: (state) => state.article.error,
      article: (state) => state.article.articleData,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) return false;

      return this.currentUser.username === this.article.author.username;
    },
  },
  mounted() {
    this.$store.dispatch(articleActionType.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>
