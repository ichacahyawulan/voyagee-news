<template>
  <div id="app">
    <div class="container">
      <h2 align="center">Add Kategori</h2>
      <div class="row">
        <div class="col-sm">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Nama</label>
                <div class="col-sm-10">
                  <input
                    v-model="name"
                    class="form-control"
                    placeholder="Ketikkan nama kategori"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Destination?</label>
                <div class="col-sm-10">
                  <v-radio-group v-model="ex7" column>
                    <v-radio label="Yes" color="green" value="true"></v-radio>
                    <v-radio label="No" color="red" value="false"></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Gambar Kategori</label>
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
          <button type="button" class="btn btn-success" @click="addCategory">
            Add
          </button>
          <p class="mt-3">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import NewsDataService from "../../services/NewsDataService";
import CategoryService from "../../services/CategoryDataService";
export default {
  data() {
    return {
      name: "",
      isLocation: false,
      pictLink: "",
      message: "",
    };
  },
  methods: {
    addCategory: function () {
      let categoryNew = new FormData();
      categoryNew.append("name", this.name);
      categoryNew.append("isLocation", this.isLocation);
      categoryNew.append("pictLink", this.pictLink);

      CategoryService.create(categoryNew)
        .then(() => {
          this.message = "The category was created successfully!";
        })
        .catch(() => {
          this.message = "Failed to create category";
        });
    },
  },
};
</script>
