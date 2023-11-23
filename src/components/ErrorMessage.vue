<template>
  <div class="error-message">{{ message }}</div>
</template>

<script>
export default {
  name: '   McvErrorMessage',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Something went wrong...',
    },
  },
};
</script>

<style scoped>
.error-message {
  color: #ff0000;
  text-align: center;
  font-weight: 600;
}
</style>
