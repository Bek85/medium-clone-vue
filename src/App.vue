<template>
  <div>
    <McvTopbar />
    <router-view></router-view>
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar';
export default {
  name: 'McvApp',
  components: {
    McvTopbar
  }
};
</script>
