<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar color="#aac9c0" dark fixed app>
        <a href="/news">
          <img
            src="https://i.ibb.co/Rb6yXLg/Voyagee-removebg-preview.png"
            style="height: 70px; width: auto"
          />
        </a>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
          <v-btn
            v-for="item in menu"
            :key="item.id"
            :to="item.link"
            depressed
            color="#aac9c0"
            dark
          >
            {{ item.title }}
          </v-btn>
          <v-menu open-on-click bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed color="#aac9c0" dark v-bind="attrs" v-on="on">
                Destinasi<v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in locCategory"
                :key="item.id"
                :to="'/newsList/' + item.name"
              >
                <v-list-item-title v-if="(item.isLocation = true)">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
            <v-btn depressed color="#aac9c0" dark v-if="auth" @click="profilMenu"> Profil </v-btn>
            <v-btn depressed color="#aac9c0" dark v-if="auth" @click="logout"> Logout </v-btn>
            <v-btn :to="'/login'" depressed color="#aac9c0" dark v-else> Login </v-btn>
        </v-toolbar-items>
        <v-menu v-if="$vuetify.breakpoint.smAndDown">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list width="200px">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-for="item in menu" :key="item.id">
                  <v-btn text block :href="item.link">{{ item.title }}</v-btn>
                </v-list-item-title>
                <v-menu open-on-click left offset-x>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-title v-bind="attrs" v-on="on">
                      <v-btn text block>Destinasi</v-btn>
                    </v-list-item-title>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="item in category"
                      :key="item.id"
                      :to="'/newsList/' + item.name"
                    >
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-list-item-title>
                  <v-btn text block v-if="auth" @click="profilMenu"> Profil </v-btn>
                  <v-btn text block v-if="auth" @click="logout"> Logout </v-btn>
                  <v-btn text block v-else :href="'/login'">Login</v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <div class="container mt-3">
        <router-view />
      </div>

      <v-footer dark padless>
      <v-card class="flex py-2 white--text text-center xs12" color="#aac9c0" flat tile>
        <strong>Made by Kelompok 4 - Webdev &copy; 2020</strong>
      </v-card>
    </v-footer>
    </v-app>
  </div>
</template>

<script>
import CategoryService from "../../services/CategoryDataService";

export default {
  data() {
    return {
      menu: [
        { id: "1", title: "Terbaru", link: "/newsList/Terbaru" },
        { id: "2", title: "Terpopuler", link: "/newsList/Terpopuler" },
        { id: "3", title: "Kuliner", link: "/newsList/Kuliner" },
        { id: "4", title: "Tips", link: "/newsList/Tips" },
      ],
      category: [],
      auth: false,
    };
  },

  methods: {
    menuItems() {
      return this.menu;
    },
    retrieveCategory() {
      CategoryService.getAll()
        .then((response) => {
          this.category = response.data.map(this.mapNewsCategory);
        })
        .catch(() => {});
    },
    mapNewsCategory(category) {
      return {
        name: category.name,
        isLocation: category.isLocation,
        id: category.id,
      };
    },
    logout(){
      localStorage.removeItem('user');
      this.$router.push("/");
      location.reload();
    },
    profilMenu(){
      this.$router.push("/users");
    },
  },
  computed: {
    locCategory: function () {
      return this.category.filter((i) => i.isLocation == true);
    },
  },
  mounted() {
    this.retrieveCategory();
    let temp = JSON.parse(localStorage.getItem('user'));
    if (temp.token){
      this.auth = true;
    }
    else{
      this.auth = false;
    }
    if(temp.dataUser.isAdmin){
      this.$router.push("/admin");
    }
  },
};
</script>
