import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../store/actions/action';
import { getParams } from '../../utilities/Utils';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import '../../styles/products/productPage.css'

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const { page } = useSelector(state => state.page);
    
    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = {
            params,
        };
        dispatch(getProductPage(payload));
    }, [dispatch, props.location.search]);

    if(!page.title){
        return (
            <Loader />
        );
    }

    return(
        <div className="main-container">
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => {}}
            >
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a
                            className="bannerClick"
                            key={index}
                            href={banner.navigateTo}
                        >
                            <img src={banner.img} alt="" />
                        </a>
                    )
                }
            </Carousel>
            <div className="card-container">
                {
                    page.products && page.products.map((product, index) =>
                        <Card 
                            key={index}
                            className="product-card"
                        >
                            <img 
                                className="product-img"
                                src={product.img} alt="" 
                            />
                        </Card>
                    )
                }
            </div>
        </div>
    );
}

export default ProductPage;