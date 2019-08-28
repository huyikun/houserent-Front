<template>
  <div style="padding-left:12.5%; padding-right:12.5%; padding-top:20px ; padding-bottom:20px">
    <v-card style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;">
      <v-container>
        <br />
        <v-card-title style="padding-left:50px; padding-right:50px;">注册房源</v-card-title>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-file-input chips multiple label="图片上传" v-model="img" :rules="[rules.length(3)]"></v-file-input>
          <v-container>
            <v-row style="padding-left:50px; padding-right:50px;">
              <v-col v-for="(img, index) in img" :key="index" style="width:30%">
                <v-img max-height="300px" v-bind:src="getObjectURL(img)">
                  <v-btn x-small @click="delImg(index)">x</v-btn>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row justify="center">
          <v-btn @click="upLoadImg">上传图片</v-btn>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间名称" v-model="house.name"></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间地址" v-model="house.address"></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间定价（每晚）" v-model="house.price"></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间类型" v-model="house.type"></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房主联系方式" v-model="house.ownerphone"></v-text-field>
        </v-row>
        <br />
        <v-row style="padding-left:50px; padding-right:50px;">
          <v-text-field label="房间简介" v-model="house.introduce"></v-text-field>
        </v-row>
        <br />
        <v-row justify="center">
          <v-btn @click="submit">提交</v-btn>
        </v-row>
      </v-container>
    </v-card>

    <!-- <v-card style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;">
      <v-row class="my-5">
        <v-col>
          <v-card-title>上传图片</v-card-title>
          <v-card-text>
            (建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传3张)
            <br />上传成功后再进行房屋其他信息的注册
          </v-card-text>
          <ul>
            <li v-if="imgLen >= 3 ? false : true">
              <input
                type="file"
                class="upload"
                @change="addImg"
                ref="inputer"
                multiple
                accept="image/png, image/jpeg, image/gif, image/jpg"
              />
            </li>
            <li v-else>
              <input value="每次最多上传3张图片 0v0" />
            </li>
            <v-row>
              <v-col v-for="(value, key) in imgs" :key="key" style="max-width: 200px;">
                <v-img :src="getObjectURL(value)" height="150px" />
                <a class="close" @click="delImg(key)">×</a>
              </v-col>
            </v-row>
            <v-btn @click="submit">点击上传</v-btn>
          </ul>
        </v-col>
        <v-col>
          <v-text-field style="max-width: 400px;" label="房屋名称" v-model="house.name" filled></v-text-field>
          <v-text-field style="max-width: 400px;" label="房屋地址" v-model="house.address" filled></v-text-field>
          <v-text-field style="max-width: 400px;" label="房屋定价(每晚)" v-model="house.price" filled></v-text-field>
          <v-text-field style="max-width: 400px;" label="房屋类型" v-model="house.type" filled></v-text-field>
          <v-text-field style="max-width: 400px;" label="房主联系方式" v-model="house.ownerphone" filled></v-text-field>
          <v-textarea
            filled
            name="input-7-4"
            label="房屋简介"
            v-model="house.introduce"
            style="max-width: 400px;"
          ></v-textarea>
          <v-btn v-if="showaddhouse" dark color="red lighten-2" @click="addhouse">注册房屋</v-btn>
        </v-col>
      </v-row>
    </v-card>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: new FormData(),
      img: [],
      upLoaded: false,
      house: {
        name: "",
        address: "",
        ownerphone: "",
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
    delImg(index) {
      this.img.splice(index, 1);
    },
    upLoadImg() {
      var i = 0;
      for (; i < this.img.length; i++) {
        this.formData.append("multipartFiles", this.img[i], this.img[i].name);
        console.log(this.img[i]);
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
            this.$store.commit("updateSnackbarContent", "上传成功");
            this.showaddhouse = true;
            this.house.photos = responseResult;
          } else {
            this.$store.commit(
              "updateSnackbarContent",
              successResponse.data.message
            );
          }
        })
        .catch(failResponse => {});
      console.log(this.formData);
      if (this.img.length > 0) this.upLoaded = true;
    },
    submit() {
      if (this.upLoaded) {
        this.$axios
          .post("/house/AddHouse", this.house)
          .then(successResponse => {
            var responseResult = JSON.parse(
              JSON.stringify(successResponse.data.data)
            );
            if (successResponse.data.code === 200) {
              this.$store.commit("updateSnackbarContent", "上传成功");
              this.reset();
            } else {
              this.$store.commit(
                "updateSnackbarContent",
                successResponse.data.message
              );
            }
          })
          .catch(failResponse => {});
      } else {
        this.$store.commit("updateSnackbarContent", "请先上传图片");
      }
    },
    
    addhouse() {
      if (this.upLoaded) {
        this.$axios
          .post("/house/addHouse", this.house)
          .then(successResponse => {
            var responseResult = JSON.parse(
              JSON.stringify(successResponse.data.data)
            );
            if (successResponse.data.code === 200) {
              this.$store.commit("updateSnackbarContent", "上传成功");
              this.reset();
            } else {
              this.$store.commit(
                "updateSnackbarContent",
                successResponse.data.message
              );
            }
          })
          .catch(failResponse => {});
      } else {
        this.$store.commit("updateSnackbarContent", "请先上传图片");
      }
    }
  }
};
</script>