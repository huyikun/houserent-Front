<template>
  <v-toolbar color="primary" dark>
    <v-btn icon @click="goBack"><v-icon>arrow_back</v-icon></v-btn>
    <v-toolbar-title class="font-weight-bold">
      hello, {{ username }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-xs-only">
      <v-btn text @click.stop="goOrder">
        Order
      </v-btn>
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
      username: 'HUYK',
    }
  },
  methods: {
    goBack: () => {
      window.history.back()
    },
    goOrder: function () {
      if (this.$route.name !== 'Page1')
        this.$router.push({ name: 'Page1' })
    },
    logout: function () {
      this.$router.push({ name: 'Signin' })
    },
    search: function () {

    }
  }
}
</script>
