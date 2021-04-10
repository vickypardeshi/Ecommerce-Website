import axios from '../../api/axios';
import { categoryConstants, productConstants } from "./constants";

export const getInitialData = () => {
    return async dispatch => {
        
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
        });
        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_REQUEST,
        });

        const res = await axios.post('/initialData');
        if(res.status === 200){
            const { categories, products} = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories}
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
        }
        else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_FAILURE,
            });
        }
        console.log(res);
    }
}