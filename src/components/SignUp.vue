<template>
  <div class="vue-template">
    <v-card class="signup-card">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <h3 class="text-center">Sign Up</h3>
        <v-text-field
          v-model="fullnameUser"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="userName"
          :counter="15"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>
    
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
          hint="At least 8 characters"
          counter
          required
          @click:append="show = !show"
        ></v-text-field>
        
        <v-text-field
          v-model="confirmPassword"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
          :type="show1 ? 'text' : 'password'"
          label="Confirm Password"
          required
          @click:append="show1 = !show1"
        ></v-text-field>

        <div class="text-center pt-6">
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="addUser"
          >
            Sign Up
          </v-btn>
      
          <v-btn
            color="error"
            @click="reset"
          >
            Reset Form
          </v-btn>

          <p class="forgot-account" style="padding-top: 10px">
            Already have an account?
            <router-link :to="'/login'">Log in</router-link>
          </p>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import UserService from "../services/UserDataService";
import ErrorDialog from "./ErrorDialog.vue";
export default {
  component: {
    ErrorDialog,
  },
  data() {
    return {
      fullnameUser: "",
      userName: "",
      emailUser: "",
      passwordUser: "",
      show: false,
      show1: false,
      valid: true,
      nameRules: [v => !!v || 'Name is required'],
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 15) || 'Username must be less than 15 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      confirmPassword: "",
      passwordRules: [v => !!v || "Password is required"],
      confirmPasswordRules: [v => !!v || "Confirm password is required"]
    };
  },
  methods: {
    addUser: function () {
      const users = {
        name: this.fullnameUser,
        username: this.userName,
        email: this.emailUser,
        password: this.passwordUser,
        isAdmin: false,
      };

      const log = {
        email: this.emailUser,
        password: this.passwordUser,
      };

      this.isLoading = true;
      UserService.create(users)
        .then((result) => {
          this.isLoading = false;
          console.log(result);
          UserService.login(log)
            .then((result) => {
              this.isLoading = false;
              console.log(result);
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(result.data));
              console.log("Authentication: ", result.data);
              this.$router.push("/");
            })
            .catch((err) => {
              this.isLoading = false;
              this.isError = true;
              console.log(err);
            });
          // this.$router.push("/login");
          // location.reload()
        })
        .catch((err) => {
          this.isLoading = false;
          this.isError = true;
          console.log(err);
          if(this.fullnameUser == "" || this.userName == "" || 
            this.emailUser == "" || this.passwordUser == "") {
            alert('Please enter valid data')
          } else {
            alert('Sign Up failed, username or email already used!')
          }
        });
    },
    reset () {
      this.$refs.form.reset()
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.passwordUser === this.confirmPassword || "Password must match";
    }
  }
};
</script>

<style>
.signup-card {
  overflow: hidden;
  width: 500px;
  margin: 60px auto;
  padding: 40px;
  border-radius: 0.3em;
}
</style>