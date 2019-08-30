<template>
  <v-container style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;">
    <v-card>
      <v-card-title>
        您的订单
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="搜索"
          style="font-weight:bold"
          single-line
          hide-details
        ></v-text-field>
        <v-btn class="ml-3 mt-2" @click="pass" color="info" dark style="font-size:0.7em">确认</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        item-key="houseName"
        show-select
        v-model="selected"
        :single-select="singleSelect"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: "",
      selected: [],
      orders: [],

    }
  },
  computed: {
    headers: {
      get () {
        return this.$store.state.usermode === 0 ? this.$store.state.admheader : this.$store.state.usrheader
      }
    },
    showselect: function () {
      return (this.$store.state.usermode === 0 ? true : false)
    },
  },
  created () {
    if (this.$store.state.usermode === 0) {
      this.getAllOrders()
    } else if (this.$store.state.usermode === 1) {
      this.getUserOrders()
    }
  },
  methods: {
    getAllOrders: function () {
      this.orders = [
        {
          userName: "HUU",
          ownerName: "Cuu",
          houseName: "Eclair",
          address: "America",
          checkinDate: "2019-9-1",
          checkoutDate: "2019-10-7",
          applyTime: '2019-8-29 11:15:08',
          totalRent: 5000,
          state: "未支付"
        },
        {
          userName: "HUU",
          ownerName: "Cupcake",
          houseName: "Eclppir",
          address: "America",
          checkinDate: "2019-9-1",
          checkoutDate: "2019-10-7",
          applyTime: '2019-8-29 11:15:08',
          totalRent: 5000,
          state: "未支付"
        },
        {
          userName: "HUU",
          ownerName: "Gingerbread",
          houseName: "Eccair",
          address: "America",
          checkinDate: "2019-9-1",
          checkoutDate: "2019-10-7",
          applyTime: '2019-8-29 11:15:08',
          totalRent: 5000,
          state: "未支付"
        },
      ]
      this.$axios.get('/order/getAll').then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.orders = responseResult
        } else {
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }
      }).catch(failResponse => { });
    },
    getUserOrders: function () {
      this.orders = [
        {
          userName: "HUU",
          ownerName: "Cuu",
          houseName: "Eclair",
          address: "America",
          checkinDate: "2019-9-1",
          checkoutDate: "2019-10-7",
          applyTime: '2019-8-29 11:15:08',
          totalRent: 5000,
          state: "未支付"
        },
        {
          userName: "HUU",
          ownerName: "Cupcake",
          houseName: "Eclppir",
          address: "America",
          checkinDate: "2019-9-1",
          checkoutDate: "2019-10-7",
          applyTime: '2019-8-29 11:15:08',
          totalRent: 5000,
          state: "未支付"
        },
        {
          userName: "HUU",
          ownerName: "Gingerbread",
          houseName: "Eccair",
          address: "America",
          checkinDate: "2019-9-1",
          checkoutDate: "2019-10-7",
          applyTime: '2019-8-29 11:15:08',
          totalRent: 5000,
          state: "未支付"
        },
      ]
      this.$axios.get('/order/getUser', {
        params: {
          userName: this.userName
        }
      }).then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.orders = responseResult
        } else {
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }
      }).catch(failResponse => { });
    },
    passOrders: function () {
      this.$axios.post('/order/pass', selected).then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.orders = responseResult
        } else {
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }
      }).catch(failResponse => { });
    },
    goDetail: function (item) {
      this.$store.commit('updateOrder', item)
      this.$router.push({ name: 'OrderPage' })
    }
  }
};
</script>
