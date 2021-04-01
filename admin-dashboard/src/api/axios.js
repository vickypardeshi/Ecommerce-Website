import axios from 'axios';
import { api } from './url';

const axiosInstance = axios.create({
    baseURL: api,
    // headers: {
    //     'Authorization': ''
    // },
});

export default axiosInstance;