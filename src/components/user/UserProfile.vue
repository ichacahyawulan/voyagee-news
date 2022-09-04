<template>
  <div id="app">
    <v-app id="inspire">
      <body>
        <div class="container">
          <v-card class="event-card">
                <v-list align="center">
                <div class="container">
                    <h1>{{ userData.name }}</h1>
                    <h3>{{ userData.email }}</h3>
                </div>
                </v-list>
                <v-list align="center">
                    <v-divider class="mx-4"></v-divider>
                        <div class="title">
                        <h1>Artikel yang disimpan</h1>
                        </div>
                        <v-container grid-list-md>
                          <v-layout row wrap>
                            <v-flex style="width: 1000px">
                              <li
                                :class="{ active: index == currentIndex }"
                                v-for="(thisNews, index) in news"
                                :key="index"
                              >
                                <!-- <v-card class="mx-auto flexcard" height="100%" max-width="300">
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
                                    <v-divider class="mx-3"></v-divider>
                                    <v-card-actions>
                                      <v-col>
                                        <v-icon medium>mdi-eye-outline</v-icon>
                                        <v-text> {{ thisNews.views }} views</v-text>
                                      </v-col>
                                      <v-col class="text-right">
                                        <v-icon medium>mdi-heart-outline</v-icon>
                                      </v-col>
                                    </v-card-actions>
                                  </div>
                                </v-card> -->
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
                </v-list>
          </v-card>
        </div>
      </body>
    </v-app>
  </div>
</template>

<script>
import { BASE_URL } from '../../constURL';
import UserService from "../../services/UserDataService";

export default {
  name: "users",
  data() {
    return {
      userData: "",
      userId:"",
      news: [],
      currentNews: null,
      currentIndex: -1,
      base_url: BASE_URL,
    };
  },
  methods: {
    getProfilUser(id) {
      UserService.getProfilUser(id)
        .then((response) => {
          this.userData = response.data;
          this.news = response.data.NewsSaved;
        })
        .catch((e)=> {
          console.log(e);
        })
    },
    setActiveNews(thisNews, index) {
      this.currentNews = thisNews;
      this.currentIndex = index;
    },
  },
  mounted() {
    let temp = JSON.parse(localStorage.getItem('user'));
      this.userId = temp.dataUser.userId;
      this.getProfilUser(this.userId);
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
.flexcard {
  display: flex;
  flex-direction: column;
}
.content {
  padding: 50px 30px;
}
.content h1 {
  font-size: 2em;
}

.container li {
  list-style: none;
  margin: 2em 0;
}

.event-card {
  overflow: hidden;
  width: 75%;
  margin: auto;
  border-radius: 0.3em;
}

.event-card img {
  width: 300px;
  height: auto;
  object-fit: cover;
}

.event-card .judul {
  font-size: 1.5em;
  font-weight: 400;
  padding-top: 0.5em;
  padding-left: 0.5em;
}
.event-card .author {
  font-size: 1em;
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

</style>

