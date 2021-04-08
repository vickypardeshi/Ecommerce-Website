import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = (props) => {
    const {
        show, title, body,
        handleClose, handleSubmit
    } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;