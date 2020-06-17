<template>
  <v-card
    :loading="loading"
    class="mx-auto my-2"
    width="800"
    style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
  >
    <v-img height="200" src="../../static/img/cooking.png"></v-img>
    <v-card-title style="font-weight: bold;">{{
      this.house.name
    }}</v-card-title>
    <v-card-text>
      <v-row align="center"></v-row>
      <div class="my-4 subtitle-1 black--text" style="font-weight: bold;">
        {{ this.house.address }}
      </div>
      <div style="font-size:1.05em">
        {{ this.house.introduce }}
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col class="title text--primary">选择开始和结束日期:</v-col>
          <v-col class="title text--primary"
            >开始日期：{{ this.dates[0] }}</v-col
          >
          <v-col class="title text--primary"
            >结束日期：{{
              this.dates[1] ? this.dates[1] : this.dates[0]
            }}</v-col
          >
        </v-row>
      </v-container>

      <DatePicker @getStartAndEndDate="flushDates" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="order" large color="blue" dark style=" font-size:1.08em"
        >提交</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
export default {
  components: {
    DatePicker
  },
  data: () => ({
    house: {},
    selection: 1,
    dates: []
  }),
  created () {
    this.house = this.$store.state.pickedHouse;
    this.$axios
      .get("/house/getOccupiedDate", {
        params: {
          houseName: this.house.name,
          address: this.house.address
        }
      })
      .then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.$store.commit("updateLimitDateList", responseResult);
        } else {
          this.$store.commit(
            "updateSnackbarContent",
            successResponse.data.message
          );
        }
      });
  },
  methods: {
    flushDates: function (data) {
      this.dates = data.dates;
    },
    order () {
      this.$axios
        .get("/order/orderHouse", {
          params: {
            userName: this.$store.state.username,
            ownerName: this.house.ownerName,
            houseName: this.house.name,
            address: this.house.address,
            price: this.house.price,
            checkinDate: this.dates[0],
            checkoutDate: this.dates[1]
          }
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$store.commit("updateSnackbarContent", "申请成功,等待审核");
            this.$router.push({ name: "WorkingPanel" });
          } else {
            this.$store.commit(
              "updateSnackbarContent",
              successResponse.data.message
            );
          }
        });
    }
  }
};
</script>