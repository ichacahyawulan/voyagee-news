<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle"> Search </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>News</v-card-title>

        <v-data-table
          :headers="headers"
          :items="theNews"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editNews(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-2" @click="deleteNews(item.id)"
              >mdi-delete</v-icon
            >
            <v-icon small class="mr-2" @click="publishNews(item.id)"
              >mdi-upload</v-icon
            >
            <v-icon small class="mr-2" @click="unpublishNews(item.id)"
              >mdi-download</v-icon
            >
          </template>
        </v-data-table>

        <!-- <v-card-actions v-if="theNews.length > 0">
          <v-btn small color="error" @click="removeAllNews"> Remove All </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import NewsDataService from "../../services/NewsDataService";
export default {
  name: "theNews-list",
  data() {
    return {
      theNews: [],
      title: "",
      headers: [
        { text: "Id", align: "start", sortable: false, value: "id" },
        { text: "Title", sortable: false, value: "title" },
        { text: "Author", value: "author", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveNews() {
      NewsDataService.getAll()
        .then((response) => {
          this.theNews = response.data.map(this.getDisplayNews);
        })
        .catch(() => {});
    },

    refreshList() {
      this.retrieveNews();
    },

    removeAllNews: function () {
      NewsDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch(() => {});
    },

    searchTitle() {
      NewsDataService.findByTitle(this.title)
        .then((response) => {
          this.theNews = response.data.map(this.getDisplayNews);
        })
        .catch(() => {});
    },

    editNews(id) {
      this.$router.push({ name: "news-details", params: { id: id } });
    },

    publishNews(id) {
      const news = {
        publish: true,
      };
      NewsDataService.publishNews(id, news)
        .then(() => {
          this.refreshList();
        })
        .catch(() => {});
    },

    unpublishNews(id) {
      const news = {
        publish: false,
      };
      NewsDataService.publishNews(id, news)
        .then(() => {
          this.refreshList();
        })
        .catch(() => {});
    },

    deleteNews(id) {
      NewsDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(() => {});
    },

    getDisplayNews(news) {
      return {
        id: news.id,
        title:
          news.title.length > 30
            ? news.title.substr(0, 30) + "..."
            : news.title,
        author:
          news.author.length > 30
            ? news.author.substr(0, 30) + "..."
            : news.author,
        status: news.publish ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveNews();
  },
};
</script>

<style scoped>
.list {
  max-width: 750px;
}
</style>
