import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8686'
});

export default api;