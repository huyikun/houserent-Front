<template>
  <div>
    <v-file-input chips multiple label="FileUpload"></v-file-input>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-textarea solo name="input-7-4" label="Opinions"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="submit">submit</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: [],
      complaintText: ""
    };
  },
  methods: {
    submit: function() {
      //getUrlArray
      //getComplaintText
    }
  }
};
</script>
<style>
</style>