<template>
  <v-card
    :loading="loading"
    class="mx-auto my-2"
    width="800"
    style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
  >
    <v-img height="200" src="../../static/img/cooking.png"></v-img>
    <v-card-title>Your home : {{ house.name }}</v-card-title>
    <v-card-text>
      <v-row align="center"></v-row>
      <div class="my-4 subtitle-1 black--text">$ • {{ house.address }}</div>
      <div>
        {{ house.introduce }}
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div class="title text--primary">请选择入住日期</div>
      <DatePicker @getStartAndEndDate="flushDates" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="deep-purple accent-4" text @click="order">提交</v-btn>
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
    house: this.$store.state.PickedHouse,
    loading: false,
    selection: 1,
    dates: []
  }),

  methods: {
    reserve () {
      console.log(this.dates);
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    flushDates: function (data) {
      this.dates = data.dates;
      console.log(this.dates);
    },
    order () {
      this.$axios.get('/order', {
        params: {
          userName: this.$store.state.username,
          ownerName: this.house.ownerName,
          houseName: this.house.name,
          address: this.house.address,
          price: this.house.price,
          checkinDate: this.dates[0],
          checkoutDate: this.dates[1],
        }
      }).then(
        successResponse => {
          if (successResponse.data.code === 200) {
            this.$store.commit("updateSnackbarContent", "申请成功,等待审核");
            this.$store.commit('updatePickedHouse', value)
            this.$router.push({ name: "Main" });
          } else {
            this.$store.commit(
              "updateSnackbarContent",
              successResponse.data.message
            );
          }
        }
      )
    },
  }
};
</script>
