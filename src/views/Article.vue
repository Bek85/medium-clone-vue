<template>
  <div>Article</div>
</template>

<script>
import { actionTypes } from '@/store/modules/article';

export default {
  name: 'MvcArticle',

  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
