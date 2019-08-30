<template>
  <v-container
    style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;"
  >
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
        <v-btn
          class="ml-3 mt-2"
          @click="pass"
          color="info"
          dark
          style="font-size:0.7em"
          >确认</v-btn
        >
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        item-key="houseName"
        :show-select="showSelect"
        disable-sort
        v-model="selected"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            v-if="showDetail"
            small
            color="primary"
            dark
            class="mx-2"
            @click="goDetail(item)"
          >
            Details
          </v-btn>
        </template>
      </v-data-table>
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
    showSelect: function () {
      return (this.$store.state.usermode === 0 ? true : false)
    },
    showDetail: (item) => {
      return item.state !== "waiting"
    }
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
      this.$axios.get('/order/getUserOrder', {
        params: {
          userName: this.$store.state.username
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
