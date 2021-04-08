import axios from '../../api/axios';
import { productConstants } from './constants';

export const addProduct = (form) => {
    return async dispatch => {

        dispatch({
            type: productConstants.ADD_NEW_PRODUCT_REQUEST,
        });

        const res = await axios.post('/product/create', form);
        if(res.status === 201){
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
                payload: {
                    products: res.data.product,
                }
            });
        }
        else{
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_FAILURE,
                payload: {
                    message: 'Something went wrong'
                }
            });
        }
        //console.log(res);
    }
}