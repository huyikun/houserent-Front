<template>
  <v-card
    :loading="loading"
    class="mx-auto my-2"
    width="800"
    style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
  >
    <v-img height="200" src="../../static/img/cooking.png"></v-img>
    <v-card-title>Your home in Haidian</v-card-title>
    <v-card-text>
      <v-row align="center"></v-row>
      <div class="my-4 subtitle-1 black--text">$ • China, Beijing</div>
      <div>
        Our Wooden Lodge with Hot Tub is in Dimmingsdale forest the surroundings
        are beautiful and peaceful. There is lots to do like rock climbing the
        Churnet valley Boulders, Eating and drinking at the 5 pubs of Alton.
        Walking the staffordshire way or exploring the many forest tracks on
        your doorstep. You may want a fun packed day at Alton Towers park or
        spa. Cook on the BBQ, sit on your tree swing or relax in our new Hot Tub
        or toast marshmallows on your fire pit and listen to the owls hoot.
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div class="title text--primary">Choose the time to move into</div>
      <DatePicker />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="deep-purple accent-4" text @click="reserve">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
export default {
  components: {
    DatePicker
  },
  data: () => ({
    loading: false,
    selection: 1
  }),

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    }
  }
};
</script>
