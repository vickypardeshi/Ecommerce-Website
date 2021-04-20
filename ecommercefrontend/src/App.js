import React, { useEffect } from 'react';
import HomePage from './views/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductListPage from './views/ProductListPage';
import { useDispatch ,useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './store/actions/action';
import ProductDetailsPage from './views/Products/ProductDetailsPage';
import CartPage from './views/Cart/CartPage';
import CheckoutPage from './views/Cart/CheckoutPage';
import OrderPage from './views/Order/OrderPage';
import OrderDetailsPage from './views/Order/OrderDetailsPage';
import './App.css';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate, dispatch]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
