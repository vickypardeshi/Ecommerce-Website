import React from 'react';
import Header from '../components/Header';
import MenuHeader from '../components/MenuHeader';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <>
            <Header />
            <MenuHeader />
            {props.children}
            <Footer />
        </>
    );
}

export default Layout;
