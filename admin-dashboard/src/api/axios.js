import axios from 'axios';
import { api } from './url';
import store from '../store/store/Store';
import { authConstants } from '../store/actions/constants';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Token ${token}` : ''
    },
});

axiosInstance.interceptors.request.use((req) => {
     const { auth } = store.getState();
     if(auth.token){
         req.headers.Authorization = `Token ${auth.token}`;
     }
    return req;
});

axiosInstance.interceptors.request.use((res) => {
    return res;
}, (error) => {
    const status = error.response ? error.response.status : 500;
    if(status && status === 500){
        localStorage.clear();
        store.dispatch({
            type: authConstants.LOGOUT_SUCCESS
        });
    }
    return Promise.reject(error);
});

export default axiosInstance;
