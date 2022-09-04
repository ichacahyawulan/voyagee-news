<template>
  <div class="vue-template">
    <v-card class="login-card">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <h3 class="text-center">Login</h3>
        <v-text-field
          v-model="emailUser"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="passwordUser"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show ? 'text' : 'password'"
          label="Password"
          required
          @click:append="show = !show"
        ></v-text-field>

        <div class="text-center pt-6">
          <v-btn
            :disabled="!valid"
            color="primary"
            @click="loginUser"
          >
            Login
          </v-btn>

          <p class="forgot-account" style="padding-top: 10px">
            Don't have an account yet?
            <router-link :to="'/signup'">Sign Up</router-link>
          </p>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
// import UserDataService from '../services/UserDataService';
import UserService from "../services/UserDataService";
import ErrorDialog from "./ErrorDialog.vue";
export default {
  component: {
    ErrorDialog,
  },
  data() {
    return {
      emailUser: "",
      passwordUser: "",
      show: false,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [v => !!v || "Password is required"],
    };
  },
  methods: {
    loginUser: function () {
      const users = {
        email: this.emailUser,
        password: this.passwordUser,
      };

      this.isLoading = true;
      UserService.login(users)
        .then((result) => {
          this.isLoading = false;
          // console.log(result);
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(result.data));
          const datauser = result.data.dataUser;
          // console.log("Authentication: ",result.data);
          if (datauser.isAdmin) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.isError = true;
          console.log(err);
          alert("Please enter valid data")
        });
    },
  },
};
</script>

<style>
.login-card {
  overflow: hidden;
  width: 500px;
  margin: 60px auto;
  padding: 40px;
  border-radius: 0.3em;
}
</style>