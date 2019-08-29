<template>
  <div class="hello">
    <img style="width:100%; height:100%; position:fixed;" src="static/img/background.jpg" />
    <div
      style="padding-left:30%; padding-right:30%;padding-top:4%;filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
    >
      <v-card class="mx-auto mt-1">
        <v-toolbar color="primary" cards dark flat>
          <v-btn icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-card-title class="title font-weight-regular">注册账户</v-card-title>
        </v-toolbar>
        <v-form ref="form" v-model="form" class="pa-4 pt-6">
          <v-text-field
            v-model="username"
            :rules="[rules.username]"
            filled
            style="min-height: 96px"
            color="primary"
            label="用户名"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.password, rules.length(6)]"
            filled
            color="primary"
            label="Password"
            style="min-height: 96px"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            :rules="[rules.phone]"
            filled
            color="primary"
            label="Phone number"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            color="primary"
            label="Email address"
            type="email"
          ></v-text-field>
          <v-checkbox v-model="agreement" :rules="[rules.required]" color="primary">
            <template v-slot:label>
              I agree to the &nbsp;
              <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>
            </template>
          </v-checkbox>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="$refs.form.reset()">Clear</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn
            :disabled="!form"
            :loading="isLoading"
            class="white--text"
            color="primary"
            @click="Signup"
            depressed
          >Submit</v-btn>
        </v-card-actions>
        <v-dialog v-model="dialog" absolute max-width="400" persistent>
          <v-card>
            <v-card-title class="headline grey lighten-3">Policy</v-card-title>
            <v-card-text>There is a Policy you should obey.</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                class="white--text"
                color="primary"
                @click="(agreement = true), (dialog = false)"
              >Yes</v-btn>
              <div class="flex-grow-1"></div>
              <v-btn @click="(agreement = false), (dialog = false)">No</v-btn>
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
      user: undefined,
      rules: {
        username: v =>
          (v || "").match(/^[a-zA-Z]{2,}$/) ||
          "用户名由大写字母或小写字母组成，且最少需要两位",
        phone: v =>
          (v || "").match(/^1[3456789]\d{9}$/) || "请输入正确格式的手机号码",
        email: v => (v || "").match(/@/) || "请输入正确格式的邮箱",
        length: len => v => (v || "").length >= len || `密码至少需要${len}位`,
        password: v =>
          (v || "").match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/) ||
          `密码必须同时包含字母和数字，且最少需要6位`,
        required: v => !!v || `需要同意协议`
      }
    };
  },
  methods: {
    goBack: () => {
      window.history.back();
    },

    Signup() {
      this.user = {
        username: this.username,
        password: this.password,
        email: this.email,
        phoneNumber: this.phone
      };
      this.$axios
        .post("/register", {
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
      console.log(this.user);
    }
  }
};
</script>