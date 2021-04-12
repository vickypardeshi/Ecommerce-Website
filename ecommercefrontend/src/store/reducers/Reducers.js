import { combineReducers } from 'redux';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import pageReducer from './page.reducer';
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    auth: authReducer,
});

export default rootReducer;