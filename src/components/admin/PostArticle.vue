<template>
  <div id="app">
    <div class="container">
      <h2 align="center">Post Artikel</h2>
      <div class="row">
        <div class="col-sm">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Penulis</label>
                <div class="col-sm-10">
                  <input
                    v-model="author"
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
                    v-model="title"
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
                    v-model="idCategoryNews"
                    :items="category"
                    placeholder="Pilih Kategori"
                    required
                  ></v-select> -->
                  <v-select
                    v-model="idCategoryNews"
                    :items="category"
                    attach
                    chips
                    placeholder="Pilih Kategori"
                    multiple
                  ></v-select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Gambar Thumbnail</label>
                <div class="col-sm-10">
                  <v-file-input
                    v-model="pictLink"
                    placeholder="Pilih Gambar"
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/jpg"
                  >
                  </v-file-input>
                </div>
              </div>
            </div>
          </form>
          <vue-editor v-model="content"></vue-editor>
          <button type="button" class="btn btn-success" @click="addNews">
            Post
          </button>
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

  data() {
    return {
      author: "",
      title: "",
      content: "",
      idCategoryNews: [],
      category: [],
      pictLink: "",
      message: "",
    };
  },
  methods: {
    retrieveCategory() {
      CategoryService.getAll()
        .then((response) => {
          this.category = response.data.map(this.mapNewsCategory);
        })
        .catch(() => {});
    },
    addNews: function () {
      let news = new FormData();
      news.append("author", this.author);
      news.append("title", this.title);
      news.append("content", this.content);
      news.append("publish", false);
      for (const i in this.idCategoryNews) {
        news.append("categoryId[]", this.idCategoryNews[i]);
      }
      news.append("pictLink", this.pictLink);

      // const news = {
      //   author: this.author,
      //   title: this.title,
      //   content: this.content,
      //   publish: false,
      //   categoryId: this.idCategoryNews,
      //   pictLink: this.pictLink
      // }
      NewsDataService.create(news)
        .then(() => {
          this.message = "The news was created successfully!";
        })
        .catch(() => {});
    },
    mapNewsCategory(category) {
      return {
        text: category.name,
        value: category.id,
      };
    },
  },
  mounted() {
    this.retrieveCategory();
  },
};
</script>
