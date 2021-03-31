import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
