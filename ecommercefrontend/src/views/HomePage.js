import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { HomeProducts } from '../components/Home/HomeProducts';
import HomeFooter from '../components/Home/HomeFooter';
import Layout from '../components/Layout';
import { Key } from '../alan';
import Card from '../components/Home/Card';


const HomePage = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        alanBtn({
            key: Key,
            onCommand: ({ commands, product }) => {
                if (commands === "show") {
                    filterProducts(product);
                }
                
            }
        });
        filterProducts('');
    }, []);

    const filterProducts = (name) => {
        const products = HomeProducts.filter(product => 
                product.name.includes(name));
        setProducts(products);
    }

    return (
        
        <Layout>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {
                    products.map(product => (
                        <Card 
                            image={product.image}
                            name={product.name}
                            rating={product.rating}
                            actualPrice={product.actualPrice}
                            offerPrice={product.offerPrice}
                        />  
                    ))
                }
            </div>
            <HomeFooter />
        </Layout>
    );
}

export default HomePage;
