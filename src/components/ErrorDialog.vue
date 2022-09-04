<template>
    <div class="text-center">
    <v-dialog
      v-model="isDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline red darken-2" style="color:white">
          {{errorTitle}}
        </v-card-title>

        <v-card-text class="body-1 pa-10">
          {{errorMessage}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="isDialog = false"
          >
           Okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    props:{
        isDialog:{
            type:Boolean,
            default: false,
        },
        errorTitle: {
            type:String,
            default:"Title",
        },
        errorMessage: {
      type: String,
      default:"Error",
    }
    },
}
</script>
