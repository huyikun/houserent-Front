<template>
  <v-toolbar color="primary" dark>
    <v-btn icon @click="goBack"><v-icon>arrow_back</v-icon></v-btn>
    <v-toolbar-title class="font-weight-bold">
      Hello?
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text :to="{ name: 'Page1' }">
        Page1
      </v-btn>
      <v-btn text :to="{ name: 'Page2' }">
        Page2
      </v-btn>
      <v-btn text :to="{ name: 'Page3' }">
        Page3
      </v-btn>
      <v-btn text @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
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
