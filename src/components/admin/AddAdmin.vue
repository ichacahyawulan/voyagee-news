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
                    placeholder="Ketikkan nama Anda"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Email</label>
                <div class="col-sm-10">
                  <input
                    v-model="email"
                    class="form-control"
                    placeholder="Ketikkan e-mail Anda"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Username</label>
                <div class="col-sm-10">
                  <input
                    v-model="username"
                    class="form-control"
                    placeholder="Ketikkan username Anda"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="control-label col-sm-2">Password</label>
                <div class="col-sm-10">
                  <input
                    v-model="password"
                    class="form-control"
                    placeholder="Ketikkan password Anda"
                  />
                </div>
              </div>
            </div>
          </form>
          <button type="button" class="btn btn-success" @click="addAdmin">
            Add
          </button>
          <p class="mt-3">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import UserService from "../../services/UserDataService";
export default {
  data() {
    return {
      name: "",
      email: "",
      username: "",
      password: "",
      isAdmin: true,
      message: "",
    };
  },
  methods: {
    addAdmin: function () {
      let adminNew = new FormData();
      adminNew.append("name", this.name);
      adminNew.append("email", this.email);
      adminNew.append("username", this.username);
      adminNew.append("password", this.password);
      adminNew.append("isAdmin", this.isAdmin);

      UserService.create(adminNew)
        .then((response) => {
          console.log(response.data);
          this.message = "New admin was added successfully!";
        })
        .catch((e) => {
          console.log(e);
          console.log(this.name);
          console.log(this.email);
          console.log(this.username);
          console.log(this.password);
          console.log(this.isAdmin);
          this.message = "Add new admin failed";
        });
    },
  },
};
</script>
