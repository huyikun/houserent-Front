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
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: "",
      headers: [
        {
          text: "房屋名称",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "房屋地址", value: "address", sortable: false },
        { text: "入住日期", value: "indate", sortable: false },
        { text: "退房日期", value: "outdate", sortable: false },
        { text: "订单金额", value: "price" },
        { text: "订单状态", value: "state" }
      ],
      orders: [
        {
          name: "Eclair",
          address: "America",
          indate: "2019-9-1",
          outdate: "2019-10-7",
          price: 5000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Gingerbread",
          address: "Xi'an",
          indate: "2018-10-1",
          outdate: "2019-10-7",
          price: 100,
          state: "未支付"
        },
        {
          name: "Jelly bean",
          address: "Chongqing",
          indate: "2019-10-1",
          outdate: "2019-10-7",
          price: 1080,
          state: "未支付"
        },
        {
          name: "Lollipop",
          address: "Tianjing",
          indate: "2019-11-1",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        },
        {
          name: "Cupcake",
          address: "England",
          indate: "2019-10-2",
          outdate: "2019-10-7",
          price: 1000,
          state: "未支付"
        }
      ]
    };
  }
};
</script>
