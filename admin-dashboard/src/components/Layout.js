import React from 'react';
import Header from './Header';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/layout.css'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li>
                                        <NavLink exact to={'/'}>Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/category'}>Category</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/products'}>Products</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/orders'}>Orders</NavLink>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={10} className="main_container">
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }
        </>
    );
}

export default Layout;