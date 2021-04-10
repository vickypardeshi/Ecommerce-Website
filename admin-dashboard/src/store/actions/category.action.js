import axios from '../../api/axios';
import { categoryConstants } from './constants';

const getAllCategory = () => {
    return async dispatch => {

        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
        });

        const res = await axios.get('/category/getcategories');
        console.log(res);


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
}

export const addCategory = (form) => {
    return async dispatch => {

        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        });

        try {
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
                    payload: res.data.error
                });
            }
        }
        catch (error) {
            console.log(error.response);
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {

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
}

export const deleteCategories = (ids) => {
    return async dispatch => {

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
}

export {
    getAllCategory
}