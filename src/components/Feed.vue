<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Oops, something went wrong...</div>
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
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          class="preview-link"
          :to="{ name: 'article', params: { slug: article.slug } }"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span> TAG LIST
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
import { actionTypes } from '@/store/modules/feed';
import McvPagination from '@/components/Pagination.vue';
import { limit } from '@/helpers/constants';
import queryString from 'query-string';

export default {
  name: 'McvFeed',
  components: {
    McvPagination,
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
      feed: (state) => state.feed.data,
      isLoading: (state) => state.feed.isLoading,
      error: (state) => state.feed.error,
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
      this.fetchFeed();
    },
  },

  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl);
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });

      this.$store.dispatch(actionTypes.getFeed, stringifiedParams);
    },
  },
};
</script>
