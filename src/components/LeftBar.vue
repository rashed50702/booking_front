<template>
	<v-sheet class="ma-2 pa-2" style="min-height: 300px;">
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

	</v-sheet>
</template>

<script>
import apiMethods from '../apis/apiMethods';

	export default{
		name: 'LeftBar',
		props: ['user'],

		methods: {

		    // logout
		    logout() {
		        apiMethods.logout()
		            .then(() => {
		                localStorage.removeItem("auth");
		                this.isLoggedIn = false;
		                this.$router.push({ name: "Home" });
		            }).catch(error => {
		                if (error.response.status === 422) {
		                    this.errors = error.response.data.errors
		                }
		            });
		    },
		}
	}
</script>