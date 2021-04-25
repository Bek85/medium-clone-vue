<template>
  <div>Validation errors: {{ validationErrors }}</div>
</template>

<script>
export default {
  name: 'McvValidationError',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  }
};
</script>
