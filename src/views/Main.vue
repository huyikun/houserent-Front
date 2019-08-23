<template>
  <div>
    <Navigator />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
<<<<<<< HEAD:src/views/Main.vue
import Navigator from '@/components/Navigator.vue'
=======
import Navigator from "../components/Navigator";
>>>>>>> ae99de777764e1d8534184c47bc9931bd446b756:src/views/Main.vue
export default {
  components: {
    Navigator
  }
};
</script>
