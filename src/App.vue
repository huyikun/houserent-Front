<template>
  <v-app>
    <div id="app">
      <router-view />
    </div>
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
      <v-btn color="primary" @click="closesnackbar">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 6000,
    }
  },
  created() {
    
    localStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(localStorage.getItem("userMsg")));
    localStorage.setItem("logged", JSON.stringify({logged : false}));
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state));
        localStorage.setItem("logged", JSON.stringify({logged : false}))
    })
  },
  methods: {
    closesnackbar: function () {
      this.$store.commit('updateSnackbar', false)
    }
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.snackbar
      },
      set (value) {
        this.$store.commit('updateSnackbar', value)
      }
    },
    text: {
      get () {
        return this.$store.state.text
      },
      set (value) {
        this.$store.commit('updateSnackbar', value)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #000;
  /* margin-top: 4px; */
}
</style>
