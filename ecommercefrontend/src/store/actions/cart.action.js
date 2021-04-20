import axios from '../../api/axios';
import store from '../store/Store';
import { cartConstants } from './constants';

const getCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const res = await axios.post(`/user/getCartItems`);
            if (res.status === 200) {
                const { cartItems } = res.data;
                if (cartItems) {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems },
                    });
                }
            }
            else {
                dispatch({
                    type: cartConstants.ADD_TO_CART_FAILURE,
                    payload: {
                        error: res.data.error
                    },
                });
            }
        }
        catch (error) {
            dispatch({
                type: cartConstants.ADD_TO_CART_FAILURE,
                payload: { error },
            });
        }
    };
};

export const addToCart = (product, newQty = 1) => {
    return async (dispatch) => {
        const {
            cart: { cartItems },
            auth,
        } = store.getState();

        const qty = cartItems[product._id]
            ? parseInt(cartItems[product._id].qty + newQty)
            : 1;
        cartItems[product._id] = {
            ...product,
            qty,
        };

        try {
            // for loggedin user
            if (auth.authenticate) {
                dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
                const payload = {
                    cartItems: [
                        {
                            product: product._id,
                            quantity: qty,
                        },
                    ],
                };
                const res = await axios.post(`/user/cart/addtocart`, payload);
                if (res.status === 201) {
                    dispatch(getCartItems());
                }
                else{
                    dispatch({
                        type: cartConstants.ADD_TO_CART_FAILURE,
                        payload: {
                            error: res.data.error
                        }
                    });
                }
            }
            else {
                localStorage.setItem("cart", JSON.stringify(cartItems));
            }
            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: { cartItems },
            });
        }
        catch (error) {
            dispatch({
                type: cartConstants.ADD_TO_CART_FAILURE,
                payload: {
                    error,
                }
            });
        }

    };
};

export const removeCartItem = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
            const res = await axios.post(`/user/cart/removeitem`, { payload });
            if (res.status === 202) {
                dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
                dispatch(getCartItems());
            } else {
                const { error } = res.data;
                dispatch({
                    type: cartConstants.REMOVE_CART_ITEM_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            dispatch({
                type: cartConstants.REMOVE_CART_ITEM_FAILURE,
                payload: { error },
            });
        }
    };
};

export const updateCart = () => {
    return async (dispatch) => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : null;

        try{
            if (auth.authenticate) {
                localStorage.removeItem("cart");
                if (cartItems) {
                    const payload = {
                        cartItems: Object.keys(cartItems).map((key, index) => {
                            return {
                                quantity: cartItems[key].qty,
                                product: cartItems[key]._id,
                            };
                        }),
                    };
                    if (Object.keys(cartItems).length > 0) {
                        const res = await axios.post(`/user/cart/addtocart`, payload);
                        if (res.status === 201) {
                            dispatch(getCartItems());
                        }
                        else{
                            dispatch({
                                type: cartConstants.ADD_TO_CART_FAILURE,
                                payload: {
                                    error: res.data.error,
                                }
                            });
                        }
                    }
                    else{
                        dispatch({
                            type: cartConstants.ADD_TO_CART_FAILURE,
                            payload: {
                                error: 'Something went wrong',
                            }
                        });
                    }
                }
                else {
                    dispatch(getCartItems());
                }
            } else {
                if (cartItems) {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems },
                    });
                }
                else{
                    dispatch({
                        type: cartConstants.ADD_TO_CART_FAILURE,
                        payload: {
                            error: 'Something went wrong',
                        }
                    });
                }
            }
        }
        catch(error){
            dispatch({
                type: cartConstants.ADD_TO_CART_FAILURE,
                payload: {
                    error,
                }
            });
        }
    };
};


export { getCartItems };
