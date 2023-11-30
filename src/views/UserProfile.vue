<template>
  <div>
    <h1>User Profile</h1>
  </div>
</template>

<script>
import { userProfileActionTypes } from '@/store/modules/userProfile';
export default {
  name: 'McvUserProfile',

  mounted() {
    const slug = this.$route.params.slug;
    this.$store.dispatch(userProfileActionTypes.getUserProfile, { slug });
  },
};
</script>
