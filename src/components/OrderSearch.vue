<template>
  <v-row class="mx-2">
    <v-col>
      <v-text-field
        v-model="keyword"
        solo
        hide-details
        placeholder="找找你想要的吧"
      >
        <v-icon slot="prepend" color="green">search</v-icon>
      </v-text-field>
    </v-col>
    <v-btn class="mt-4" color="red lighten-2" dark @click="search">查找</v-btn>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
    }
  },
  methods: {
    search () {
      this.$axios
        .post("/search", keyword)
        .then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            this.$store.commit('updateHouseList', responseResult)
          } else {
            this.$store.commit("updateSnackbarContent", successResponse.data.message);
          }
        })
        .catch(failResponse => { })
    }
  }
}
</script>
