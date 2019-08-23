<template>
  <v-card>
    <v-stepper v-model="e13" vertical>
      <v-stepper-step step="1" complete>
        Step 1
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-radio-group
          class="pt-3 pl-3 pr-3"
          v-model="postdata.keyword1"
          :mandatory="false"
        >
          <v-radio label="短租" value="短租"></v-radio>
          <v-radio label="长租" value="长租"></v-radio>
        </v-radio-group>
        <v-btn color="primary" @click="fstep1">Next</v-btn>
      </v-stepper-content>

      <v-stepper-step step="2" complete>Step 2</v-stepper-step>
      <v-stepper-content step="2">
        <v-radio-group
          class="pt-3 pl-3 pr-3"
          v-model="postdata.keyword2"
          :mandatory="false"
        >
          <v-radio label="单人间" value="单人间"></v-radio>
          <v-radio label="双人间" value="双人间"></v-radio>
          <v-radio label="四人间" value="四人间"></v-radio>
        </v-radio-group>
        <v-btn color="primary" @click="fstep2">Continue</v-btn>
        <v-btn @click="e13--">Back</v-btn>
      </v-stepper-content>
      <v-stepper-step step="3">Step 3</v-stepper-step>
      <v-stepper-content step="3">
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
                <v-btn text color="primary" @click="inmodal = false"
                  >Cancel</v-btn
                >
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
                <v-btn text color="primary" @click="outmodal = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="$refs.dialog2.save(outdate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="search">Search</v-btn>
        <v-btn @click="e13--">Back</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>
import Picbody from '../components/Picbody'
export default {
  data () {
    return {
      dialog: false,
      e13: 1,
      indate: new Date().toISOString().substr(0, 10),
      outdate: new Date().toISOString().substr(0, 10),
      menu: false,
      inmodal: false,
      outmodal: false,
      menu2: false,
      postdata: [
        { keyword1: '' },
        { keyword2: '' },
        { keyword3: '' },
        { keyword4: '' },
      ],
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
    fstep1 () {
      this.e13++
    },
    fstep2 () {
      this.e13++
    },
  },
}
</script>