<template>
  <div id="main">
    <Navigator />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navigator from '@/components/Navigator.vue'

export default {
  components: {
    Navigator
  }
};
</script>
<style>
#main {
  height: 100%;
  width: 100%;
}
</style>