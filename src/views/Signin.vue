<template>
  <div class="hello">
    <img
      style="width:100%; height:100%; position:fixed;"
      src="static/img/background.jpg"
    />
    <div
      style="padding-left:35%; padding-right:35%;padding-top:10%;filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
    >
      <v-card>
        <v-toolbar color="primary" cards dark>
          <v-card-title class="title font-weight-regular"
            >房屋出租系统</v-card-title
          >
        </v-toolbar>
        <v-form ref="form" v-model="form" class="pa-4 pt-6">
          <v-text-field
            v-model="username"
            :rules="[rules.username]"
            filled
            color="primary"
            label="用户名"
            style="font-weight: bold;"
            type="username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.password, rules.length(6)]"
            filled
            color="primary"
            label="密码"
            style="font-weight: bold;"
            type="password"
          ></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            @click="goSignup"
            color="info"
            dark
            style="font-size:1.08em; width: 20%"
            >注册</v-btn
          >
          <div class="flex-grow-1"></div>
          <v-btn
            @click="Signin"
            color="success"
            dark
            style="font-size:1.08em; width: 20%"
            >登录</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: "",
      email: "",
      password: "",
      agreement: false,
      form: false,
      rules: {
        username: v => (v || "").match(/^[a-zA-Z]{2,}$/) || "请输入你的用户名",
        length: len => v => (v || "").length >= len || `密码至少需要${len}位`,
        password: v =>
          (v || "").match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/) ||
          "密码必须包含字母和数字且最少6位"
      }
    };
  },
  methods: {
    goSignup: function () {
      this.$router.push({ name: "Signup" });
    },
    Signin () {
      this.$axios
        .post("/user/login", {
          username: this.username,
          password: this.password
        })
        .then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            this.$store.commit("updateMode", responseResult);
            localStorage.setItem("logged", JSON.stringify({ logged: true }));
            localStorage.setItem("myuser", JSON.stringify(this.$store.state));
            this.$router.push({ name: "WorkingPanel" });
            this.$store.commit("updateSnackbarContent", "登录成功");
          } else {
            this.$store.commit(
              "updateSnackbarContent", successResponse.data.message
            );
          }
        }).catch(failResponse => { });
    }
  }
};
</script>