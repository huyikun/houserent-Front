<template>
  <v-toolbar color="primary" dark>
    <v-btn icon @click="goBack">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-btn icon @click="goHome">
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn icon @click="goUser">
      <v-icon>account_circle</v-icon>
    </v-btn>

    <v-spacer />

    <v-toolbar-items class="hidden-xs-only">
      <v-btn v-if="usermode === 1" text @click.stop="goOrder">Order</v-btn>
      <v-btn v-if="usermode === 1" text @click.stop="goComplaint"
        >Complaint</v-btn
      >
      <v-btn v-if="usermode === 2" text @click.stop="">房东</v-btn>
      <v-btn v-if="usermode === 2" text @click.stop="">房东2</v-btn>
      <v-btn v-if="usermode === 3" text @click.stop="">工人</v-btn>
      <v-btn text @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      username: this.$store.state.username,
      usermode: this.$store.state.usermode,
    }
  },
  methods: {
    goBack: () => {
      window.history.back()
    },
    goUser: function () {
      if (this.$route.name !== 'User') this.$router.push({ name: 'User' })
    },
    goHome: function () {
      if (this.$route.name !== 'WorkingPanel') this.$router.push({ name: 'WorkingPanel' })
    },
    goOrder: function () {
      if (this.$route.name !== 'Order') this.$router.push({ name: 'Order' })
    },
    goComplaint: function () {
      if (this.$route.name !== 'Complaint') this.$router.push({ name: 'Complaint' })
    },
    logout: function () {
      this.$store.commit('updateSnackbarContent', '已登出')
      this.$router.push({ name: 'Signin' })
    },
    search: function () { }
  },
};
</script>
