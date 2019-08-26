<template>
  <div style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;">
    <v-container class="pa-2">
      <v-row>
        <v-col
          v-for="(house, index) in houseList"
          :key="index"
          v-if="index >= (page - 1) * cnt && index < page * cnt"
        >
          <v-card style="max-width: 300px;" class="mx-auto">
            <v-img
              :src="require('@/assets/pic2.jpg')"
              class="white--text"
              height="145px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="fill-height align-end" v-text="house.address"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-card-text>￥{{ house.price }} / 晚</v-card-text>
              <v-spacer />
              <v-dialog v-model="dialog[index % cnt]" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="red lighten-2" dark v-on="on">Details</v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-1" primary-title>欢迎您预览 {{ house.name }}</v-card-title>
                  <v-carousel
                    :continuous="false"
                    :cycle="cycle"
                    hide-delimiter-background
                    height="250"
                  >
                    <v-carousel-item v-for="(slide, i) in slides" :key="i">
                      <v-img
                        :src="require('@/assets/pic2.jpg')"
                        height="200px"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      />
                    </v-carousel-item>
                  </v-carousel>
                  <v-card-text>
                    房屋地址: {{ house.address }}
                    <br />
                    房屋简介: {{ house.introduce }}
                    <br />
                    房东电话: {{ house.ownerphone }}
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="red lighten-2" dark @click="closeall(index)">Order Now</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center" style="z-index:1">
      <v-pagination  v-model="page" :length="Math.ceil(houseList.length / cnt)"></v-pagination>
    </div>
  </div>
  
</template>
<script>
import DatePicker from "@/components/DatePicker.vue";
export default {
  components: {
    DatePicker
  },
  data: () => ({
    page: 1,
    cnt: 6,
    dialog: [false, false, false, false, false, false],
    cycle: false,
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    houseList: [
      {
        name: "room1",
        address: "address1",
        price: 10.0,
        size: "",
        introduce: "iam1",
        rent: 0.0,
        ownerphone: "111111",
        photoList: ["../assets/pic2.jpg"],
        timeLine: []
      },
      {
        name: "room2",
        address: "address2",
        price: 20.0,
        size: "",
        introduce: "iam2",
        rent: 0.0,
        ownerphone: "222222",
        photoList: ["src/assets/img/2B 02.jpg"],
        timeLine: []
      },
      {
        name: "room3",
        address: "address3",
        price: 30.0,
        size: "",
        introduce: "iam3",
        rent: 0.0,
        ownerphone: "33333",
        photoList: ["../assets/img/Andersen.jpg"],
        timeLine: []
      },
      {
        name: "room4",
        address: "address4",
        price: 40.0,
        size: "",
        introduce: "iam4",
        rent: 0.0,
        ownerphone: "44444",
        photoList: ["../assets/img/Angela.jpg"],
        timeLine: []
      },
      {
        name: "room5",
        address: "address5",
        price: 50.0,
        size: "",
        introduce: "iam5",
        rent: 0.0,
        ownerphone: "55555",
        photoList: ["../assets/img/Cuora.jpg"],
        timeLine: []
      },
      {
        name: "room6",
        address: "address6",
        price: 60.0,
        size: "",
        introduce: "iam6",
        rent: 0.0,
        ownerphone: "66666",
        photoList: ["../assets/img/Date A Live.jpg"],
        timeLine: []
      },
      {
        name: "room7",
        address: "address7",
        price: 70.0,
        size: "",
        introduce: "iam7",
        rent: 0.0,
        ownerphone: "77777",
        photoList: ["../assets/pic2.jpg"],
        timeLine: []
      }
    ]
  }),
  methods: {
    closeall(index) {
      this.$router.push({ name: "OrderConfirm" });
      this.dialog[index] = false;
    }
  }
};
</script>
