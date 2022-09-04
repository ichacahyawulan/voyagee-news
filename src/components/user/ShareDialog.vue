<template>
  <v-dialog v-model="isShared" max-width="500">
    <v-card>
      <v-toolbar dark color="#aac9c0" height="50">
        <v-toolbar-title>Share</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="isShared = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="button" align="center" style="padding: 10px;">
        <v-list max-width="250">
          <v-list-item>
            <v-list-item-content style="overflow: visible;">
              <twitter-button
                :description="'Baca di Voyagee! ' + currentNews.title"
                style="margin: 0px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content style="overflow: visible;">
              <facebook-button
                :description="'Baca di Voyagee! ' + currentNews.title"
                style="margin: 0px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content style="overflow: visible;">
              <whats-app-button
                :description="'Baca di Voyagee! ' + currentNews.title"
                style="margin: 0px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content style="overflow: visible;">
              <telegram-button
                :description="'Baca di Voyagee! ' + currentNews.title"
                style="margin: 0px"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import NewsDataService from "../../services/NewsDataService";
import TwitterButton from "vue-share-buttons/src/components/TwitterButton";
import FacebookButton from "vue-share-buttons/src/components/FacebookButton";
import WhatsAppButton from "vue-share-buttons/src/components/WhatsAppButton";
import TelegramButton from "vue-share-buttons/src/components/TelegramButton";

export default {
  name: "share",
  components: {
    TwitterButton,
    FacebookButton,
    WhatsAppButton,
    TelegramButton,
  },
  props: {
    value: Boolean,
  },
  computed: {
    isShared: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {
      currentNews: null,
    };
  },
  methods: {
    getNews(id) {
      NewsDataService.get(id)
        .then((response) => {
          this.currentNews = response.data;
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getNews(this.$route.params.id);
  },
};
</script>