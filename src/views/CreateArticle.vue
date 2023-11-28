<template>
  <div>
    Create Article Page
    <McvArticleForm
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue';

export default {
  name: 'MvcCreateArticle',
  components: {
    McvArticleForm,
  },

  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      validationErrors: null,
      isSubmitting: false,
    };
  },

  methods: {
    onSubmit(data) {
      console.log('Submitting...', data);
    },
  },
};
</script>
