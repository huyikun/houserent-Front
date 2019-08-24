<template>
  <div>
    <br />
    <v-file-input
      class="mx-10"
      chips
      multiple
      label="FileUpload"
    ></v-file-input>
    <br />
    <v-container>
      <v-row>
        <v-col class="px-10">
          <v-textarea solo name="input-7-4" label="ComplaintText"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="submit">submit</v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: [],
      complaintText: ""
    };
  },
  methods: {
    submit: function () {
      //getUrlArray
      //getComplaintText
    }
  }
};
</script>
<style>
</style>