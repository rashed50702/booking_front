<template>
    <v-sheet class="ma-2 pa-2">
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
    props: {
        user: Object // Define the user prop
    },

    components: {
        VDataTable,
    },

   


    data() {
        return {
            // datatable
            itemsPerPage: 5,
            headers: [
                { title: 'Room', key: 'room', sortable: false },
                { title: 'Start Time', key: 'start_time' },
                { title: 'End Time', key: 'end_time' },
                { title: 'Status', key: 'status', align: 'center'},
                { title: 'Action', key: 'action', align: 'center', sortable: false },
            ],
            my_bookings: [],   // Initialize userId property

        }
    },

    // created() {
    //   if(this.user){
    //     apiMethods.fetchBookingByUserId(this.user.id)
    //         .then(response => {
    //             this.fetchedData = response.data; // Update the fetchedData array
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    //   }

    // },

    watch: {
        user: {
            immediate: true, // Execute the handler immediately on mount
            handler(user) {
                if (user) {
                    apiMethods.fetchBookingByUserId(user.id)
                        .then(response => {
                            this.my_bookings = response.data;
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                }
            }
        }
    },

    methods: {
        formatDate(datetime) {
            return moment(datetime).format('DD-MMM-YYYY hh:mm A');
        },
    }
}
</script>