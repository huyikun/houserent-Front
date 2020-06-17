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
import { relative } from 'path';
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
      var list = this.$store.state.limitDateList
      for (var i = 0; i < list.length; i++) {
        console.log(list[i].startDate);
        startDate = parseInt(
          list[i].startDate.split("-")[0] +
          list[i].startDate.split("-")[1] +
          list[i].startDate.split("-")[2]
        );
        endDate = parseInt(
          list[i].endDate.split("-")[0] +
          list[i].endDate.split("-")[1] +
          list[i].endDate.split("-")[2]
        );
        if (startDate <= judgeDate && judgeDate <= endDate) {
          return false;
        }
      }
      return true;
    },
    pickable: function(startDate, endDate) {
      var i = 0
      var list = this.$store.state.limitDateList
      for(i ; i < list.length ; i++ ) {
        var st = list[i].startDate
        var ed = list[i].endDate
        if(startDate <= st && ed <= endDate)
          return false
      }
      return true
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
      var res = year + "-" + month + "-" + day;
      return res;
    },
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
          if(this.pickable(this.dates[0],this.dates[1])) {
            this.$emit("getStartAndEndDate", { dates: this.dates });
          } else {
            this.dates.splice(0, 2)
            this.$store.commit('updateSnackbarContent', '日期不可选')
            this.$emit("getStartAndEndDate", { dates: this.dates });
          }
        }
        if (this.dates.length == 1) {
          this.$emit("getStartAndEndDate", { dates: this.dates });
        }
      }
    }
  }
};
</script>