<template>
  <div>
    <McvSpinner v-if="isLoading" />
    <McvErrorMessage v-if="error" :message="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
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
              class="author"
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <McvAddToFavorites
              :is-favorited="article.favorited"
              :favorites-count="article.favoritesCount"
              :article-slug="article.slug"
            />
          </div>
        </div>
        <router-link
          class="preview-link"
          :to="{ name: 'article', params: { slug: article.slug } }"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <McvTagList :tagList="article.tagList" />
        </router-link>
      </div>

      <McvPagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getArticlesActionTypes } from '@/store/modules/articles/getArticles';
import McvPagination from '@/components/Pagination.vue';
import { limit } from '@/helpers/constants';
import queryString from 'query-string';
import McvSpinner from './Spinner.vue';
import McvErrorMessage from './ErrorMessage.vue';
import McvTagList from '@/components/TagList.vue';
import McvAddToFavorites from '@/components/AddToFavorites.vue';

export default {
  name: 'McvFeed',
  components: {
    McvPagination,
    McvSpinner,
    McvErrorMessage,
    McvTagList,
    McvAddToFavorites,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      limit,
    };
  },
  computed: {
    ...mapState({
      feed: (state) => state.getArticles.articles,
      isLoading: (state) => state.getArticles.isLoading,
      error: (state) => state.getArticles.error,
    }),
    currentPage() {
      return +this.$route.query.page || 1;
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchArticles();
    },
  },

  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      const parsedUrl = queryString.parseUrl(this.apiUrl);
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

      this.$store.dispatch(getArticlesActionTypes.getArticles, {
        apiUrl: apiUrlWithParams,
      });
    },
  },
};
</script>
