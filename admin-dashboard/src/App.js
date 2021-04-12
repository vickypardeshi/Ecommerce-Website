import React, { useEffect } from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import {
  isUserLoggedIn, getInitialData,
} from './store/actions/action';
import Products from './views/Products';
import Orders from './views/Orders';
import Category from './views/Category';
import Page from './views/Page';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  //Like Component DidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={Page} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
