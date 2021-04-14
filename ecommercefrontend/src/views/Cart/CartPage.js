import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import CartItem from './CartItem';
import { addToCart, getCartItems } from '../../store/actions/action';
import '../../styles/cart/cartpage.css'



/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const CartPage = () => {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();
    //const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if(auth.authenticate){
            dispatch(getCartItems());
        }
    }, [auth.authenticate, dispatch]);

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img} = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));
    }

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img} = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1));
    }

    const onQuantityChange = (_id, qty) => {
        const { name, price, img} = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, qty));
    }

    return (
        <Layout>
            <div className="cartContainer" style={{alignItems: 'flex-start'}}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    //style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                onQuantityChange={onQuantityChange}
                            />
                        )
                    }
                </Card>
                <Card
                    headerLeft='Price'
                    style={{
                        width: '500px'
                    }}
                />
            </div>
        </Layout>
    );
}

export default CartPage;