<template>
  <div id="app">
    <v-app id="inspire">
      <body>
        <div class="container">
          <v-card class="event-card">
            <v-list align="center">
              <v-avatar color="indigo" size="100">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>
            </v-list>
            <v-list align="center">
              <div class="container">
                <h1>DwinandaAS</h1>
                <h2>dwinandaas@gmail.com</h2>
              </div>
            </v-list>
            <v-list align="center">
              <a @click="onEditProfileClick">
                <v-btn depressed color="primary"> Edit Profil </v-btn>
              </a>
            </v-list>
            <v-list align="center">
              <v-divider class="mx-4"></v-divider>
              <div class="title">
                <h1>Artikel yang disimpan {{ this.$route.params.id }}</h1>
              </div>
            </v-list>
          </v-card>
        </div>
      </body>
    </v-app>
  </div>
</template>

<script>
import NewsDataService from "../../services/NewsDataService";
export default {
  name: "user",
  data() {
    return {
      currentNews: null,
      share: false,
    };
  },
  methods: {
    getNews(id) {
      NewsDataService.get(id)
        .then((response) => {
          this.currentNews = response.data;
          this.currentNews.views += 1;
          NewsDataService.updateViews(id, this.currentNews)
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onEditProfileClick() {
      if (this.$route.path !== "/editProfil") this.$router.push("/editProfil");
    },
  },
  mounted() {
    this.getNews(this.$route.params.id);
  },
};
</script>

<style scoped>
.text-center {
  margin: 2em auto 4em;
}
.container {
  margin: 2em auto 4em;
}
.event-card {
  overflow: hidden;
  width: 50%;
  margin: 60px auto auto;
  border-radius: 0.3em;
}
.event-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  padding: 50px 30px;
}
.content h1 {
  font-size: 2em;
}
</style>