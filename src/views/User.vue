<template>
  <div style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;">
    <v-container>
      <v-card class="mx-auto mt-5" max-width="500">
        <v-img class="white--text" height="200px" src="../../static/img/docks.jpg">
          <v-card-title class="align-end fill-height">Hello, {{ username }}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>Username: {{ username }}</span>
            <br />
            <span>Email : {{ email }}</span>
            <br />
            <span>Phone : {{ phone }}</span>
            <br />
          </span>
        </v-card-text>

        <v-card-actions>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="red lighten-2" dark v-on="on">Contact us</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Team Member</v-card-title>
              <v-card-text>
                <br />HYK 958337834@qq.com
                <br />Dastur xxx@xx.com
                <br />
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" text @click="dialog = false">OK</v-btn>
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
  data() {
    return {
      dialog: false,
      username: this.$store.state.username,
      email: this.$store.state.email,
      phone: this.$store.state.phone
    };
  }
};
</script>