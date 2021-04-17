import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container, Row, Col,Form, Button, 
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

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    if(user.loading){
        return (
            <p>Loading...</p>
        );
    }
    return(
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
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

export default Signup;