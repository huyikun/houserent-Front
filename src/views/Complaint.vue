<template>
  <div style="padding-left:12.5%; padding-right:12.5%; padding-top:75px">
    <v-card style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;">
      <br />
      <v-card-title style="padding-left:100px; padding-right: 100px;">意见反馈</v-card-title>
      <br />
      <br />
      <v-card-text style="padding-left: 100px; padding-right: 100px;">
        <v-file-input
          style="filter:alpha(opacity=50); -moz-opacity:0.5; opacity: 0.875; "
          chips
          multiple
          label="文件上传"
          v-model="fileUrl"
        ></v-file-input>
      </v-card-text>
      <br />
      <br />
      <v-card-actions style="padding-left: 100px; padding-right: 100px;">
        <v-container>
          <v-row>
            <v-textarea solo name="input-7-4" label="请写下您的意见与建议" v-model="complaintText"></v-textarea>
          </v-row>
          <v-row justify="center">
            <v-btn @click="submit">submit</v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileUrl: [],
      complaintText: "",
      rules: {
        length: len => v => (v || "").length <= len || `上传图片应少于${len}张`
      }
    };
  },
  methods: {
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    submit: function() {
      console.log(this.$data.complaintText);
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