<template>
  <div>
    <OrderSearch />
    <div
      style="filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
    >
      <v-container>
        <v-row>
          <v-col
            v-for="(house, index) in houseList"
            :key="index"
            v-if="index >= (page - 1) * cnt && index < page * cnt"
          >
            <v-card style="max-width: 300px;" class="ml-10">
              <v-img
                :src="house.photos[0]"
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
                      <v-carousel-item
                        v-for="(photo, i) in house.photos"
                        :key="i"
                      >
                        <v-img
                          :src="photo"
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
                      房东电话: {{ house.ownerPhone }}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        color="red lighten-2"
                        dark
                        @click="goOrderConfirm(house)"
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

      <div class="text-center" style="z-index:1">
        <v-pagination
          v-model="page"
          :length="Math.ceil(this.$store.state.houseList.length / cnt)"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import OrderSearch from "@/components/OrderSearch.vue";
export default {
  components: {
    OrderSearch
  },
  data: () => ({
    page: 1,
    cnt: 6,
    dialog: [false, false, false, false, false, false],
    cycle: false,
    slides: ["First", "Second", "Third", "Fourth", "Fifth"]
  }),
  methods: {
    goOrderConfirm (value) {
      this.$store.commit('updatePickedHouse', value)
      this.$router.push({ name: "OrderConfirm" });
      this.dialog[index] = false;
    }
  },
  computed: {
    houseList: {
      get () {
        return this.$store.state.houseList;
      },
      set (value) {
        this.$store.commit("updateHouseList", value);
      }
    }
  }
};
</script>
