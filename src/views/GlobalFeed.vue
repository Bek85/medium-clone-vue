<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <McvFeed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <McvPopularTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue';
import McvPopularTags from '@/components/PopularTags.vue';

export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
    McvPopularTags,
  },
  data() {
    return {
      apiUrl: '/articles',
    };
  },
};
</script>
