import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Adjust if your API has a different base URL

const api = axios.create({
  baseURL,
  withCredentials: true, // Include cookies for authentication (if applicable)
  
});

export default api;