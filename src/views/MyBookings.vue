<template>
    <v-row no-gutters>
        <v-col cols="12" sm="3">
          <LeftBar :user="user"/>
        </v-col>
        <v-col cols="12" sm="9">
            <MyBookings :user="user"/>
        </v-col>
    </v-row>
</template>

<script>
import LeftBar from '@/components/LeftBar.vue'
import MyBookings from '@/components/MyBookings.vue'
import apiMethods from '../apis/apiMethods';

export default {

    components: {
        MyBookings,
        LeftBar,
    },

    data() {
        return {
            user: null,
        }
    },

    mounted() {
        apiMethods.authUser().then(response => {
            this.user = response.data;
        });

    },
}

</script>