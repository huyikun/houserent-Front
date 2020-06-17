<template>
  <div style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;">
    <v-container>
      <v-card class="mx-auto mt-5" max-width="500">
        <v-img
          class="white--text"
          height="200px"
          src="../../static/img/docks.jpg"
        >
          <v-card-title class="align-end fill-height"
            >Hello, {{ username }}</v-card-title
          >
        </v-img>
        <v-card-text>
          <span
            v-if="usermode === 0"
            class="text--primary"
            style="font-size: 1.08em"
          >
            你可以去 管理订单 管理用户 注册房源
          </span>
          <span v-else>
            <span>用户名 : {{ username }}</span>
            <br />
            <span>邮箱地址: {{ email }}</span>
            <br />
            <span>手机号码: {{ phone }}</span>
            <br />
          </span>
        </v-card-text>

        <v-card-actions>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-spacer />
              <v-btn text color="blue" style="font-size: 1.08em" v-on="on"
                >联系我们</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title
                >摸鱼大队</v-card-title
              >
              <v-card-text style="font-size: 1.08em">
                <br />纯手工打造 0v0 <br />958337834@qq.com
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  color="blue"
                  text
                  @click="dialog = false"
                  style="font-size: 1.08em"
                  >关闭</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      username: this.$store.state.username,
      email: this.$store.state.email,
      phone: this.$store.state.phone,
      usermode: this.$store.state.usermode,
    };
  }
};
</script>