<template>
  <v-card>
    <v-stepper v-model="e13" vertical>
      <v-stepper-step step="1" complete>Step 1</v-stepper-step>
      <v-stepper-content step="1">
        <v-radio-group
          class="pl-3 pr-3"
          v-model="postdata.keyword1"
          :mandatory="false"
        >
          <v-radio label="短租(1~30 days)" value="短租"></v-radio>
          <v-radio label="长租(> 30 days)" value="长租"></v-radio>
        </v-radio-group>
        <v-btn color="primary" @click="fstep1">Next</v-btn>
      </v-stepper-content>

      <v-stepper-step step="2" complete>Step 2</v-stepper-step>
      <v-stepper-content step="2">
        <v-radio-group
          class="pl-3 pr-3"
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
        <v-text-field
          v-model="postdata.keyword3"
          style="max-width: 500px;"
          placeholder="The address you wish"
        ></v-text-field>
        <v-btn color="primary" @click="search">Search</v-btn>
        <v-btn @click="e13--">Back</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>

export default {
  data () {
    return {
      e13: 1,
      postdata: [
        { keyword1: '' },
        { keyword2: '' },
        { keyword3: '' },
      ],
    }
  },
  methods: {
    search () {
      // 用于展示 后期删除
      this.$router.push({ name: 'HouseList' })

      this.$axios
        .post('/search', {
          keywords: this.postdata
        })
        .then(successResponse => {
          // var responseResult = JSON.parse(JSON.stringify(successResponse.data.data))
          if (successResponse.data.code === 200) {
            // this.$store.commit('updateHouseList', responseResult)
            this.$router.push({ name: 'HouseList' })
          }
          else {
            this.$store.commit('updateSnackbarContent', successResponse.data.message)
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