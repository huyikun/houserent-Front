<template>
  <div class="hello">
    <v-card class="mx-auto" style="max-width: 500px;">
      <v-toolbar color="primary" cards dark>
        <v-card-title class="title font-weight-regular">House Renting</v-card-title>
      </v-toolbar>
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          filled
          color="primary"
          label="Email address"
          type="email"
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
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn color="pink" @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      agreement: false,
      form: false,
      rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/) ||
          'Password must contain letters and numeric characters',
      },
      snackbar: false,
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 6000,
      text: '邮箱或密码错误',
    }
  },
  methods: {
    goSignup: function () {
      this.$router.push({ name: 'Signup' })
    },
    Signin () {
      this.$axios
        .post('/login', {
          username: this.email,
          password: this.password
        })
        .then(successResponse => {
          // this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$router.push({ path: '/signup' })
          }
          else {
            Snackbar = true
          }
        })
        .catch(failResponse => { })
    },
  }
}
</script>