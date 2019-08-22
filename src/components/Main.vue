<template>
  <div>
    <Navigator />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navigator from './Navigator.vue'
export default {
  components: {
    Navigator,
  }
}
</script>
