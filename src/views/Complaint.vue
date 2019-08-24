<template>
  <div>
    <v-container>
      <br />
      <v-row>
        <v-file-input class="px-10" chips multiple label="FileUpload" v-model="fileUrl"></v-file-input>
      </v-row>
      <br />
      <v-row>
        <v-col class="px-10">
          <v-textarea solo name="input-7-4" label="ComplaintText" v-model="complaintText"></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn  @click="submit">submit</v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileUrl: [],
      complaintText: "",
    };
  },
  methods: {
    submit: function() {
      console.log(this.$data.complaintText)
      //getLocalUrlArray
      //getLocalComplaintText
      //postUrlArray
      //postComplaintText
    }
  }
};
</script>
<style>
</style>