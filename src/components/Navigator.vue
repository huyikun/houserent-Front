<template>
  <v-toolbar color="primary" dark>
    <v-btn icon @click="goBack"><v-icon>arrow_back</v-icon></v-btn>
    <v-toolbar-title class="font-weight-bold">
      hello, {{ username }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-xs-only">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">
            查看
          </v-btn>
        </template>
        <v-card>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1"
                >Name of step 1</v-stepper-step
              >
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2"
                >Name of step 2</v-stepper-step
              >
              <v-divider></v-divider>
              <v-stepper-step step="3">Name of step 3</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>
                <v-btn color="primary" @click="e1 = 2">
                  Continue
                </v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>
                <v-btn color="primary" @click="e1 = 3">
                  Continue
                </v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>
                <v-btn color="primary" @click="e1 = 1">
                  Continue
                </v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-dialog>

      <v-btn text @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      username: 'HUYK',
      e1: 0,
    }
  },
  methods: {
    goBack: () => {
      window.history.back()
    },

    logout: function () {
      this.$router.push({ name: 'Signin' })
    }
  }
}
</script>
