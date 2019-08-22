<template>
  <v-toolbar color="primary" dark>
    <v-btn flat icon @click="goBack"><v-icon>arrow_back</v-icon></v-btn>
    <v-toolbar-title class="font-weight-bold">
      Hello?
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{ name: 'Page1' }">
        Page1
      </v-btn>
      <v-btn flat :to="{ name: 'Page2' }">
        Page2
      </v-btn>
      <v-btn flat :to="{ name: 'Page3' }">
        Page3
      </v-btn>
      <v-btn flat @click="logout">
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
      this.$router.push({ name: 'HelloWorld' })
    }
  }
}
</script>
