<template>
  <v-container
    style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;"
  >
    <v-card v-if="showOrder">
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
          v-if="showSelect"
          class="ml-3 mt-2"
          @click="passOrders"
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
        item-key="applyTime"
        :show-select="showSelect"
        disable-sort
        v-model="selected"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            v-if="showDetail(item)"
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
    <br />
    <v-card>
      <v-card-title>
        您的报修投诉
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search2"
          append-icon="search"
          label="搜索"
          style="font-weight:bold"
          single-line
          hide-details
        ></v-text-field>
        <v-btn
          v-if="showSelect"
          class="ml-3 mt-2"
          @click="passComplaints"
          color="info"
          dark
          style="font-size:0.7em"
          >处理</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="complaints"
        :search="search2"
        item-key="complaintTime"
        :show-select="showSelect"
        disable-sort
        v-model="selected2"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            v-if="showDetail(item)"
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
      search2: "",
      selected: [],
      selected2: [],
      orders: [],
      complaints: [],
      usermode: this.$store.state.usermode
    }
  },
  computed: {
    headers: {
      get () {
        if (this.usermode === 0)
          return this.$store.state.admheader
        else if (this.usermode === 1)
          return this.$store.state.usrheader
        else if (this.usermode === 2)
          return this.$store.state.workerhead
      }
    },
    showSelect: function () {
      return (this.$store.state.usermode === 0 ? true : false)
    },
    showOrder: function () {
      return (this.$store.state.usermode === 2) ? false : true
    }
  },
  created () {
    if (this.$store.state.usermode === 0) {
      this.getAllOrders()
      this.getAllComplaints()
    } else if (this.$store.state.usermode === 1) {
      this.getUserOrders()
      this.getUserComplaints()
    } else if (this.$store.usermode === 2) {
      this.getWorkerComplaints()
    }

  },
  methods: {
    showDetail: function (value) {
      return !(value.state === "waiting")
    },
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
      this.$axios.post('/order/pass', this.selected).then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.orders = responseResult
          this.selected = []
          this.$store.commit("updateSnackbarContent", '审核通过')
        } else {
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }
      }).catch(failResponse => { });
    },
    goDetail: function (item) {
      this.$store.commit('updateOrder', item)
      this.$router.push({ name: 'OrderPage' })
    },

    getAllComplaints: function () {
      this.$axios.get('/complaint/getAll').then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.complaints = responseResult
        } else {
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }
      }).catch(failResponse => { });
    },
    getUserComplaints: function () {
      this.$axios.get('/complaint/getUserComplaint', {
        params: {
          userName: this.$store.state.username
        }
      }).then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.complaints = responseResult
        } else {
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }
      }).catch(failResponse => { });
    },
    getWorkerComplaints: function () {
      this.$axios.get('/complaint/getWorkerComplaint', {
        params: {
          workerName: this.$store.state.username
        }
      }).then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.complaints = responseResult
        } else {
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }
      }).catch(failResponse => { });
    },
    passComplaints: function () {
      this.$axios.post('/complaint/pass', this.selected2)
        .then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            this.complaints = responseResult
            this.selected2 = []
            this.$store.commit("updateSnackbarContent", '分配成功')
          } else {
            this.$store.commit("updateSnackbarContent", successResponse.data.message);
          }
        }).catch(failResponse => { });
    },
  }
};
</script>
