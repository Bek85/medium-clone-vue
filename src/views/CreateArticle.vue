<template>
  <div>
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
import { createArticleActionTypes } from '@/store/modules/articles/createArticle';
import { mapState } from 'vuex';

export default {
  name: 'McvCreateArticle',
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
    };
  },

  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },

  methods: {
    onSubmit(data) {
      this.$store.dispatch(createArticleActionTypes.createArticle, data);
    },
  },
};
</script>
