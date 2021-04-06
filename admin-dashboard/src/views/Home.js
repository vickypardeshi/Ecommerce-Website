import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/Home.css'

const Home = (props) => {
    return(
        <Layout>
            <Container>
                <Row>
                    <Col md={2} className="sidebar">
                        Side Bar
                    </Col>
                    <Col md={10} className="main_container">
                        Container
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Home;