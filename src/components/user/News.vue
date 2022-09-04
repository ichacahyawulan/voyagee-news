<template>
  <div id="app">
    <v-app id="inspire">
      <body>
        <div class="container">
          <v-card class="event-card">
            <div class="content">
              <h1>{{ currentNews.title }}</h1>
              <h5>Author: {{ currentNews.author }}</h5>
              <h6>Date: {{ date }}</h6>
              <v-list align="right">
                <v-icon medium>mdi-eye-outline</v-icon>
                <v-text> {{ currentNews.views }} views </v-text>
                <v-btn icon @click="share = true">
                  <v-icon>mdi-share</v-icon>
                </v-btn>
                <share-dialog v-model="share"></share-dialog>
                <v-btn v-if="checkSave === false" icon>
                  <v-icon @click="saveNews()">mdi-bookmark-outline</v-icon>
                </v-btn>
                <v-btn v-else-if="checkSave === true" icon>
                  <v-icon @click="removeSavedNews()">mdi-bookmark</v-icon>
                </v-btn>
                <!-- <v-btn icon>
                  <v-icon @click="likeNews()">mdi-heart-outline</v-icon>
                  <v-text> {{ like }}</v-text>
                </v-btn> -->
              </v-list>
              <img :src="base_url + currentNews.pictLink" />
              <br /><br /><br />
              <div class="ql-editor">
                <p v-html="currentNews.content"></p>
              </div>
            </div>
          </v-card>
        </div>
      </body>
    </v-app>
  </div>
</template>

<script>
import NewsDataService from "../../services/NewsDataService";
import UserDataService from "../../services/UserDataService";
const ShareDialog = () => import("./ShareDialog.vue");
import { BASE_URL } from "../../constURL";

export default {
  components: {
    ShareDialog,
  },
  name: "news",
  data() {
    return {
      currentNews: null,
      currentUser: null,
      newsSaved:[],
      checkSave: false,
      like: null,
      share: false,
      base_url: BASE_URL,
    };
  },
  computed: {
    date() {
      // Format : DayName, DD/MM/YYYY HH:MM
      const fullDate = new Date(this.currentNews.createdAt);
      const day = fullDate.toString().split(" ")[0];
      const date = fullDate.toLocaleDateString();
      const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return `${day} ${date} ${time}`;
    },
  },
  methods: {
    getNews(id) {
      NewsDataService.get(id)
        .then((response) => {
          this.currentNews = response.data;
          this.like = this.currentNews.NewsLiked.length;
          this.currentNews.views += 1;
          NewsDataService.updateViews(id, this.currentNews)
            .then(() => {})
            .catch(() => {});
        })
        .catch(() => {});
    },
    saveNews(){
      if(this.currentUser){
        const save = {
        newsId: this.$route.params.id,
        userId: this.currentUser.userId,
        }
        // console.log(save);
        UserDataService.saveNews(save)
          .then(() => {
            // console.log(response.data);
            location.reload();
          })
          .catch((e) => {
            console.log(e);
          })
      }
      else{
        this.$router.push("/login");
      }
    },
    likeNews(){
      if(this.currentUser){
        const like = {
        newsId: this.$route.params.id,
        userId: this.currentUser.userId,
        }
        UserDataService.likeNews(like)
          .then(() => {
            // console.log(response.data);
            location.reload();
          })
          .catch((e) => {
            console.log(e);
          })
      }
      else{
        this.$router.push("/login");
      }
    },
    checkSaveNews(){
      if(this.currentUser){
        UserDataService.getProfilUser(this.currentUser.userId)
          .then((response) => {
            this.newsSaved = response.data.NewsSaved;
            this.newsSaved.forEach(news => {
              if (news.id == this.$route.params.id) {
                this.checkSave = true;
              }
            });
          })
          .catch((e)=> {
            console.log(e);
          })
      }
    },
    removeSavedNews(){
      if(this.currentUser){
        const unsave = {
          newsId: this.$route.params.id,
          userId: this.currentUser.userId,
        }
        // console.log(unsave);
        UserDataService.removeSavedNews(unsave)
          .then(() => {
            // console.log(response.data);
            location.reload();
          })
          .catch((e) => {
            console.log(e);
          })
      }
      else{
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.getNews(this.$route.params.id);
    let temp = JSON.parse(localStorage.getItem('user'));
    this.currentUser = temp.dataUser;
    this.checkSaveNews();
  },
};
</script>

<style scoped>
.container {
  margin: 2em auto 4em;
}
.event-card {
  overflow: hidden;
  width: 85%;
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
