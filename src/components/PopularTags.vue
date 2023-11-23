<template>
  <div>
    <McvSpinner v-if="isLoading" />
    <McvErrorMessage v-if="error" :message="error" />
    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          class="tag-default tag-pill"
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{ name: 'tag', params: { slug: popularTag } }"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/tags';
import { mapState } from 'vuex';
import McvSpinner from './Spinner.vue';
import McvErrorMessage from './ErrorMessage.vue';

export default {
  name: 'McvPopularTags',
  components: {
    McvSpinner,
    McvErrorMessage,
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      popularTags: (state) => state.popularTags.tags,
      error: (state) => state.popularTags.error,
    }),
  },

  methods: {
    getTags() {
      this.$store.dispatch(actionTypes.getTags);
    },
  },

  mounted() {
    this.getTags();
  },
};
</script>
