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
import { isUserLoggedIn } from './store/actions/action';
import Products from './views/Products';
import Orders from './views/Orders';
import Category from './views/Category';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  //Like Component DidMount
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  });

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
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
