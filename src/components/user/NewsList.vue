<template>
  <div id="app">
    <v-app id="inspire">
      <div class="container">
        <div class="search col-md-12">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search by title"
              v-model="title"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="searchTitle"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div class="title">
          <h1>Artikel {{ this.$route.params.category }}</h1>
        </div>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex style="width: 1000px">
              <li
                :class="{ active: index == currentIndex }"
                v-for="(thisNews, index) in news"
                :key="index"
              >
                <v-card class="event-card">
                  <v-layout row>
                    <img :src="base_url + thisNews.pictLink" />
                    <v-flex style="width: 100px">
                      <div>
                        <router-link :to="'/news/id/' + thisNews.id">
                          <v-card-text
                            class="title"
                            @click="setActiveNews(thisNews, index)"
                          >
                            {{ thisNews.title }}
                          </v-card-text>
                        </router-link>
                        <h3 class="author">{{ thisNews.author }}</h3>
                      </div>
                      <v-divider class="mx-4"></v-divider>
                      <v-card-actions>
                        <v-col>
                          <v-icon medium>mdi-eye-outline</v-icon>
                          <v-text> {{ thisNews.views }} views </v-text>
                        </v-col>
                        <!-- <v-col class="text-right">
                          <v-icon medium>mdi-heart-outline</v-icon>
                        </v-col> -->
                      </v-card-actions>
                    </v-flex>
                  </v-layout>
                </v-card>
              </li>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-app>
  </div>
</template>

<script>
import NewsDataService from "../../services/NewsDataService";
import { BASE_URL } from "../../constURL";

export default {
  name: "news-list",
  data() {
    return {
      news: [],
      currentNews: null,
      currentIndex: -1,
      title: "",
      category: "",
      base_url: BASE_URL,
    };
  },
  methods: {
    retrieveNews(category) {
      if (category == "Terbaru") {
        NewsDataService.findNewest()
          .then((response) => {
            this.news = response.data;
          })
          .catch(() => {});
      } else if (category == "Terpopuler") {
        NewsDataService.findPopular()
          .then((response) => {
            this.news = response.data;
          })
          .catch(() => {});
      } else {
        NewsDataService.findByCategory(category)
          .then((response) => {
            this.news = response.data;
          })
          .catch(() => {});
      }
    },

    setActiveNews(thisNews, index) {
      this.currentNews = thisNews;
      this.currentIndex = index;
    },

    searchTitle() {
      if (this.title != "") {
        NewsDataService.findByTitle(this.title)
          .then((response) => {
            this.news = response.data;
          })
          .catch(() => {});
      } else {
        NewsDataService.getAll()
          .then((response) => {
            this.news = response.data;
          })
          .catch(() => {});
      }
    },
  },
  mounted() {
    this.retrieveNews(this.$route.params.category);
  },
  watch: {
    $route: function () {
      this.retrieveNews(this.$route.params.category);
    },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 2em;
}

.container li {
  list-style: none;
  margin: 2em 0;
}

.event-card {
  overflow: hidden;
  width: 65%;
  margin: auto;
  border-radius: 0.3em;
}

.event-card img {
  width: 300px;
  height: auto;
  object-fit: cover;
}

.event-card .judul {
  font-size: 2em;
  font-weight: 400;
  padding-top: 0.5em;
  padding-left: 0.5em;
}
.event-card .author {
  font-size: 1.2em;
  font-weight: 400;
  padding-left: 1em;
  padding-bottom: 1em;
}
.title h1 {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 10px;
}
.btn {
  height: 38px;
  text-align: center;
}

.search {
  margin: 50px auto auto;
  width: 65%;
}
</style>
