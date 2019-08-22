<template>
  <div class="mybutton">
    <v-flex xs12 sm3>
      <v-btn flat icon color="indigo" @click="msg = msg + 1">
        <v-icon>star</v-icon>{{ msg }}
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'Mybutton',
  data () {
    return {
      msg: 0,
    }
  }
}
</script>
