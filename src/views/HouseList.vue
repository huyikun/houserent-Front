<template>
  <div>
    <v-container class="pa-2">
      <v-row>
        <v-col
          v-for="(house, index) in houseList"
          :key="index"
          v-if="index >= (page - 1) * cnt && index < page * cnt"
        >
          <v-card style="max-width: 300px;">
            <v-img
              :src="require('@/assets/pic2.jpg')"
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
              <v-card-text>￥{{ house.price }} / 晚</v-card-text>
              <v-spacer />
              <v-dialog v-model="dialog[index % cnt]" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="red lighten-2" dark v-on="on">
                    Details
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-1" primary-title>
                    欢迎您预览 {{ house.name }}
                  </v-card-title>
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
                  <v-card-text> {{ house.introduce }} </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="primary" text @click="closeall">
                      I accept
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination
        total-visible="5"
        v-model="page"
        :length="Math.ceil(houseList.length / cnt)"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    cnt: 3,
    dialog: [
      false,
      false,
      false,
    ],
    cycle: false,
    slides: [
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
    ],
    houseList: [
      {
        name: "room1",
        address: "address1",
        price: 10.0,
        size: "",
        introduce: "iam1",
        rent: 0.0,
        houseOwnerPhone: "",
        photoList: ["../assets/pic2.jpg",],
        timeLine: []
      },
      {
        name: "room2",
        address: "address2",
        price: 20.0,
        size: "",
        introduce: "iam2",
        rent: 0.0,
        houseOwnerPhone: "",
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
        houseOwnerPhone: "",
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
        houseOwnerPhone: "",
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
        houseOwnerPhone: "",
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
        houseOwnerPhone: "",
        photoList: ["../assets/img/Date A Live.jpg"],
        timeLine: []
      }
    ]
  }),
  methods: {
    closeall () {
      this.dialog[0] = false
      this.dialog[1] = false
      this.dialog[2] = false
    }
  }
};
</script>
