import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePublicUrl } from '../api/url';
import Layout from '../components/Layout';
import { getProductBySlug } from '../store/actions/action';
import '../styles/product.css';

const ProductListPage = (props) => {

    const product = useSelector(state => state.product);
    const [priceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under25k: 25000,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const { slug } = props.match.params;
        dispatch(getProductBySlug(slug));
    }, [dispatch, props.match.params]);

    return (
        <Layout>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} mobile under {priceRange[key]}</div>
                                <button>View ALL</button>
                            </div>
                            <div className="products">
                                {
                                    product.productsByPrice[key].map(product =>
                                        <div className="productContainer">
                                            <div className="productImageContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                            </div>
                                            <div className="productInfo">
                                                <div className="productTitle">{product.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>3353</span>
                                                </div>
                                                <div className="productPrice">{product.price}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    );
                })
            }
        </Layout>
    );
}

export default ProductListPage;