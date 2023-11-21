<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from '@/components/Feed.vue';
export default {
  name: 'McvGlobalFeed',
  components: {
    Feed,
  },
  data() {
    return {
      apiUrl: '/articles',
    };
  },
};
</script>
