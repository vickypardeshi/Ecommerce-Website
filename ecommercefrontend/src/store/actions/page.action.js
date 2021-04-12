import axios from "../../api/axios"
import { pageConstants } from "./constants";

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;

            dispatch({
                type: pageConstants.GET_PRODUCT_PAGE_REQUEST,
            });

            const res = await axios.get(`/page/${cid}/${type}`);

            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: pageConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: {
                        page
                    }
                });
            }
            else {
                dispatch({
                    type: pageConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: {
                        error: 'Something went wrong',
                    }
                });
            }
        }
        catch(error){
            console.log(error);
        }
        
    }
}