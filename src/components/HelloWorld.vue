<template>
  <div class="hello">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Welcome ! Good shoot!</h3>
              <h4>{{ card_text }}</h4>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat :to="{ name: 'Main' }" color="primary">GotoMain</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello, Vue!',
      card_text: 'Only time will tell'
    }
  }
}
</script>

