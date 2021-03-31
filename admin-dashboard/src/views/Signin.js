import React from 'react';
import {
    Container, Row, Col,Form, Button, 
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FormInput from '../components/common/FormInput';
import Layout from '../components/Layout';
import { login } from '../store/actions/action';

const Signin = (props) => {

    const dispatch = useDispatch();

    const userLogin = (e) => {
        //avoid default behaviour of default
        e.preventDefault();

        const user = {
            email: 'vickypardesh@gmail.com',
            password: 'Vicky@7767',
        }
        dispatch(login(user));
    }
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
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