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
import { getArticleActionTypes } from '@/store/modules/articles/getArticle';

import { mapState } from 'vuex';
import McvSpinner from '@/components/Spinner.vue';

import { updateArticleActionTypes } from '@/store/modules/articles/updateArticle';

export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvSpinner,
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.getArticle.isLoading,
      isSubmitting: (state) => state.article.isSubmitting,
      validationErrors: (state) => state.article.validationErrors,
      article: (state) => state.getArticle.articleData,
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
    this.$store.dispatch(getArticleActionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },

  methods: {
    onSubmit(formData) {
      const slug = this.$route.params.slug;
      this.$store.dispatch(updateArticleActionTypes.updateArticle, {
        slug,
        formData,
      });
    },
  },
};
</script>
