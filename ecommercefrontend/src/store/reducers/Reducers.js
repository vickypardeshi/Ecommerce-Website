import { combineReducers } from 'redux';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import pageReducer from './page.reducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
});

export default rootReducer;