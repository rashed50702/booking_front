<template>
    <v-row no-gutters>
        <v-col cols="12" sm="3">
            <v-card>
              <v-card-text>
                <div class="text-center">
                  <v-avatar
                    color="brown"
                  >
                    <span class="text-h4">A</span>
                  </v-avatar>
                  <h2 v-if="user">{{ user.name }}</h2>
                  <v-divider class="my-3"></v-divider>
                </div>
                <div>
                  <v-btn
                    rounded
                    variant="text"
                    to="/dashboard"
                  >
                    <v-icon>mdi-home</v-icon>Dashboard
                  </v-btn>
                  <v-divider class="my-3"></v-divider>

                  <v-btn
                    rounded
                    variant="text"
                    to="/my-bookings"
                  >
                    <v-icon>mdi-widgets</v-icon>My Bookings
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn
                    rounded
                    variant="text"
                    @click.prevent="logout"
                  >
                    <v-icon>mdi-logout</v-icon> Logout
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="9">
            <v-sheet class="ma-2 pa-2">
                <Loading :overlay="overlay"/>
                  <div class="search-box">
                    <div class="search-results" v-if="my_bookings.length">
                      <v-data-table :headers="headers" :items="my_bookings">
                        <template v-slot:item="{ item }">
                            <tr>
                                <td>{{ item.raw.room.name }}</td>
                                <td>{{ formatDate(item.raw.start_time) }}</td>
                                <td>{{ formatDate(item.raw.end_time) }}</td>
                                <td class="text-center">
                                    <v-alert
                                      :type="item.raw.status === 'Pending' ? 'warning' : (item.raw.status === 'Approved' ? 'success' : 'error')"
                                      variant="outlined"
                                    >
                                      {{ item.raw.status }}
                                    </v-alert>
                                </td>
                                <td class="text-center">
                                    <v-btn size="small" color="pink">
                                        <v-icon dark>mdi-bell</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                      </v-data-table>

                    </div>
                    <!-- <h3 v-else>You have No Data!</h3> -->
                  </div>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<style scope>
    .v-alert--density-default{
        padding: 5px 0px !important;
        text-align: center;
        font-size: 12px;
    }
    .v-alert__prepend{
        margin-inline-end: 0px !important;
    }
    .v-alert__prepend i{
        font-size: 20px !important;
        height: 20px !important;
        width: 20px !important;
    }
</style>

<script>
import Loading from './Loading.vue';

// Datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Backend APIs
import apiMethods from '../apis/apiMethods';


// Datatable
import { VDataTable } from 'vuetify/labs/VDataTable'

// Moment
import moment from "moment";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {

    name: "MyBookings",
    components: {
        VDataTable,
        VueDatePicker,
        Loading,
    },

   


    data() {
        return {
            overlay: false,
            user: null,
            
            // datatable
            itemsPerPage: 5,
            headers: [
                { title: 'Room', key: 'room', sortable: false },
                { title: 'Start Time', key: 'start_time' },
                { title: 'End Time', key: 'end_time' },
                { title: 'Status', key: 'status', align: 'center'},
                { title: 'Action', key: 'action', align: 'center', sortable: false },
            ],
            my_bookings: [],

        }
    },
    created() {
        this.overlay = true;
        apiMethods.authUser().then(response => {
            this.user = response.data;

            // fetch my bookings
            apiMethods.fetchBookingByUserId(this.user.id)
                .then(response => {
                    this.my_bookings = response.data;
                    this.overlay = false;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.overlay = false;
                });
        });
    },
    mounted() {
        console.log("Mounted");

    },
    
    methods: {
        // Formate datetime
        formatDate(datetime) {
            return moment(datetime).format('DD-MMM-YYYY hh:mm A');
        },


        // logout
        logout() {
            this.overlay = true;
            apiMethods.logout()
                .then(() => {
                    localStorage.removeItem("auth");
                    this.isLoggedIn = false;
                    this.$router.push({ name: "Home" });
                    this.overlay = false;
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        this.overlay = false;
                    }
                });
        },

    }
}
</script>