<template>
  <div id="app">
    <v-app id="inspire">
      <body>
        <div class="container">
          <v-card class="event-card">
            <div class="card-title">
              <h2>EDIT PROFIL</h2>
              <v-avatar color="indigo" size="100">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>
            </div>
            <v-list align="center">
              <div class="col-4">
                <div class="input-group">
                  <label class="label">username</label>
                  <input v-model="message" placeholder="Username" />
                </div>
              </div>
            </v-list>
            <v-list align="center">
              <div class="col-4">
                <div class="input-group">
                  <label class="label">Email</label>
                  <input v-model="message" placeholder="Email" />
                </div>
              </div>
            </v-list>
            <v-list align="center">
              <v-btn depressed color="primary"> Save Changes </v-btn>
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
  font-size: 0.5in;
}
.h1 {
  font-size: 5%;
}
</style>