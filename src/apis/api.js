import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Set the base URL to your Laravel app's API
});

api.defaults.withCredentials = true;

export default api;