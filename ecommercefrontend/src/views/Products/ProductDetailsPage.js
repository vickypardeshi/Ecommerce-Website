import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { getProductDetailsById } from '../../store/actions/action';

const ProductDetailsPage = (props) => {

    const dispatch = useDispatch();
    const { productDetails } = useSelector(state => state.product);

    useEffect(() => {
        const {productId} = props.match.params;
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload));
    }, [dispatch, props.match.params]);

    return(
        <Layout>
            <div>
                {JSON.stringify(productDetails)}
            </div>
        </Layout>
    );
}

export default ProductDetailsPage;