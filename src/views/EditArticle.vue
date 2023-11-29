<template>
  <div>
    <McvSpinner v-if="isLoading" />
    <McvArticleForm
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue';
import { actionTypes } from '@/store/modules/article';
import { mapState } from 'vuex';
import McvSpinner from '@/components/Spinner.vue';

export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvSpinner,
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      isSubmitting: (state) => state.article.isSubmitting,
      validationErrors: (state) => state.article.validationErrors,
      article: (state) => state.article.articleData,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },

  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },

  methods: {
    onSubmit(formData) {
      const slug = this.$route.params.slug;
      this.$store.dispatch(actionTypes.updateArticle, { slug, formData });
    },
  },
};
</script>
