import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = (props) => {
    const {
        show, title, body,
        handleClose, handleSubmit,
        size, buttonName, buttons
    } = props;
    return (
        <Modal size={size} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                {
                    buttons ? buttons.map((btn, index) =>
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ) :
                        <Button variant="primary" onClick={handleSubmit}>
                            {buttonName}
                        </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;