import React from 'react';
import {
    Container, Row, Col,Form, Button, 
} from 'react-bootstrap';
import FormInput from '../components/common/FormInput';
import Layout from '../components/Layout';

const Signin = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <FormInput
                                label="Email"
                                placeholder="Email"
                                type="email"
                                value=""
                                onChange={() => {}}
                            />
                            <FormInput 
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value=""
                                onChange={() => {}}
                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Signin;