<template>
  <v-col
    style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;"
  >
    <v-card width="600px" class="mx-auto">
      <v-card-title>
        订单明细
      </v-card-title>
      <v-divider />
      <v-card-text style="text-align: left">
        承租方： {{ this.order.userName }} <br />
        出租方： {{ this.order.ownerName }} <br />
        房屋名称： {{ this.order.houseName }} <br />
        房屋地址： {{ this.order.address }} <br />
        入住日期： {{ this.order.checkinDate }} <br />
        退房日期： {{ this.order.checkoutDate }} <br />
        预订天数： {{ this.order.rentDays }} <br />
        支付资金： {{ this.order.totalRent }} <br />
      </v-card-text>
      <v-img :src="require('@/../static/img/imgforpay.jpg')" />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      order: this.$store.state.order,
    }
  }
}
</script>

<style>
</style>