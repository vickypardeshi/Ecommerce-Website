import React, { useEffect } from 'react';
import './App.css';
import HomePage from './views/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductListPage from './views/ProductListPage';
import { useDispatch ,useSelector } from 'react-redux';
import { isUserLoggedIn } from './store/actions/action';
import ProductDetailsPage from './views/Products/ProductDetailsPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);

  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
