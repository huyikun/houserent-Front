<template>
  <div class="hello">
    <v-card class="mx-auto mt-1" style="max-width: 500px;">
      <v-toolbar color="primary" cards dark>
        <v-card-title class="title font-weight-regular"
          >House Renting</v-card-title
        >
      </v-toolbar>
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-text-field
          v-model="username"
          :rules="[rules.username]"
          filled
          color="primary"
          label="Username"
          type="username"
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
  data () {
    return {
      username: '',
      email: '',
      password: '',
      agreement: false,
      form: false,
      rules: {
        username: v => (v || '').match(/^[a-zA-Z]{2,}$/) || 'Please enter your name',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/) ||
          'Password must contain letters and numeric characters',
      },
    }
  },
  methods: {
    goSignup: function () {
      this.$router.push({ name: 'Signup' })
    },
    Signin () {
      this.$axios
        .post('/login', {
          username: this.username,
          password: this.password,
        })
        .then(successResponse => {
          var responseResult = JSON.parse(JSON.stringify(successResponse.data.data))
          if (successResponse.data.code === 200) {
            this.$store.commit('updateMode', responseResult)
            this.$router.push({ name: 'WorkingPanel' })
            this.$store.commit('updateSnackbarContent', '登录成功')
          }
          else {
            this.$store.commit('updateSnackbarContent', successResponse.data.message)
          }
        })
        .catch(failResponse => { })
    },
  }
}
</script>