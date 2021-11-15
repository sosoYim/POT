import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://api.example.com',
});

export default customAxios;
