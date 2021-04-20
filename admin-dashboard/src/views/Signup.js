import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container, Row, Col,
    Form, Button, Spinner,
} from 'react-bootstrap';
import Layout from '../components/Layout';
import FormInput from '../components/common/FormInput';
import { signup } from '../store/actions/action';


const Signup = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const { loading, error, message } = user;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.loading) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        }
    }, [user.loading]);

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password,
        }
        dispatch(signup(user));
    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '200px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormInput
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormInput
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="py-3">
                                <Col style={{ paddingLeft: '245px' }}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={
                                            loading ||
                                            !firstName ||
                                            !lastName ||
                                            !email ||
                                            !password
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                            {loading &&
                                <Row style={{ paddingLeft: '255px' }}>
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
                            {error && !loading &&
                                <Row style={{ paddingLeft: '170px' }}>
                                    <Col className="fs-1 text-danger py-3">
                                        {message
                                            ?
                                            message
                                            :
                                            error.response && error.response.data &&
                                                error.response.data.message
                                                ?
                                                error.response.data.message
                                                :
                                                "Something wen't wrong. Please retry"
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

export default Signup;
