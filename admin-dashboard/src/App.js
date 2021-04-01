import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
