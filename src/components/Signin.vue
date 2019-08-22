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
      msg: 'Hello, Vue!',
      card_text: 'Only time will tell',
      agreement: false,
      username: '',
      dialog: false,
      email: undefined,
      form: false,
      isLoading: false,
      password: undefined,
      phone: undefined,
      rules: {
        username: v => (v || '').match(/^[a-zA-Z]{2,}$/) || 'Please enter your name',
        phone: v => (v || '').match(/^1[3456789]\d{9}$/) || 'Please enter a correct phone number',
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/) ||
          'Password must contain letters and numeric characters',
        required: v => !!v || 'This field is required',
      }
    }
  },
  methods: {
    goSignup: function () {
      this.$router.push({ name: 'Signup' })
    },
  }
}
</script>