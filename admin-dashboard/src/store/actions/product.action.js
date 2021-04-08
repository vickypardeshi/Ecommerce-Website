import axios from '../../api/axios';

export const addProduct = (form) => {
    return async dispatch => {
        const res = await axios.post('/product/create', form);
        console.log(res);
    }
}