import React from 'react';
import Layout from '../components/Layout';
import { getParams } from '../utilities/Utils';
import ProductPage from './Products/ProductPage';
import ProductStore from './Products/ProductStore';

const ProductListPage = (props) => {

    const renderProduct = () => {
        const params = getParams(props.location.search);
        let content = null;
        switch(params.type){
            case 'store':
                content = <ProductStore {...props} />;
                break;
            case 'page':
                content = <ProductPage {...props} />;
                break;
            default:
                content = null;
                break;
        }
        return content;
    }

    return (
        <Layout>
            
            {renderProduct()}
        </Layout>
    );
}

export default ProductListPage;