<template>
    <v-row no-gutters>
        <Loading :overlay="overlay"/>
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
                <div class="search-box">
                    <v-form @submit.prevent="search">
                        <v-row>
                        <v-col cols="12" sm="5">
                            <p>From:</p>
                            <VueDatePicker v-model="form.start_time" name="start_time" :min-date="new Date()" :month-change-on-scroll="false"/>
                        </v-col>

                        <v-col cols="12" sm="5">
                            <p>To:</p>
                            <VueDatePicker v-model="form.end_time" :min-date="new Date()" :month-change-on-scroll="false" />
                        </v-col>
                        <v-col cols="12" sm="2">
                            <p>&nbsp;</p>
                            <v-btn color="primary" class="search-btn" type="submit">
                            <v-icon end icon="mdi-magnify"></v-icon> Search &nbsp;&nbsp;
                            </v-btn>
                        </v-col>
                        </v-row>
                    </v-form>
                    <div class="search-results" v-if="rooms.length">
                        <v-data-table :headers="headers" :items="rooms">
                        <template v-slot:item="{ item }">
                            <tr>
                                <td>{{ item.raw.room_name }}</td>
                                <td>{{ formatDate(item.raw.start_time) }}</td>
                                <td>{{ formatDate(item.raw.end_time) }}</td>
                                <td>
                                <v-btn size="small" @click="bookNow(item.raw)" color="pink"
                                    :disabled="item.raw.is_booked">
                                    <v-icon dark>mdi-bell</v-icon> {{ item.raw.text || item.raw.is_booked ? "Booked" : "Book Now" }}
                                </v-btn>
                                </td>
                            </tr>
                        </template>
                        </v-data-table>

                    </div>
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</template>

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

    name: "Dashboard",
    components: {
        VDataTable,
        VueDatePicker,
        Loading,
    },

   


    data() {
        return {
            overlay: false,
            user: null,
            rules: {
              required: value => !!value || 'Required.',
              
            },
            form: {
                start_time: new Date(),
                end_time: new Date(),
            },
            // datatable
            itemsPerPage: 5,
            headers: [
                { title: 'Room', key: 'room' },
                { title: 'Start Time', key: 'start_time' },
                { title: 'End Time', key: 'end_time' },
            ],
            // available rooms
            rooms: [],

        }
    },

    mounted() {
        this.overlay = true;
        apiMethods.authUser().then(response => {
            this.user = response.data;
            this.overlay = false;
        });

    },
    
    methods: {
        // Formate datetime
        formatDate(datetime) {
            return moment(datetime).format('DD-MMM-YYYY hh:mm A');
        },

        // Search available rooms
        search() {
            if(this.form.start_time == null){
                alert("Start Time is required!");
                return false;
            }

            if(this.form.end_time == null){
                alert("End Time is required!");
                return false;
            }

            if(this.form.start_time > this.form.end_time){
                alert("End Time should be later on start time!");
                return false;
            }

            let timediff = Math.floor(((this.form.end_time - this.form.start_time) / 1000) /60 );
        
            if (timediff <= 30) {
                alert("Time difference should be at least 30 minutes!");
                return false;
            }

            let data = {
                start_time: this.form.start_time,
                end_time: this.form.end_time,
                user_id: this.user.id,
            }
            this.overlay = true;
            apiMethods.checkBooking(data)
                .then((response) => {
                    this.rooms = response.data;
                    this.overlay = false;
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        this.overlay = false;
                    }
                });
        },

        // BookNow
        bookNow(item) {
            apiMethods.bookingNow(item)
                .then((response) => {
                    item.is_booked = true;
                    item.text = "Booked";
                    toast.success('Your booking successful!');
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                });
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