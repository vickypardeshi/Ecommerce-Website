import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getProductBySlug } from '../../store/actions/action';
import Card from '../../components/common/Card';
import { generatePublicUrl } from '../../api/url';
import '../../styles/products/clothingandaccessories.css';


const ClothingAndAccessories = (props) => {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductBySlug(match.params.slug));
    }, [dispatch, props]);

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex",
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
                                <BiRupee />
                                {product.price}
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default ClothingAndAccessories;
