<template>
  <v-card color="grey-lighten-3">
      <v-layout>
        <v-app-bar
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
        >
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
          </template>

          <template v-slot:prepend>
            <v-btn icon>
              <v-icon>mdi-widgets</v-icon>
            </v-btn>
          </template>
          <v-app-bar-title>MeetingRoomBooking</v-app-bar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
        
        </v-main>
      </v-layout>
    </v-card>
</template>

<script setup></script>
<script>
import apiMethods from '../../apis/apiMethods';

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },

}
</script>
