<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>List User</v-card-title>

        <v-data-table
          :headers="headers"
          :items="users"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserService from "../../services/UserDataService";
export default {
  name: "users-list",
  data() {
    return {
      users: [],
      title: "",
      headers: [
        { text: "Id", align: "start", sortable: false, value: "id" },
        { text: "Name", sortable: false, value: "name" },
        { text: "Email", value: "email", sortable: false },
        { text: "Username", value: "username", sortable: false },
        { text: "Admin", value: "isAdmin", sortable: false },
        { text: "Delete", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveUser() {
      UserService.getAll()
        .then((response) => {
          this.users = response.data;
        })
        .catch(() => {});
    },

    refreshList() {
      this.retrieveUser();
    },

    deleteUser(id) {
      UserService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(() => {});
    },

    getDisplayUser(users) {
      return {
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.namusernamee,
        isAdmin: users.isAdmin ? "Admin" : "User",
      };
    },
  },
  mounted() {
    this.retrieveUser();
  },
};
</script>

<style scoped>
.list {
  max-width: 750px;
}
</style>
