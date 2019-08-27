<template>
  <div>
    <OrderSearch />
    <v-container
      style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875;"
    >
      <v-row>
        <v-col v-for="(house, index) in houseList" :key="index" offset="left">
          <v-card style="max-width: 300px;" class="ml-10">
            <v-img
              :src="require('@/assets/pic2.jpg')"
              class="white--text"
              height="145px"
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
                  <v-btn color="red lighten-2" dark v-on="on">Details</v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-1" primary-title
                    >欢迎您预览 {{ house.name }}</v-card-title
                  >
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
                    <v-btn color="red lighten-2" dark @click="closeall(index)"
                      >Order Now</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import OrderSearch from '@/components/OrderSearch.vue'
export default {
  components: {
    OrderSearch,
  },
  data: () => ({
    page: 1,
    cnt: 6,
    dialog: [false, false, false, false, false, false],
    cycle: false,
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
  }),
  methods: {
    closeall (index) {
      this.$router.push({ name: "OrderConfirm" });
      this.dialog[index] = false;
    },
  },
  computed: {
    houseList: {
      get () {
        return this.$store.state.houseList
      },
      set (value) {
        this.$store.commit('updateHouseList', value)
      }
    },
  }
};
</script>
