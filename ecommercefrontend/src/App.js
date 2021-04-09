import React from 'react';
import './App.css';
import HomePage from './views/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductListPage from './views/ProductListPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
