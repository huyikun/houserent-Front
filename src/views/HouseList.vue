<template>
  <div>
    <v-container class="pa-2">
      <v-row>
        <v-col v-for="house in houseList" :key="house.houseId">
          <v-card>
            <v-img
              :src="house.photoList[0]"
              class="white--text"
              height="200px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="fill-height align-end" v-text="house.address"></v-card-title>
            </v-img>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn @click>DETAILS</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-2">
      <v-row>
        <v-col v-for="house in houseList" :key="house.houseId">
          <v-card>
            <v-img
              :src="house.photoList[0]"
              class="white--text"
              height="200px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="fill-height align-end" v-text="house.address"></v-card-title>
            </v-img>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn @click>DETAILS</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    houseList: [
      {
        houseId: "1",
        address: "Pre-fab homes",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["https://cdn.vuetifyjs.com/images/cards/house.jpg"],
        timeLine: []
      },
      {
        houseId: "2",
        address: "Favorite road trips",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["https://cdn.vuetifyjs.com/images/cards/road.jpg"],
        timeLine: []
      },
      {
        houseId: "2",
        address: "Best airlines",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["https://cdn.vuetifyjs.com/images/cards/plane.jpg"],
        timeLine: []
      }
    ]
  })
};
</script>