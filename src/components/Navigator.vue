<template>
  <v-toolbar color="primary" dark>
    <v-btn icon @click="goBack">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <v-toolbar-title class="font-weight-bold">hello, {{ username }}</v-toolbar-title>

    <v-spacer />

    <v-toolbar-items class="hidden-xs-only">
      <v-btn text @click.stop="goOrder">Order</v-btn>
      <v-btn text @click.stop="goComplaint">Complaint</v-btn>
      <v-btn text @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      username: "HUYK",
    }
  },
  methods: {
    goBack: () => {
      window.history.back();
    },
    goOrder: function() {
      if (this.$route.name !== "Order") this.$router.push({ name: "Order" });
    },
    goComplaint: function() {
      if (this.$route.name !== "Complaint") this.$router.push({ name: "Complaint" });
    },
    logout: function() {
      this.$router.push({ name: "Signin" });
    },
    search: function() {},
  }
};
</script>
