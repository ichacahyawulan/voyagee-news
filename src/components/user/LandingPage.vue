<template>
  <div id="app">
    <v-app id="inspire">
      <div class="container" style="margin-top: 20px">
        <div class="carousel">
          <v-carousel cycle hide-delimiters>
            <v-carousel-item
              :class="{ active: index == currentIndex }"
              v-for="(thisNews, index) in news.slice(0, 5)"
              :key="index"
              :src="base_url + thisNews.pictLink"
              reverse-transition="scroll-x-reverse-transition"
              transition="slide-x-transition"
            >
              <v-row class="fill-height mt-0">
                <v-layout align-end>
                  <v-flex>
                    <v-card color="black" class="pa-3 rounded-0" style="opacity: 0.8">
                      <span
                        class="headline white--text"
                        v-text="thisNews.title"
                        style="margin-left: 15px"
                      >
                      </span>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </div>

        <div class="content">
          <div class="text-center">
            <h1 style="margin-bottom: 20px; margin-top: 30px">
              Destinasi Pilihan
            </h1>
          </div>
        </div>
        <v-layout row>
          <v-flex>
            <v-sheet class="mx-auto py-2" max-width="1000">
              <v-slide-group
                v-model="model"
                class="d-flex align-center ma-4"
                center-active
                show-arrows
              >
                <v-slide-item
                  v-for="item in locCategory"
                  :key="item"
                  class="d-flex align-self-center pa-2"
                >
                  <v-col>
                    <v-card
                      max-width="200px"
                      @click="onClick(item.name)"
                    >
                      <v-img
                        :src="base_url + item.pictLink"
                        height="200px"
                      ></v-img>
                      <v-card-title class="d-flex justify-center pa-2">{{ item.name }}</v-card-title>
                    </v-card>
                  </v-col>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-flex>
        </v-layout>
        <div class="content text-center">
          <h1 style="margin-bottom: 20px; margin-top: 30px">Artikel Baru</h1>
        </div>
        <v-layout row>
          <v-flex>
            <li
              :class="{ active: index == currentIndex }"
              v-for="(thisNews, index) in news.slice(0, 3)"
              :key="index"
              style="list-style-type:none;"
            >
              <v-card class="mx-auto mb-4 flexcard" height="100%" max-width="600">
                <v-img
                  :src="base_url + thisNews.pictLink"
                  height="200px"
                  max-height="200px"
                ></v-img>
                <a
                  class="judul grow"
                  @click="setActiveNews(thisNews, index)"
                  :href="'/news/id/' + thisNews.id"
                >
                  {{ thisNews.title }}
                </a>
                <div class="event-card" style="border-bottom: 0.3em">
                  <v-divider class="ma-0"></v-divider>
                  <v-card-actions>
                    <v-col>
                      <v-icon medium>mdi-eye-outline</v-icon>
                      <v-text> {{ thisNews.views }} views</v-text>
                    </v-col>
                    <!-- <v-col class="text-right">
                      <v-icon medium>mdi-heart-outline</v-icon>
                    </v-col> -->
                  </v-card-actions>
                </div>
              </v-card>
            </li>
          </v-flex>
        </v-layout>
        <div class="button">
          <div class="text-center">
            <v-btn
              rounded
              color="primary"
              dark
              style="margin-bottom: 20px; margin-top: 50px"
              :href="'/newsList/Terbaru'"
            >
              Artikel Lainnya
            </v-btn>
          </div>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import NewsDataService from "../../services/NewsDataService";
import CategoryService from "../../services/CategoryDataService";
import { BASE_URL } from "../../constURL";

export default {
  name: "news-list",
  data() {
    return {
      news: [],
      category: [],
      currentNews: null,
      currentIndex: -1,
      title: "",
      base_url: BASE_URL,
    };
  },
  methods: {
    retrieveNews() {
      NewsDataService.getAll()
        .then((response) => {
          this.news = response.data;
        })
        .catch(() => {});
    },

    setActiveNews(thisNews, index) {
      this.currentNews = thisNews;
      this.currentIndex = index;
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
        pictLink: category.pictLink,
        id: category.id,
      };
    },
    onClick(category) {
      this.$router.push({ path: "/newsList/" + category });
    },
  },
  computed: {
    locCategory: function () {
      return this.category.filter((i) => i.isLocation == true);
    },
  },
  mounted() {
    this.retrieveNews();
    this.retrieveCategory();
  },
};
</script>

<style>
.carousel {
  margin: auto;
  margin-top: 10px;
}
.judul {
  font-size: 1.2em;
  font-weight: 400;
  padding: 0.6em;
}
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
