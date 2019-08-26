<template>
  <div style="padding-left:12.5%; padding-right:12.5%; padding-top:75px">
    <v-card style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;">
      <v-container>
        <br />
        <v-card-title style="padding-left:50px; padding-right:50px;">注册房源</v-card-title>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-file-input chips multiple label="图片上传" v-model="imgUrl" :rules="[rules.length(3)]"></v-file-input>
          <v-container>
            <v-row style="padding-left:50px; padding-right:50px;">
              <v-col v-for="(img, index) in imgUrl" :key="index" style="width:30%">
                <v-img max-height="300px" v-bind:src="getObjectURL(img)">
                  <v-btn x-small @click="delImg(index)">x</v-btn>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row justify="center">
          <v-btn @click="submit">上传图片</v-btn>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间名称" v-model="houseName"></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间地址" v-model="houseAddress"></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间描述" v-model="houseDescribtion"></v-text-field>
        </v-row>
        <br />
        <v-row justify="center">
          <v-btn @click="submit">提交</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    imgUrl: [],
    houseName: "",
    houseAddress: "",
    houseDescribtion: "",
    rules: {
      length: len => v => (v || "").length <= len || `最多上传${len}张图片`
    }
  }),
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
      console.log(url);
      return url;
    },
    delImg(index) {
      this.imgUrl.splice(index, 1);
    },
    submit() {
      console.log(this.imgUrl);
      //   this.$axios
      //     .post("/house", {
      //       imgUrl: this.imgUrl,
      //       houseName: this.houseName,
      //       houseAddress: this.houseAddress,
      //       houseDescribtion: this.houseDescribtion
      //     })
      //     .then(successResponse => {
      //       var responseResult = JSON.parse(
      //         JSON.stringify(successResponse.data.data)
      //       );
      //       if (successResponse.data.code === 200) {
      //         this.$store.commit("updateMode", responseResult);
      //         this.$router.push({ name: "WorkingPanel" });
      //         this.$store.commit("updateSnackbarContent", "登录成功");
      //       } else {
      //         this.$store.commit(
      //           "updateSnackbarContent",
      //           successResponse.data.message
      //         );
      //       }
      //     })
      //     .catch(failResponse => {});
    }
  }
};
</script>