import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePublicUrl } from '../../api/url';
import { getProductBySlug } from '../../store/actions/action';
import { Link } from 'react-router-dom';
import '../../styles/products/productStore.css';
import Card from '../../components/common/Card';

const ProductStore = (props) =>{

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
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                            headerRight={<button>View ALL</button>}
                            style={{
                                width: "calc(100% - 40px)",
                                margin: "20px",
                            }}
                        >
                            <div className="products">
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`} 
                                            style={{
                                                display: 'block'
                                            }}
                                            className="productContainer"
                                        >
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
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    );
                })
            }
        </>
    );
}

export default ProductStore;