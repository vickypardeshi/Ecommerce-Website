import axios from 'axios';
import { api } from './url';
import store from '../store/store/Store';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Token ${token}` : ''
    },
});

axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if (auth.token) {
      req.headers.Authorization = `Token ${auth.token}`;
    }
    return req;
  });

export default axiosInstance;