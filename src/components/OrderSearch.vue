<template>
  <v-row class="mx-5">
    <div style="width: 50%;" class="ma-3">
      <v-text-field
        v-model="keyword.address"
        solo
        hide-details
        placeholder="找找你想要去的地方"
      ></v-text-field>
    </div>
    <div style="width: 12%" class="ma-3">
      <v-text-field
        v-model="keyword.lowPrice"
        solo
        hide-details
        placeholder="价格区间"
        ><v-icon slot="append" color="red">mdi-minus</v-icon></v-text-field
      >
    </div>
    <div style="width: 12%" class="ma-3">
      <v-text-field
        v-model="keyword.highPrice"
        solo
        hide-details
        placeholder="价格区间"
        ><v-icon slot="append" color="red">mdi-plus</v-icon></v-text-field
      >
    </div>
    <div style="width: 9%" class="ma-3">
      <v-select
        :items="items"
        v-model="keyword.type"
        hide-details
        label="房间类型"
        solo
      ></v-select>
    </div>
    <v-spacer />
    <div style="width: 4%; margin-right: 40px">
      <v-btn class="mt-3 pr-5" large color="red lighten-2" dark @click="search"
        >搜索</v-btn
      >
    </div>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      keyword: {
        address: '',
        lowPrice: null,
        highPrice: null,
        type: '',
      },
      items: ['单人间', '双人间', '四人间', '全部'],
    };
  },
  methods: {
    search () {
      if (this.keyword.type === '单人间') {
        this.keyword.type = 1
      } else if(this.keyword.type === '双人间') {
        this.keyword.type = 2
      } else if(this.keyword.type === '四人间') {
        this.keyword.type = 4
      } else if(this.keyword.type === '全部') {
        this.keyword.type = 0
      } else {
        console.log('bug')
      }
      this.$axios
        .post("/house/searchHouse", {
          address: this.keyword.address,
          lowPrice: this.keyword.lowPrice,
          highPrice: this.keyword.highPrice,
          type: this.keyword.type,
        })
        .then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            this.$store.commit("updateHouseList", responseResult);
          }
            this.$store.commit(
              "updateSnackbarContent",
              successResponse.data.message
            );
        })
        .catch(failResponse => { });
    }
  }
};
</script>
