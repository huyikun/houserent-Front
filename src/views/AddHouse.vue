<template>
  <div
    style="padding-left:12.5%; padding-right:12.5%; padding-top:20px ; padding-bottom:20px"
  >
    <v-card
      style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
    >
      <v-container>
        <br />
        <v-card-title style="padding-left:50px; padding-right:50px;"
          >注册房源</v-card-title
        >
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field
            label="房间名称"
            style="font-weight:bold"
            v-model="house.name"
          ></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field
            label="房间地址"
            style="font-weight:bold"
            v-model="house.address"
          ></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field
            label="房间定价（每晚）"
            style="font-weight:bold"
            v-model="house.price"
          ></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field
            label="房间类型"
            style="font-weight:bold"
            v-model="house.type"
          ></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field
            label="房主姓名"
            style="font-weight:bold"
            v-model="house.ownerName"
          ></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field
            label="房主联系方式"
            style="font-weight:bold"
            v-model="house.ownerPhone"
          ></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-textarea
            label="房屋简介"
            name="input-7-4"
            solo
            style="font-weight:bold"
            v-model="house.introduce"
          ></v-textarea>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-file-input
            chips
            multiple
            label="图片上传"
            style="font-weight:bold"
            v-model="imgArray"
            :rules="[rules.length(3)]"
          ></v-file-input>
          <v-container>
            <v-row style="padding-left:50px; padding-right:50px;">
              <v-col
                v-for="(img, index) in imgArray"
                :key="index"
                style="width:30%"
              >
                <v-img contain height="300px" v-bind:src="getObjectURL(img)">
                  <v-btn
                    x-small
                    @click="delImg(index)"
                    fab
                    color="error"
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
        <br />
        <v-row justify="center">
          <v-btn @click="upLoadImg" color="blue" dark fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgArray: [],
      upLoaded: false,
      house: {
        name: "",
        address: "",
        ownerPhone: "",
        ownerName: "",
        type: null,
        price: null,
        introduce: "",
        photos: {}
      },
      rules: {
        length: len => v => (v || "").length <= len || `最多上传${len}张图片`
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
      this.imgArray.splice(index, 1);
    },
    upLoadImg () {
      var formData = new FormData();
      var i = 0;
      for (; i < this.imgArray.length; i++) {
        formData.append(
          "multipartFiles",
          this.imgArray[i],
          this.imgArray[i].name
        );
        console.log(this.imgArray[i]);
      }
      this.$axios
        .post("/picture/batch/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          )
          if (successResponse.data.code === 200) {
            // this.$store.commit("updateSnackbarContent", "上传成功");
            this.house.photos = responseResult;
            this.upLoaded = true
            this.submit()
          } else {
            this.$store.commit(
              "updateSnackbarContent",
              successResponse.data.message
            )
          }
        })
        .catch(failResponse => { });
      console.log(this.formData);
      if (this.imgArray.length > 0) this.upLoaded = true;
    },
    submit () {
      // this.upLoadImg();
      if (this.upLoaded) {
        this.$axios
          .post("/house/addHouse", this.house)
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$store.commit("updateSnackbarContent", "上传房屋成功");
              this.reset();
            } else {
              this.$store.commit(
                "updateSnackbarContent",
                successResponse.data.message
              );
            }
          })
          .catch(failResponse => { });
      } else {
        this.$store.commit("updateSnackbarContent", "请上传图片");
      }
    },
    reset () {
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>