<template>
  <div class="hello">
    <v-card class="mx-auto" style="max-width: 500px;">
      <v-toolbar color="primary" cards dark flat>
        <v-card-title class="title font-weight-regular"
          >House Renting</v-card-title
        >
      </v-toolbar>
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-text-field
          v-model="loginInfoVo.email"
          :rules="[rules.email]"
          filled
          color="primary"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="loginInfoVo.password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="primary"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="Signin">
          Signin
        </v-btn>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="goSignup" depressed>Signup</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      loginInfoVo: { email: '', password: '' },
      agreement: false,
      email: undefined,
      form: false,
      password: undefined,
      rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/) ||
          'Password must contain letters and numeric characters',
      }
    }
  },
  methods: {
    goSignup: function () {
      this.$router.push({ name: 'Signup' })
    },
    Signin () {
      this.$axios
        .post('/login', {
          username: this.loginInfoVo.username,
          password: this.loginInfoVo.password
        })
        .then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$router.replace({ path: '/index' })
          }
        })
        .catch(failResponse => { })
    },
  }
}
</script>