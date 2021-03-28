const Cart = require('../models/cart');

exports.addToCart = (req, res) => {

    //if userId exist means cart already created for a user then no need to create new cart
    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error){
            return res.status(400).json({
                error
            });
        }
        if(cart){
            //if cart exist then update cart by quantity and price
            
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);
            let condition, update;
            if(item){
                //if Item is already added in a cart of a user then update item
                condition = { "user": req.user._id, "cartItems.product": product };
                update = {
                    "$set": {
                        "cartItems.$": {  //$ for just update a product not whole cart
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity,
                        },
                    }
                };
            }
            else{
                //else add item in a cart of a user
                condition = { user: req.user._id };
                update = {
                    "$push": {
                        "cartItems": req.body.cartItems,
                    }
                };
            }

            Cart.findOneAndUpdate( condition, update)
            .exec((error, _cart) => {
                if(error){
                    res.status(400).json({
                        error
                    });
                }
                if(_cart){
                    res.status(400).json({
                        cart: _cart,
                    });
                }
            });
        }
        else{
            //else create new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems],
            });
        
            cart.save((error, cart) => {
                if(error){
                    return res.status(400).json({
                        error
                    });
                }
                if(cart){
                    return res.status(201).json({
                        cart
                    });
                }
            });
        }
    });
};