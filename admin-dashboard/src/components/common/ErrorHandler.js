import React from 'react';
import {
  Row, Col, Button, Container,
} from 'react-bootstrap';

function ErrorHandler(props) {
  const { retryLogic, onCancel, } = props;
  return (
        <Container className="text-center py-3">
            <Row>
                <Col className="fs-1 text-danger mb-2">
                    {/* {errorMessage} */}
                    Something wen't wrong. Please retry
                </Col>
            </Row>
            <Row>
                <Col>
                <Button
                    onClick={retryLogic}
                    className="mx-2 fs-1 rounded-0"
                >
                        Retry
                </Button>
                {onCancel &&
                    <Button
                        //onClick={retryLogic}
                        className="mx-2 fs-1 rounded-0"
                    >
                        Cancel
                    </Button>
                }
                
                </Col>
            </Row>
        </Container>
  );
}

export default ErrorHandler;
