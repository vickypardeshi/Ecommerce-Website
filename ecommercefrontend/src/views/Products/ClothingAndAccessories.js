import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductBySlug } from '../../store/actions/action';
import Card from '../../components/common/Card';
import { generatePublicUrl } from '../../api/url';
import '../../styles/products/clothingandaccessories.css';
import Loader from '../../components/common/Loader';


const ClothingAndAccessories = (props) => {
    const product = useSelector((state) => state.product);
    const { loading } = product;
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductBySlug(match.params.slug));
    }, [dispatch, props]);

    if(loading){
        return (
            <Loader />
        );
    }

    return (
        <div 
            style={{
                padding: "10px",                
            }}
        >
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex",
                    flexWrap: 'wrap',
                    paddingLeft: '50px'
                }}
            >
                {product.products.map((product) => (
                    <div className="caContainer">
                        <Link
                            className="caImgContainer"
                            to={`/${product.slug}/${product._id}/p`}
                        >
                            <img
                                src={generatePublicUrl(product.productPictures[0].img)}
                                alt={product.productPictures[0].img}
                            />
                        </Link>
                        <div>
                            <div className="caProductName">{product.name}</div>
                            <div className="caProductPrice">     
                                ₹{product.price}
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default ClothingAndAccessories;
