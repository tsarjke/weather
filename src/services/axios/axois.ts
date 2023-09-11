import axios from 'axios';

axios.defaults.baseURL = 'https://weatherapi-com.p.rapidapi.com';
const instance = axios.create({
  headers: {
    'X-RapidAPI-Key': process.env.VUE_APP_API_KEY,
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  },
});

export default instance;
