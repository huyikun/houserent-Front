<template>
  <div>
    <img
      style="width:100%; height:100%; position:fixed;"
      src="static/img/background.jpg"
    />
    <v-toolbar color="primary" dark>
      <v-btn icon @click="goBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn icon @click="goHome">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon @click="goUserCard">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-if="usermode === 0"
          text
          @click.stop="goAddHouse"
          style="font-size:1.08em"
          >注册房源</v-btn
        >
        <v-btn
          v-if="usermode === 0"
          text
          @click.stop="goUserControl"
          style="font-size:1.08em"
          >管理用户</v-btn
        >
        <v-btn
          v-if="usermode === 0"
          text
          @click.stop="goHome"
          style="font-size:1.08em"
          >管理订单</v-btn
        >
        <v-btn
          v-if="usermode === 1"
          text
          @click.stop="goOrder"
          style="font-size:1.08em"
          >立即预定</v-btn
        >
        <v-btn
          v-if="usermode === 1"
          text
          @click.stop="goComplaint"
          style="font-size:1.08em"
          >报修投诉</v-btn
        >
        <v-btn v-if="usermode === 2" text @click.stop style="font-size:1.08em"
          >房东</v-btn
        >
        <v-btn v-if="usermode === 2" text @click.stop style="font-size:1.08em"
          >房东2</v-btn
        >
        <v-btn v-if="usermode === 3" text @click.stop style="font-size:1.08em"
          >工人</v-btn
        >
        <v-btn text @click="logout" style="font-size:1.08em">注销</v-btn>
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
    goUserCard: function () {
      if (this.$route.name !== "UserCard")
        this.$router.push({ name: "UserCard" });
    },
    goHome: function () {
      if (this.$route.name !== "WorkingPanel")
        this.$router.push({ name: "WorkingPanel" });
    },
    goUserControl: function () {
      if (this.$route.name !== "UserControl")
        this.$router.push({ name: "UserControl" });
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
