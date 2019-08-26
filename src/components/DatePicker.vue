<template>
  <v-container>
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
    </v-row>
    <!-- <v-btn color="primary" @click="search">Search</v-btn> -->
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      indate: new Date().toISOString().substr(0, 10),
      outdate: new Date().toISOString().substr(0, 10),
      inmodal: false,
      outmodal: false,
    }
  },
  methods: {
    search () {
      this.postdata.keyword3 = indate
      this.postdata.keyword4 = outdate
      this.$axios
        .post('/search', {
          keywords: this.postdata
        })
        .then(successResponse => {
          // this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$router.push({ path: '/signup' })
          }
          else {
            Snackbar = true
          }
        })
        .catch(failResponse => { })
    },
  }
}
</script>

<style>
</style>