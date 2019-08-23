<template>
  <v-card>
    <v-stepper v-model="e13" vertical>
      <v-stepper-step step="1" complete>Step 1</v-stepper-step>

      <v-stepper-content step="1">
        <v-radio-group class="pt-3 pl-3 pr-3" v-model="column" column>
          <v-radio label="短租" value="radio-1"></v-radio>
          <v-radio label="长租" value="radio-2"></v-radio>
        </v-radio-group>
        <v-btn color="primary" @click="e13++">Next</v-btn>
      </v-stepper-content>

      <v-stepper-step step="2" complete>Step 2</v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="e13++">Continue</v-btn>
        <v-btn @click="e13--">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3">Step 3</v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="search">Search</v-btn>
        <v-btn @click="e13--">Back</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      e13: 1,
      column: null
    };
  },
  methods: {
    search() {
      dialog = false;
    }
  }
};
</script>