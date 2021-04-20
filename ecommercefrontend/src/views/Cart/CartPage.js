import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import CartItem from './CartItem';
import { addToCart, getCartItems, removeCartItem } from '../../store/actions/action';
import { MaterialButton } from '../../components/derived/HeaderContent';
import PriceDetails from './PriceDetails';
import '../../styles/cart/cartpage.css'



/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate, dispatch]);

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));
    }

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1));
    }

    const onQuantityChange = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, qty));
    }

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
    };

    if (props.onlyCartItems) {
        return (
            <>
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={onQuantityIncrement}
                            onQuantityDec={onQuantityDecrement}
                            onQuantityChange={onQuantityChange}
                            onRemoveCartItem={onRemoveCartItem}
                        />
                    )
                }
            </>
        );
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                <Card
                    headerleft={`My Cart`}
                    headerright={<div>Deliver to</div>}
                    style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                onQuantityChange={onQuantityChange}
                                onRemoveCartItem={onRemoveCartItem}
                            />
                        )
                    }
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "250px" }}>
                            <MaterialButton
                                title="PLACE ORDER"
                                onClick={() => props.history.push(`/checkout`)}
                            />
                        </div>
                    </div>
                </Card>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    );
}

export default CartPage;