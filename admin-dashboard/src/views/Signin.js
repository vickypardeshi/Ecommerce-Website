import React, { useState } from 'react';
import {
    Container, Row, Col,Form, Button, 
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import Layout from '../components/Layout';
import { login } from '../store/actions/action';

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
        //avoid default behaviour of default
        e.preventDefault();

        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={'/'} />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormInput 
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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