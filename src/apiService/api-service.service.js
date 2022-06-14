import axios from 'axios';
import store from '@/store/index.js';
export default axios.create({
  baseURL: process.env.NODE_ENV === 'development'
  ? "http://localhost:5001/api"
  : 'https://myeventbackend.azurewebsites.net/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});