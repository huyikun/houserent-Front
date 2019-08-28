<template>
  <div>
    <img
      style="width:100%; height:100%; position:fixed;"
      src="static/img/material.jpg"
    />
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
        <v-btn v-if="usermode === 0" text @click.stop="goAddHouse"
          >添加房源</v-btn
        >
        <v-btn v-if="usermode === 1" text @click.stop="goOrder">立即预定</v-btn>
        <v-btn v-if="usermode === 1" text @click.stop="goComplaint"
          >报修投诉</v-btn
        >
        <v-btn v-if="usermode === 2" text @click.stop>房东</v-btn>
        <v-btn v-if="usermode === 2" text @click.stop>房东2</v-btn>
        <v-btn v-if="usermode === 3" text @click.stop>工人</v-btn>
        <v-btn text @click="logout">注销</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: this.$store.state.username,
      usermode: this.$store.state.usermode
    };
  },
  methods: {
    goBack: () => {
      window.history.back();
    },
    goAddHouse: function () {
      if (this.$route.name !== "AddHouse")
        this.$router.push({ name: "AddHouse" });
    },
    goUser: function () {
      if (this.$route.name !== "User") this.$router.push({ name: "User" });
    },
    goHome: function () {
      if (this.$route.name !== "WorkingPanel")
        this.$router.push({ name: "WorkingPanel" });
    },
    goOrder: function () {
      if (this.$route.name !== "Order") this.$router.push({ name: "Order" });
    },
    goComplaint: function () {
      if (this.$route.name !== "Complaint")
        this.$router.push({ name: "Complaint" });
    },
    logout: function () {
      this.$store.commit("updateSnackbarContent", "已登出");
      this.$router.push({ name: "Signin" });
    },
    search: function () { }
  }
};
</script>
