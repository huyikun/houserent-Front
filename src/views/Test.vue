<template>
  <div class="text-center" style="padding-top:20px">
    <v-date-picker
      v-model="dates"
      multiple
      locale="zh-cn"
      :show-current="false"
      :allowed-dates="allowedDates"
    ></v-date-picker>
  </div>
</template>
<script>
export default {
  data: () => ({
    dates: [],
    limitList: [
      {
        startDate: new Date("2019-08-28"),
        endDate: new Date("2019-8-30")
      },
      {
        startDate: new Date("2019-08-14"),
        endDate: new Date("2019-8-17")
      }
    ]
  }),
  methods: {
    // allowedDates: val => parseInt(val.split("-")[2]) % 2 === 0,
    allowedDates: function(val) {
      // var flag = true;
      // for (var i = 0; i < this.limitList.length; i++) {
      //   if (
      //     !(
      //       parseInt(val.split("-")) <
      //         parseInt(this.limitList[i].startDate.split("-")) &&
      //       parseInt(val.split("-")) > parseInt(this.limitList[i].endDate.split("-"))
      //     )
      //   ) {
      //     return false;
      //   }
      // }
      console.log(this.limitList);
      return true;
    }
  },
  watch: {
    dates: {
      handler(newVal) {
        if (this.dates.length > 2) {
          this.dates.splice(2, 1);
        }
        if (this.dates.length == 2) {
          var date1 = this.dates[0];
          var date2 = this.dates[1];
          var date3;
          if (date1 > date2) {
            date3 = date1;
            this.dates[0] = date2;
            this.dates[1] = date3;
          } else {
            date3 = date2;
            this.dates[0] = date1;
            this.dates[1] = date3;
          }
        }
      }
    }
  }
};
</script>