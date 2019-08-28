<template>
  <div class="text-center" style="padding-top:20px">
    <v-date-picker
      v-model="dates"
      multiple
      :show-current="false"
      :allowed-dates="allowedDates"
      no-title
    ></v-date-picker>
  </div>
</template>

<script>
export default {
  data: () => ({
    dates: []
  }),
  methods: {
    allowedDates: function(val) {
      var judgeDate = parseInt(
        val.split("-")[0] + val.split("-")[1] + val.split("-")[2]
      );
      var startDate;
      var endDate;
      for (var i = 0; i < this.$store.state.limitDateList.length; i++) {
        startDate = parseInt(
          this.dateToString(this.$store.state.limitDateList[i].startDate)
        );
        endDate = parseInt(
          this.dateToString(this.$store.state.limitDateList[i].endDate)
        );
        if (startDate <= judgeDate && judgeDate <= endDate) {
          return false;
        }
      }
      return true;
    },
    dateToString: function(date) {
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString();
      var day = date.getDate().toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var res = year + month + day;
      return res;
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