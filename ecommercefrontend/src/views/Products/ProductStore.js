import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePublicUrl } from '../../api/url';
import { getProductBySlug } from '../../store/actions/action';
import { Link } from 'react-router-dom';
import '../../styles/products/productStore.css';
import Card from '../../components/common/Card';
import { MaterialButton } from '../../components/derived/HeaderContent';
import Rating from '../../components/common/Rating';
import Price from '../../components/common/Price';


const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    const priceRange = product.priceRange;
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
                            headerRight={
                                <MaterialButton
                                    title={"VIEW ALL"}
                                    style={{
                                        width: "96px",
                                    }}
                                    bgColor="#2874f0"
                                    fontSize="12px"
                                />
                            }
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
                                                display: 'block',
                                                textDecoration: "none",
                                                color: "#000",
                                            }}
                                            className="productContainer"
                                        >
                                            <div className="productImageContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                            </div>
                                            <div className="productInfo">
                                                <div className="productTitle">{product.name}</div>
                                                <div>
                                                    <Rating value="4.3" />
                                                    <span
                                                        style={{
                                                            color: "#777",
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        (3353)
                                                    </span>
                                                </div>
                                                <Price value={product.price} />
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