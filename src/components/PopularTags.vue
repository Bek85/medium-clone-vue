<template>
  <div>
    <McvSpinner v-if="isLoading" />
    <div v-if="error">Something went wrong...</div>
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

export default {
  name: 'McvPopularTags',
  components: {
    McvSpinner,
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      popularTags: (state) => state.popularTags.tags,
      error: (state) => state.popularTags.error,
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypes.getTags);
  },
};
</script>
