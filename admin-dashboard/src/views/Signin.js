import React, { useState } from 'react';
import {
    Container, Row, Col,
    Form, Button, Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import Layout from '../components/Layout';
import { login } from '../store/actions/action';

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);
    const { authenticating, error } = auth;

    const dispatch = useDispatch();

    const userLogin = (e) => {
        //avoid default behaviour of default
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '250px', paddingLeft: '200px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Row>
                                <Col md={7}>
                                    <FormInput
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={7}>
                                    <FormInput
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row style={{paddingLeft: '80px'}}>
                                <Col>
                                    <Button
                                        variant="primary" 
                                        type="submit"
                                        disabled={
                                            authenticating ||
                                            !email ||
                                            !password
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                            {authenticating &&
                                <Row style={{paddingLeft: '100px'}}>
                                    <Col
                                        className="py-3"
                                    >
                                        <Spinner
                                            variant="primary"
                                            animation="border"
                                        />
                                    </Col>
                                </Row>
                            }
                            {error && !authenticating &&
                                <Row>
                                    <Col className="fs-1 text-danger py-3">
                                        {error.response && error.response.data &&
                                        error.response.data.message 
                                        ?
                                            error.response.data.message
                                        :   "Something wen't wrong. Please retry"
                                        }
                                    </Col>
                                </Row>
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Signin;
