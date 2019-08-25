<template>
  <div class="form-group">
    <label class="control-label">上传图片</label>
    <div class="control-form">
      <p class="help-block">
        (建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传4张)
      </p>
      <ul class="upload-imgs">
        <li v-if="imgLen >= 4 ? false : true">
          <input
            type="file"
            class="upload"
            @change="addImg"
            ref="inputer"
            multiple
            accept="image/png,image/jpeg,image/gif,image/jpg"
          />
          <v-btn @click="submit">点击上传</v-btn>
        </li>
        <li v-for="(value, key) in imgs">
          <p class="img">
            <img :src="getObjectURL(value)" /><a
              class="close"
              @click="delImg(key)"
              >×</a
            >
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: new FormData(),
      imgs: {},
      imgLen: 0,
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
        console.log(this.imgs[key])
        let name = key.split('?')[0];
        this.formData.append('multipartFiles', this.imgs[key], name);
      }
      this.$axios.post('/opinion', this.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        this.alertShow = true;
      });
    },
  }
}
</script>