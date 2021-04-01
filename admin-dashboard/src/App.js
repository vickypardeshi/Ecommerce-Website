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
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
