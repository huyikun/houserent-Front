<template>
  <!-- <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-dialog
          ref="dialog1"
          v-model="inmodal"
          :return-value.sync="indate"
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="indate"
              label="Picker in dialog"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="indate" scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="inmodal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog1.save(indate)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-dialog
          ref="dialog2"
          v-model="outmodal"
          :return-value.sync="outdate"
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="outdate"
              label="Picker in dialog"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="outdate" scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="outmodal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog2.save(outdate)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row><v-btn color="primary" @click="search">Search</v-btn>
  </v-container>-->
  <div class="text-center" style="padding-top:20px">
    <v-date-picker
      v-model="dates"
      multiple
      :show-current="false"
      :allowed-dates="allowedDates"
      no-title="true"
    ></v-date-picker>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       indate: new Date().toISOString().substr(0, 10),
//       outdate: new Date().toISOString().substr(0, 10),
//       inmodal: false,
//       outmodal: false
//     };
//   },
//   methods: {
//     search() {
//       this.postdata.keyword3 = indate;
//       this.postdata.keyword4 = outdate;
//       this.$axios
//         .post("/search", {
//           keywords: this.postdata
//         })
//         .then(successResponse => {
//           // this.responseResult = JSON.stringify(successResponse.data)
//           if (successResponse.data.code === 200) {
//             this.$router.push({ path: "/signup" });
//           } else {
//             Snackbar = true;
//           }
//         })
//         .catch(failResponse => {});
//     }
//   }
// };
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
      var judgeDate = parseInt(
        val.split("-")[0] + val.split("-")[1] + val.split("-")[2]
      );
      var startDate;
      var endDate;
      for (var i = 0; i < this.limitList.length; i++) {
        startDate = parseInt(this.dateToString(this.limitList[i].startDate));
        endDate = parseInt(this.dateToString(this.limitList[i].endDate));
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