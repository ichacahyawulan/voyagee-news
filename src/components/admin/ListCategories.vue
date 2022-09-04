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
        <v-card-title>List Category</v-card-title>

        <v-data-table
          :headers="headers"
          :items="category"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <!-- <v-icon small class="mr-2" @click="editCategory(item.id)"
              >mdi-pencil</v-icon
            > -->
            <v-icon small @click="deleteCategory(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <!-- <v-card-actions v-if="category.length > 0">
        <v-btn small color="error" @click="removeAllCategory">
          Remove All
        </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CategoryService from "../../services/CategoryDataService";
export default {
  name: "category-list",
  data() {
    return {
      category: [],
      title: "",
      headers: [
        { text: "Id", align: "start", sortable: false, value: "id" },
        { text: "Kategori", sortable: false, value: "name" },
        { text: "Jenis", value: "isLocation", sortable: false },
        { text: "Delete", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveCategory() {
      CategoryService.getAll()
        .then((response) => {
          this.category = response.data.map(this.getDisplayCategory);
        })
        .catch(() => {});
    },

    refreshList() {
      this.retrieveCategory();
    },

    searchTitle() {
      CategoryService.findByTitle(this.title)
        .then((response) => {
          this.category = response.data.map(this.getDisplayCategory);
        })
        .catch(() => {});
    },

    // editCategory(id) {
    //   this.$router.push({ name: "Category-details", params: { id: id } });
    // },

    deleteCategory(id) {
      CategoryService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(() => {});
    },

    getDisplayCategory(category) {
      return {
        id: category.id,
        name: category.name,
        isLocation: category.isLocation ? "Destinasi" : "Lainnya",
      };
    },
  },
  mounted() {
    this.retrieveCategory();
  },
};
</script>

<style scoped>
.list {
  max-width: 750px;
}
</style>
