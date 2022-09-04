<template>
  <div class="wrapper wrapper--w900">
    <div class="card card-4">
      <div class="card-body">
        <h2 class="title">Add Category</h2>
        <form method="POST">
          <div class="row row-space">
            <div class="col-5">
              <div class="input-group">
                <label class="label">Category Name</label>
                <input
                  class="input--style-4"
                  type="text"
                  name="category"
                  v-model="categoryName"
                  required
                />
              </div>
            </div>
            <div class="col-4">
              <div class="input-group">
                <label class="label">Is A Location :</label>
                <div class="p-t-10">
                  <label class="radio-container m-r-45"
                    >Yes
                    <input
                      type="radio"
                      name="location"
                      :value="true"
                      v-model="isLocation"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="radio-container"
                    >No
                    <input
                      type="radio"
                      checked="checked"
                      name="location"
                      :value="false"
                      v-model="isLocation"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="p-t-15">
            <input
              type="button"
              class="btn btn--radius-2 btn--blue"
              value="Submit"
              @click="addCategories(categoryName)"
            />
          </div>
        </form>
      </div>
    </div>
    <v-overlay :value="overlay" v-if="isLoading">
      <v-progress-circular
        class="loading"
        indeterminate
        color="red"
      ></v-progress-circular>
    </v-overlay>
    <error-dialog
      class="loading"
      errorTitle="Error"
      errorMessage="Error while adding category"
      :isDialog="isError"
      v-if="isError"
    >
    </error-dialog>
  </div>
</template>

<script>
import CategoryService from "../../services/CategoryDataService";
import ErrorDialog from "../ErrorDialog.vue";
export default {
  components: {
    ErrorDialog,
  },
  data() {
    return {
      categoryName: "",
      isLocation: false,
      isLoading: false,
      isError: false,
    };
  },
  methods: {
    addCategories: function () {
      console.log(this.categoryName);
      console.log(this.isLocation);
      const categorys = {
        name: this.categoryName,
        isLocation: this.isLocation,
      };
      this.isLoading = true;
      CategoryService.create(categorys)
        .then((result) => {
          this.isLoading = false;
          console.log(result);
        })
        .catch((err) => {
          this.isLoading = false;
          this.isError = true;
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.p-t-15 {
  padding-top: 15px;
}

.loading {
  position: fixed;
  right: 50%;
  top: 50%;
  z-index: 200;
}
/* ==========================================================================
   #BUTTON
   ========================================================================== */
.btn {
  display: inline-block;
  line-height: 50px;
  padding: 0 50px;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  cursor: pointer;
  font-size: 18px;
}

.btn--radius {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.btn--radius-2 {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.btn--blue {
  background: #4272d7;
}

.btn--blue:hover {
  background: #3868cd;
}

/* ==========================================================================
   #Checkmark
   ========================================================================== */
.m-r-45 {
  margin-right: 45px;
}
.radio-container {
  display: inline-block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-container input:checked ~ .checkmark {
  background-color: #e5e5e5;
}

.radio-container input:checked ~ .checkmark:after {
  display: block;
}

.radio-container .checkmark:after {
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #57b846;
}

.checkmark {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #e5e5e5;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* ==========================================================================
   #FORM
   ========================================================================== */
.input {
  outline: none;
  margin: 0;
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  width: 100%;
  font-size: 14px;
  font-family: inherit;
}
.input-group {
  position: relative;
  margin-bottom: 22px;
}

.input--style-4 {
  line-height: 30px;
  background: #fafafa;
  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.label {
  font-size: 16px;
  color: #555;
  text-transform: capitalize;
  display: block;
  margin-bottom: 5px;
}

/* ==========================================================================
   #TITLE
   ========================================================================== */
.title {
  font-size: 24px;
  color: #525252;
  font-weight: 400;
  margin-bottom: 40px;
}
.row-space {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.col-2 {
  width: -webkit-calc((100% - 30px) / 2);
  width: -moz-calc((100% - 30px) / 2);
  width: calc((100% - 30px) / 2);
}

@media (max-width: 967px) {
  .col-2 {
    width: 100%;
  }
}
.wrapper--w900 {
  padding: 50px 100px;
  max-width: 100%;
}
/* ==========================================================================
   #CARD
   ========================================================================== */
.card {
  padding: 0px 120px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #fff;
}

.card-4 {
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
}

.card-4 .card-body {
  padding: 57px 65px;
  padding-bottom: 65px;
}

@media (max-width: 900px) {
  .card-4 .card-body {
    padding: 50px 40px;
  }
}
</style>
