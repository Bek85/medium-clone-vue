<template>
  <div id="app">
    <McvTopBar />
    <router-view />
  </div>
</template>

<script>
import McvTopBar from '@/components/TopBar.vue';
import { authActionTypes } from '@/store/modules/auth';

export default {
  name: 'McvApp',
  components: {
    McvTopBar,
  },
  mounted() {
    this.$store.dispatch(authActionTypes.getCurrentUser);
  },
};
</script>
