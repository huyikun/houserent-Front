<template>
  <div class="hello">
    <img style="width:100%; height:100%; position:fixed;" src="static/img/background.jpg" />
    <div
      style="padding-left:30%; padding-right:30%;padding-top:4%;filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
    >
      <v-card class="mx-auto mt-1" style="max-width: 500px;">
        <v-toolbar color="primary" cards dark flat>
          <v-btn icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-card-title class="title font-weight-regular">注册</v-card-title>
        </v-toolbar>
        <v-form ref="form" v-model="form" class="pa-4 pt-6">
          <v-text-field
            v-model="username"
            :rules="[rules.username]"
            filled
            style="font-weight: bold;"
            color="primary"
            label="用户名"
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
          <v-text-field
            v-model="phone"
            :rules="[rules.phone]"
            filled
            color="primary"
            label="手机号码"
            style="font-weight: bold;"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            color="primary"
            label="电子邮箱地址"
            style="font-weight: bold;"
            type="email"
          ></v-text-field>
          <v-checkbox v-model="agreement" :rules="[rules.required]" color="primary">
            <template v-slot:label>
              <div style="font-size: 1.08em;">我同意</div>&nbsp;
              <a href="#" @click.stop.prevent="dialog = true" style="font-size: 1.08em;">隐私条款</a>
            </template>
          </v-checkbox>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            @click="$refs.form.reset()"
            color="green"
            dark
            style="font-size: 1.08em; width: 20%;"
          >清除</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn
            :disabled="!form"
            :loading="isLoading"
            class="white--text"
            color="blue"
            dark
            style="font-size: 1.08em; width: 20%;"
            @click="Signup"
          >提交</v-btn>
        </v-card-actions>
        <v-dialog v-model="dialog" absolute max-width="400" persistent>
          <v-card>
            <v-card-title class="headline grey lighten-3">隐私条款</v-card-title>
            <v-card-text style="font-size: 1.08em;">这是您需要遵守的隐私条款</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                class="white--text"
                color="blue"
                dark
                style="font-size: 1.08em;"
                @click="(agreement = true), (dialog = false)"
              >同意</v-btn>
              <div class="flex-grow-1"></div>
              <v-btn
                @click="(agreement = false), (dialog = false)"
                color="red lighten-2"
                dark
                style="font-size: 1.08em;"
              >不同意</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agreement: false,
      dialog: false,
      form: false,
      isLoading: false,
      username: "",
      email: undefined,
      password: undefined,
      phone: undefined,
      rules: {
        username: v =>
          (v || "").match(/^[a-zA-Z]{2,}$/) || "用户名仅由字母组成且至少两位",
        phone: v => (v || "").match(/^1[3456789]\d{9}$/) || "电话号码格式错误",
        email: v =>
          (v || "").match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/) ||
          "电子邮箱地址格式错误",
        length: len => v => (v || "").length >= len || `密码至少需要${len}位`,
        password: v =>
          (v || "").match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/) ||
          "密码必须同时包含字母和数字且至少需要6位",
        required: v => !!v || "您需要同意隐私条款"
      }
    };
  },
  methods: {
    goBack: () => {
      window.history.back();
    },

    Signup() {
      this.$axios
        .post("/user/register", {
          username: this.username,
          password: this.password,
          email: this.email,
          phoneNumber: this.phone
        })
        .then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data);
          if (successResponse.data.code === 200) {
            this.$store.commit("updateSnackbarContent", "注册成功");
            this.$router.push({ name: "Signin" });
          } else {
            this.$store.commit(
              "updateSnackbarContent",
              successResponse.data.message
            );
          }
        })
        .catch(failResponse => {});
    }
  }
};
</script>