import axios from '../../api/axios';
import { authConstants} from './constants';

export const login = (user) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: authConstants.LOGIN_REQUEST,
            });
            const res = await axios.post('/admin/signin',{
                ...user,
            })
            if(res.status === 200){
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, 
                        user,
                    }
                });
            }
            else{
                if(res.status === 400){
                    dispatch({
                        type: authConstants.LOGIN_FAILURE,
                        payload: {
                            error: res.data.error
                        }
                    });
                }
            }
        }
        catch(error){
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
};

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        try{
            const token = localStorage.getItem('token');
            if(token){
                const user = JSON.parse(localStorage.getItem('user'));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            }
            else{
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: '',
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error,
                }
            });
        }
    }
};

export const signout = () => {
    return async dispatch => {
        try{
            dispatch({
                type: authConstants.LOGOUT_REQUEST,
            });
            const res = await axios.post('/admin/signout');
            if(res.status === 200){
                localStorage.clear();
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS,
                });
            }
            else{
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload: {
                        error: res.data.error,
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
};
