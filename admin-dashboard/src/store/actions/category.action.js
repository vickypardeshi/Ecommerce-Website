import axios from '../../api/axios';
import { categoryConstants } from './constants';

const getAllCategory = () => {
    return async dispatch => {
        try{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
            });
            const res = await axios.get('/category/getcategories');
            if (res.status === 200) {
                const { categoryList } = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: {
                        categories: categoryList
                    }
                });
            }
            else {
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        try {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
            });
            const res = await axios.post('/category/create', form);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: {
                        category: res.data.cat
                    }
                });
            }
            else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
};

export const updateCategories = (form) => {
    return async dispatch => {
        try{
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_REQUEST,
            });
            const res = await axios.post('/category/update', form);
            if (res.status === 201) {
                dispatch(getAllCategory());
                dispatch({
                    type: categoryConstants.UPDATE_CATEGORIES_SUCCESS,
                });
            }
            else {
                dispatch({
                    type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                    payload: {
                        error: 'Something went wrong'
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: {
                    error,
                }
            });
        }
    }
};

export const deleteCategories = (ids) => {
    return async dispatch => {
        try{
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_REQUEST,
            });
            const res = await axios.post('/category/delete', {
                payload: {
                    ids
                }
            });
            if (res.status === 201) {
                dispatch(getAllCategory())
                dispatch({
                    type: categoryConstants.DELETE_CATEGORIES_SUCCESS,
                });
            }
            else {
                dispatch({
                    type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                    payload: {
                        error: 'Something went wrong'
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: {
                    error,
                }
            });
        }
    }
};

export {
    getAllCategory
}