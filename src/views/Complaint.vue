<template>
  <div
    style="padding-left:20%; padding-right:20%; padding-top:60px; padding-bottom:60px"
  >
    <v-card
      style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
    >
      <br />
      <v-card-title style="padding-left:100px; padding-right: 100px;"
        >意见反馈</v-card-title
      >
      <br />
      <v-card-text style="padding-left: 100px; padding-right: 100px;">
        <v-container>
          <v-row>
            <v-text-field
              solo
              label="投诉房屋地址"
              style="font-weight:bold"
              v-model="complaint.houseAddress"
            >
            </v-text-field>
          </v-row>
          <v-row>
            <v-textarea
              solo
              name="input-7-4"
              label="请写下您的意见与建议"
              style="font-weight:bold"
              v-model="complaint.reasons"
            ></v-textarea>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row style="padding-left: 90px; padding-right: 90px;">
            <v-file-input
              style="font-weight:bold"
              chips
              multiple
              label="图片上传"
              v-model="fileArray"
              :rules="[rules.length(3)]"
            ></v-file-input>
            <v-container>
              <v-row style="padding-left:50px; padding-right:50px;">
                <v-col
                  v-for="(file, index) in fileArray"
                  :key="index"
                  style="width:32%"
                >
                  <v-img contain height="200px" v-bind:src="getObjectURL(file)">
                    <v-btn
                      @click="delImg(index)"
                      x-small
                      color="error"
                      fab
                      depressed
                      dark
                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
          <v-row justify="center">
            <v-btn
              @click="upLoadFile"
              large
              color="blue darken-1"
              dark
              style="font-weight:bold"
              >提交</v-btn
            >
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: new FormData(),
      fileArray: [],
      upLoaded: false,
      rules: {
        length: len => v => (v || "").length <= len || `最多上传${len}张图片`
      },
      complaint: {
        userName: '',
        houseAddress: '',
        reasons: '',
        photos: ''
      }
    };
  },
  methods: {
    getObjectURL (file) {
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
    delImg (index) {
      this.fileArray.splice(index, 1);
    },
    upLoadFile () {
      for (var i = 0; i < this.fileArray.length; i++) {
        this.formData.append(
          "multipartFiles",
          this.fileArray[i],
          this.fileArray[i].name
        );
        console.log(this.fileArray[i]);
      }
      this.$axios
        .post("/picture/batch/upload", this.formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            // this.$store.commit("updateSnackbarContent", "上传成功");
            this.complaint.photos = responseResult
            this.complaint.userName = this.$store.state.username
            this.submit()
          } else {
            this.$store.commit(
              "updateSnackbarContent",
              successResponse.data.message
            );
          }
        })
        .catch(failResponse => { });
      if (this.fileArray.length > 0) this.upLoaded = true;
    },
    submit: function () {
      if (this.upLoaded) {
        this.$axios.post('', this.complaint)
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$store.commit('updateSnackbarContent', '投诉成功')
              this.reset()
            } else {
              this.$store.commit(
                "updateSnackbarContent",
                successResponse.data.message
              );
            }
          }).catch(failResponse => { });
      } else {
        this.$store.commit('updateSnackbarContent', '请上传图片')
      }
    },
    reset () {
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>
<style>
</style>