import React, { useState } from 'react';
import { generatePublicUrl } from '../../api/url';


import '../../styles/cart/cartitem.css'

const CartItem = (props) => {

    const [qty, setQty] = useState(props.cartItem.qty);
    console.log(props.cartItem)
    const {
        onQuantityInc, onQuantityDec,
    } = props;
    const {
        _id, name, price, img
    } = props.cartItem;

    const onQuantityIncrement = () => {
        setQty(qty + 1);
        onQuantityInc(_id, qty + 1);
    }

    const onQuantityDecrement = () => {
        if(qty <= 1) return;
        setQty(qty - 1);
        onQuantityDec(_id, qty - 1);
    }

    // const onchangeQuantity = (e) => {
    //     const chnageQty = e.target.value;
    //     if(chnageQty.length === 0){
    //         setQty(1);
    //         return;
    //     }
    //     setQty(chnageQty);
    //     onQuantityChange(_id, chnageQty);
        
    // }

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className="cartProImgContainer">
                    <img src={generatePublicUrl(img)} alt={""} />
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p>{name}</p>
                        <p>Rs. {price}</p>
                    </div>
                    <div>Delivery in 3 - 5 days</div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    margin: "5px 0",
                }}
            >
                {/* quantity control */}
                <div className="quantityControl">
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} />
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                <button className="cartActionBtn">save for later</button>
                <button
                    className="cartActionBtn"
                    onClick={() => props.onRemoveCartItem(_id)}
                >
                    Remove
        </button>
            </div>
        </div>
    );
}

export default CartItem;