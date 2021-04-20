import { userConstants } from './constants';
import axios from '../../api/axios';

export const signup = (user) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: userConstants.USER_REGISTER_REQUEST,
            });
            const res = await axios.post('/admin/signup',{
                ...user,
            });
            if(res.status === 201){
                const { message } = res.data;
                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload: {
                        message
                    }
                });
            }
            else{
                if(res.status === 400){
                    const { message } = res.data;
                    dispatch({
                        type: userConstants.USER_REGISTER_FAILURE,
                        payload: {
                            message
                        }
                    });
                }
            }
        }
        catch(error){
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
};
