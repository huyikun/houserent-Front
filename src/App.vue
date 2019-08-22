<template>
  <v-app>
    <div id="app">
      <router-view />
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn color="pink" @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      snackbar: false,
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 6000,
      text: 'Hello, I\'m a snackbar'
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 4px;
}
</style>
