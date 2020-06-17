<template>
  <LongRentOrder v-if="type === 'long'" />
  <ShortRentOrder v-else />
</template>

<script>
import LongRentOrder from '@/components/LongRentOrder.vue'
import ShortRentOrder from '@/components/ShortRentOrder.vue'
export default {
  data () {
    return {
      type: this.$store.state.order.type
    }
  },
  components: {
    LongRentOrder,
    ShortRentOrder,
  }
}
</script>