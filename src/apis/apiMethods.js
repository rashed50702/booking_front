import api from './api';
import csrf from './csrf';

export default{
	async userRegistration(form){
		await csrf.getCookie();
		return api.post('/register', form);
	},

	async userLogin(form){
		await csrf.getCookie();
		return api.post('/login', form);
	},

	async logout(){
		await csrf.getCookie();
		return api.post('/logout');
	},

	authUser(){
		return api.get('/user');
	},

	// Booking APIs
	async checkBooking(form){
		await csrf.getCookie();
		return api.post('/check-bookings', form);
	},
	async bookingNow(form){
		await csrf.getCookie();
		return api.post('/book-now', form);
	},

	fetchBookingByUserId(userId){
		return api.get(`/my-bookings/${userId}`);	
	},

}