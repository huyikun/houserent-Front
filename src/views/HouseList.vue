<template>
  <div>
    <v-container class="pa-2">
      <v-row>
        <v-col
          v-for="(house, index) in houseList"
          :key="index"
          v-if="index >= (page - 1) * 3 && index < page * 3"
        >
          <v-card>
            <v-img
              :src="house.photoList[0]"
              class="white--text"
              height="200px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title
                class="fill-height align-end"
                v-text="house.address"
              ></v-card-title>
            </v-img>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn @click>DETAILS</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination
        total-visible="5"
        v-model="page"
        :length="houseList.length / 3"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    houseList: [
      {
        address: "1",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["src/assets/img/2B 01.jpg",],
        timeLine: []
      },
      {
        address: "2",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["src/assets/img/2B 02.jpg"],
        timeLine: []
      },
      {
        address: "3",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["../assets/img/Andersen.jpg"],
        timeLine: []
      },
      {
        address: "4",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["../assets/img/Angela.jpg"],
        timeLine: []
      },
      {
        address: "5",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["../assets/img/Cuora.jpg"],
        timeLine: []
      },
      {
        address: "6",
        size: "",
        introduce: "",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["../assets/img/Date A Live.jpg"],
        timeLine: []
      }
    ]
  }),
};
</script>