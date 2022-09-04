<template>
  <v-app>
    <div class="wrapper">
      <div class="sidebar">
        <div class="logo">
          <img
            src=" https://i.ibb.co/Rb6yXLg/Voyagee-removebg-preview.png"
            width="150"
            height="75"
          />
        </div>
        <ul>
          <li @click="onDashboardClick">
            <v-icon medium>mdi-chart-line</v-icon>
            <v-text> Dashboard</v-text>
          </li>
          <li @click="onAddCategoriesClick">
            <v-icon medium>mdi-view-grid-plus</v-icon>
            <v-text> Tambah Kategori</v-text>
          </li>
          <li @click="onPostArticleClick">
            <v-icon medium>mdi-pencil-plus</v-icon>
            <v-text> Unggah Artikel</v-text>
          </li>
          <li @click="onListArticleClick">
            <v-icon medium>mdi-newspaper-variant-multiple-outline</v-icon>
            <v-text> Daftar Artikel</v-text>
          </li>
          <li @click="onListCategoriesClick">
            <v-icon medium>mdi-view-list</v-icon>
            <v-text> Daftar Kategori</v-text>
          </li>
          <li @click="onListUserClick">
            <v-icon medium>mdi-account-multiple</v-icon>
            <v-text> Daftar User</v-text>
          </li>
          <li @click="onAddAdminClick">
            <v-icon medium>mdi-account-plus</v-icon>
            <v-text> Tambah Admin</v-text>
          </li>
          <li @click="onLogOutClick">
            <v-icon medium>mdi-logout-variant</v-icon>
            <v-text> Logout</v-text>
          </li>
        </ul>
      </div>
      <div class="main_content">
        <div class="header">
          CMS
          <div class="admin">
            <v-col>
              <v-icon large>mdi-account-circle</v-icon>
              <v-text> admin</v-text>
            </v-col>
          </div>
        </div>
        <!-- taruh template vue lain di sini -->
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
  },
  methods: {
    onDashboardClick() {
      if (this.$route.path !== "/admin/dashboard")
        this.$router.push("/admin/dashboard");
    },
    onAddCategoriesClick() {
      if (this.$route.path !== "/admin/addCategories")
        this.$router.push("/admin/addCategories");
    },
    onPostArticleClick() {
      if (this.$route.path !== "/admin/postArticle")
        this.$router.push("/admin/postArticle");
    },
    onListArticleClick() {
      if (this.$route.path !== "/admin/listArticle")
        this.$router.push("/admin/listArticle");
    },
    onListCategoriesClick() {
      if (this.$route.path !== "/admin/listCategories")
        this.$router.push("/admin/listCategories");
    },
    onListUserClick() {
      if (this.$route.path !== "/admin/listUser")
        this.$router.push("/admin/listUser");
    },
    onAddAdminClick() {
      if (this.$route.path !== "/admin/addAdmin")
        this.$router.push("/admin/addAdmin");
    },
    onLogOutClick() {
      localStorage.removeItem('user');
      this.$router.push("/login");
      location.reload()
    },
  },
  mounted() {
    let temp = JSON.parse(localStorage.getItem('user'));
    if(!temp.dataUser.isAdmin){
      this.$router.push("/");
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: "Josefin Sans", sans-serif;
}

body {
  background-color: #fff;
}

.wrapper {
  display: flex;
  position: relative;
}

.wrapper .sidebar {
  width: 200px;
  height: 100%;
  background: #abcabd;
  padding: 30px 0px;
  position: fixed;
}

.wrapper .sidebar h2 {
  color: #000000;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 30px;
}

.wrapper .sidebar ul li {
  padding: 15px 0px;
  border-bottom: 1px solid #bdb8d7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.wrapper .sidebar ul li a {
  color: #000000;
  display: block;
}

.wrapper .sidebar ul li a .fas {
  width: 25px;
}

.wrapper .sidebar ul li:hover {
  cursor: pointer;
  background-color: #594f8d;
}

.wrapper .sidebar ul li:hover a {
  color: #fff;
}

.wrapper .main_content {
  width: 100%;
  float: left;
  margin-left: 200px;
}

.wrapper .main_content .header {
  font-size: 40px;
  padding: 20px;
  background: #fff;
  color: #717171;
  border-bottom: 1px solid #e0e4e8;
}

.wrapper .main_content .header .admin {
  float: right;
  font-size: 30px;
}
</style>
