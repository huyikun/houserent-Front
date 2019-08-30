<template>
  <div class="text-center" style="padding-top:20px">
    <v-date-picker
      v-model="dates"
      multiple
      :show-current="true"
      :allowed-dates="allowedDates"
      :min="minDate"
      :max="maxDate"
      no-title
    ></v-date-picker>
  </div>
</template>

<script>
export default {
  data: () => ({
    dates: []
  }),
  computed: {
    minDate: function() {
      return this.dateToString(new Date());
    },
    maxDate: function() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var flag = false;
      if (month + 3 > 12) {
        month = (month + 3) % 12;
        year++;
      } else {
        month = month + 3;
      }
      if (
        (year % 100 != 0 && year % 4 == 0) ||
        (year % 100 == 0 && year % 400 == 0)
      ) {
        flag = true;
      }
      if (flag && month == 2 && day > 29) {
        month++;
        day = day - 29;
      } else if (!flag && month == 2 && day > 28) {
        month++;
        day = day - 28;
      } else if (
        (month == 4 || month == 6 || month == 9 || month == 11) &&
        day == 31
      ) {
        month++;
        day = 1;
      }
      return year + "-" + month + "-" + day;
    }
  },
  methods: {
    allowedDates: function(val) {
      var judgeDate = parseInt(
        val.split("-")[0] + val.split("-")[1] + val.split("-")[2]
      );
      var startDate;
      var endDate;
      console.log(2)
      for (var i = 0; i < this.$store.state.limitDateList.length; i++) {
        console.log(1)
        startDate = parseInt(
          this.dateToString(this.$store.state.limitDateList[i].startDate).split(
            "-"
          )[0] +
            this.dateToString(
              this.$store.state.limitDateList[i].startDate
            ).split("-")[1] +
            this.dateToString(
              this.$store.state.limitDateList[i].startDate
            ).split("-")[2]
        );
        endDate = parseInt(
          this.dateToString(this.$store.state.limitDateList[i].endDate).split(
            "-"
          )[0] +
            this.dateToString(this.$store.state.limitDateList[i].endDate).split(
              "-"
            )[1] +
            this.dateToString(this.$store.state.limitDateList[i].endDate).split(
              "-"
            )[2]
        );
        if (startDate <= judgeDate && judgeDate <= endDate) {
          return false;
        }
      }
      return true;
    },
    dateToString: function(date) {
      console.log(date)
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString();
      var day = date.getDate().toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var res = year + "-" + month + "-" + day;
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
          this.$emit("getStartAndEndDate", { dates: this.dates });
        }
      }
    }
  }
};
</script>