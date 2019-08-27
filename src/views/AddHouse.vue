<template>
  <v-card
    style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;"
  >
    <v-row class="my-5">
      <v-col>
        <v-card-title>上传图片</v-card-title>
        <v-card-text>
          (建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传3张) <br />
          上传成功后再进行房屋其他信息的注册
        </v-card-text>
        <ul>
          <li v-if="imgLen >= 3 ? false : true">
            <input
              type="file"
              class="upload"
              @change="addImg"
              ref="inputer"
              multiple
              accept="image/png,image/jpeg,image/gif,image/jpg"
            />
          </li>
          <li v-else>
            <input value="每次最多上传3张图片 0v0" />
          </li>
          <v-row>
            <v-col
              v-for="(value, key) in imgs"
              :key="key"
              style="max-width: 200px;"
            >
              <v-img :src="getObjectURL(value)" height="150px" /><a
                class="close"
                @click="delImg(key)"
                >×</a
              >
            </v-col>
          </v-row>
          <v-btn @click="submit">点击上传</v-btn>
        </ul> </v-col
      ><v-col>
        <v-text-field
          style="max-width: 400px;"
          label="房屋名称"
          v-model="house.name"
          filled
        ></v-text-field>
        <v-text-field
          style="max-width: 400px;"
          label="房屋地址"
          v-model="house.address"
          filled
        ></v-text-field
        ><v-text-field
          style="max-width: 400px;"
          label="房屋定价(每晚)"
          v-model="house.price"
          filled
        ></v-text-field>
        <v-text-field
          style="max-width: 400px;"
          label="房屋类型"
          v-model="house.type"
          filled
        ></v-text-field>
        <v-text-field
          style="max-width: 400px;"
          label="房主联系方式"
          v-model="house.ownerphone"
          filled
        ></v-text-field>
        <v-textarea
          filled
          name="input-7-4"
          label="房屋简介"
          v-model="house.introduce"
          style="max-width: 400px;"
        ></v-textarea>
        <v-btn v-if="showaddhouse" dark color="red lighten-2" @click="addhouse">
          注册房屋
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      formData: new FormData(),
      fil: {},
      imgs: {},
      imgLen: 0,
      showaddhouse: true,
      house: {
        name: '',
        address: '',
        ownerphone: '',
        type: null,
        price: null,
        introduce: '',
        photos: {}
      },
    }
  },
  methods: {
    addImg (event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 4) {
        alert('最多可上传4张，您还可以上传' + (4 - oldLen) + '张');
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          alert('请选择5M以内的图片！');
          return false
        }
        this.imgLen++;
        this.$set(this.imgs, this.fil[i].name + '?' + new Date().getTime() + i, this.fil[i]);
      }
    },
    getObjectURL (file) {
      var url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    delImg (key) {
      this.$delete(this.imgs, key);
      this.imgLen--;
    },
    submit () {
      for (let key in this.imgs) {
        let name = key.split('?')[0];
        this.formData.append('multipartFiles', this.imgs[key], name);
      }
      this.$axios.post('/picture/batch/upload', this.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.$store.commit('updateSnackbarContent', '上传成功')
          this.showaddhouse = true
          this.house.photos = responseResult
        } else {
          this.$store.commit('updateSnackbarContent', successResponse.data.message)
        }
      }).catch(failResponse => { })
    },
    addhouse () {
      this.$axios.post('/house/AddHouse', this.house)
        .then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            this.$store.commit('updateSnackbarContent', '上传成功')
            this.reset()
          } else {
            this.$store.commit('updateSnackbarContent', successResponse.data.message)
          }
        }).catch(failResponse => { })
    },
    reset () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>