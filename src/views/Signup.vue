<template>
  <div class="hello">
    <v-card class="mx-auto mt-1" style="max-width: 500px;">
      <v-toolbar color="primary" cards dark flat>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-title class="title font-weight-regular">Sign up</v-card-title>
      </v-toolbar>
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-text-field
          v-model="username"
          :rules="[rules.username]"
          filled
          style="min-height: 96px"
          color="primary"
          label="Username"
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
        <v-checkbox
          v-model="agreement"
          :rules="[rules.required]"
          color="primary"
        >
          <template v-slot:label>
            I agree to the &nbsp;
            <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>
          </template>
        </v-checkbox>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="$refs.form.reset()">
          Clear
        </v-btn>
        <div class="flex-grow-1"></div>
        <v-btn
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="primary"
          @click="Signup"
          depressed
          >Submit</v-btn
        >
      </v-card-actions>
      <v-dialog v-model="dialog" absolute max-width="400" persistent>
        <v-card>
          <v-card-title class="headline grey lighten-3">Policy</v-card-title>
          <v-card-text>
            There is a Policy you should obey.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              class="white--text"
              color="primary"
              @click="(agreement = true), (dialog = false)"
            >
              Yes
            </v-btn>
            <div class="flex-grow-1"></div>
            <v-btn @click="(agreement = false), (dialog = false)">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      agreement: false,
      dialog: false,
      form: false,
      isLoading: false,
      username: '',
      email: undefined,
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
    goBack: () => {
      window.history.back()
    },

    Signup () {
      this.$axios
        .post('/user/register', {
          username: this.username,
          password: this.password,
          email: this.email,
          phoneNumber: this.phone,
        })
        .then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$store.commit('updateSnackbarContent', '注册成功')
            this.$router.push({ name: 'Signin' })
          } else {
            this.$store.commit('updateSnackbarContent', successResponse.data.message)
          }
        })
        .catch(failResponse => { })
    }
  }
}
</script>