<template>
  <div id="app">
    <div v-if="currentNews" class="container">
      <h2 align="center">Edit Artikel</h2>
      <div class="row">
        <div class="col-sm">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Penulis</label>
                <div class="col-sm-10">
                  <input
                    v-model="currentNews.author"
                    class="form-control"
                    placeholder="Ketikkan penulis artikel"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Judul</label>
                <div class="col-sm-10">
                  <input
                    v-model="currentNews.title"
                    class="form-control"
                    placeholder="Ketikkan judul artikel"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Kategori</label>
                <div class="col-sm-10">
                  <!-- <v-select
                    v-model="categoryCurrent"
                    :items="category"
                    placeholder="Pilih Kategori"
                    outlined
                  ></v-select> -->
                  <v-select
                    v-model="categoryCurrent"
                    :items="category"
                    attach
                    chips
                    placeholder="Pilih Kategori"
                    multiple
                  ></v-select>
                </div>
              </div>
            </div>
          </form>
          <vue-editor v-model="currentNews.content"></vue-editor>
          <v-btn
            v-if="currentNews.publish"
            @click="updatePublished(false)"
            color="primary"
            small
            class="mr-2"
          >
            UnPublish
          </v-btn>

          <v-btn
            v-else
            @click="updatePublished(true)"
            color="primary"
            small
            class="mr-2"
          >
            Publish
          </v-btn>

          <v-btn color="error" small class="mr-2" @click="deleteNews">
            Delete
          </v-btn>

          <v-btn color="success" small @click="updateNews"> Update </v-btn>
          <p class="mt-3">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { VueEditor } from "vue2-editor";
import NewsDataService from "../../services/NewsDataService";
import CategoryService from "../../services/CategoryDataService";
export default {
  components: {
    VueEditor,
  },
  name: "edit-news",
  data() {
    return {
      currentNews: null,
      categoryCurrent: [],
      category: [],
      message: "",
    };
  },
  methods: {
    getNews(id) {
      NewsDataService.get(id)
        .then((response) => {
          this.currentNews = response.data;
          this.categoryCurrent = this.currentNews.categories.map(
            this.mapCurrenCategory
          );
        })
        .catch(() => {});
    },

    retrieveCategory() {
      CategoryService.getAll()
        .then((response) => {
          this.category = response.data.map(this.mapNewsCategory);
        })
        .catch(() => {});
    },

    updatePublished(status) {
      var data = {
        id: this.currentNews.id,
        title: this.currentNews.title,
        author: this.currentNews.author,
        content: this.currentNews.content,
        publish: status,
        // categoryId: this.currentNews.idCategoryNews,
      };

      NewsDataService.update(this.currentNews.id, data)
        .then(() => {
          this.currentNews.publish = status;
          this.message = this.currentNews.publish
            ? "The news has been published successfully!"
            : "The news has been unpublished!";
        })
        .catch(() => {});
    },

    updateNews() {
      // const categoryNews = [];
      // for (const i in this.categoryCurrent){
      //   CategoryService.get(this.categoryCurrent[i])
      //     .then ((response) => {
      //       categoryNews.push(response.data);
      //     })
      //     .catch((err) => {
      //       console.log(err.message);
      //     })
      // }

      NewsDataService.update(this.currentNews.id, this.currentNews)
        .then(() => {
          this.message = "The news was updated successfully!";
        })
        .catch(() => {});
    },

    deleteNews() {
      NewsDataService.delete(this.currentNews.id)
        .then(() => {
          this.$router.push("/admin/listArticle");
        })
        .catch(() => {});
    },

    mapNewsCategory(category) {
      return {
        text: category.name,
        value: category.id,
      };
    },
    mapCurrenCategory(category) {
      return {
        value: category.id,
      };
    },
  },
  mounted() {
    this.message = "";
    this.getNews(this.$route.params.id);
    this.retrieveCategory();
  },
};
</script>
