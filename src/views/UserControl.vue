<template>
  <div
    style="filter:alpha(opacity=87.5); -moz-opacity:0.875; opacity: 0.875; padding-left: 15%; padding-right: 15%;"
    class="ma-3"
  >
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="搜索"
          style="font-weight:bold"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        sort-by="username"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>用户管理</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn small color="info" dark v-on="on" fab style="font-size:1.08em; margin-left:81%">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.username"
                          label="用户名"
                          style="font-size:1.1em"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.password"
                          label="密码"
                          style="font-size:1.1em"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.email" label="邮箱" style="font-size:1.1em"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.phone" label="手机" style="font-size:1.1em"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-btn @click="close" color="error" text style="font-size: 1.08em; width: 20%">取消</v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn @click="save" color="info" text style="font-size: 1.08em; width: 20%">保存</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="blue">edit</v-icon>
          <v-icon small @click="deleteItem(item)" color="error">delete</v-icon>
        </template>
        <template v-slot:no-data>
          <div>当前无注册用户</div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      { text: '用户名', align: 'left', value: 'username', sortable: false, },
      { text: '密码', align: 'center', value: 'password', sortable: false, },
      { text: '邮箱', align: 'center', value: 'email', sortable: false, },
      { text: '手机', align: 'center', value: 'phone', sortable: false, },
      { text: 'Actions', align: 'center', value: 'action', sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      username: '',
      password: '',
      email: '',
      phone: '',
    },
    defaultItem: {
      username: '',
      password: '',
      email: '',
      phone: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.users = [
        {
          username: 'Bcascask',
          password: '11csa223',
          email: 'hucom',
          phone: '15901092037',
        },
        {
          username: 'Bcnk',
          password: '1123',
          email: 'hu.com',
          phone: '15092037',
        },
        {
          username: 'Bcnk',
          password: '1123',
          email: 'hu&&&qq.com',
          phone: '15092037',
        },
      ]
      // get 
      this.$axios.get('/user/get').then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.users = responseResult
        }
        this.$store.commit("updateSnackbarContent", successResponse.data.message);
      }).catch(failResponse => { });
    },

    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.users.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        // delete
        let param = new URLSearchParams()
        param.append('username', item.username)
        this.$axios.post('/user/delete', param).then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            this.users.splice(index, 1)
          }
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }).catch(failResponse => { });
      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        // Object.assign(this.users[this.editedIndex], this.editedItem)
        // edit
        let param = new URLSearchParams()
        param.append('username', this.editedItem.username)
        param.append('password', this.editedItem.password)
        param.append('email', this.editedItem.email)
        param.append('phone', this.editedItem.phone)
        this.$axios.post('/user/edit', param).then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            Object.assign(this.users[this.editedIndex], this.editedItem)
          }
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }).catch(failResponse => { });
      } else {
        // this.users.push(this.editedItem)
        // post 增
        let param = new URLSearchParams()
        param.append('username', this.editedItem.username)
        param.append('password', this.editedItem.password)
        param.append('email', this.editedItem.email)
        param.append('phone', this.editedItem.phone)
        this.$axios.post('/user/add', param).then(successResponse => {
          var responseResult = JSON.parse(
            JSON.stringify(successResponse.data.data)
          );
          if (successResponse.data.code === 200) {
            this.users.push(this.editedItem)
          }
          this.$store.commit("updateSnackbarContent", successResponse.data.message);
        }).catch(failResponse => { });
      }
      this.close()
    },
  },
}
</script>