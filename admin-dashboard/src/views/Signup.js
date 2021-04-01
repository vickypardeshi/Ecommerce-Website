import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Container, Row, Col,Form, Button, 
} from 'react-bootstrap';
import Layout from '../components/Layout';
import FormInput from '../components/common/FormInput';


const Signup = (props) => {

    const auth = useSelector(state => state.auth);

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    return(
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        value=""
                                        onChange={() => {}}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormInput
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        value=""
                                        onChange={() => {}}
                                    />
                                </Col>
                            </Row>

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

export default Signup;