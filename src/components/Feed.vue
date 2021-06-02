<template>
  <div>
    Feed
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/feed';
export default {
  name: 'McvFeed',
  mounted() {
    console.log('init feed');
    this.$store.dispatch(actionTypes.getFeed, { apiUrl: this.apiUrl });
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  }
};
</script>
