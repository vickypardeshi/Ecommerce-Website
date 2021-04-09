import React from 'react';
import { Form }  from 'react-bootstrap';


const FormInput = (props) => {
    const {
        label, type, placeholder,
        value, onChange, error
    } = props;
    return(
        <Form.Group>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control 
                {...props}
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <Form.Text className="text-muted">
                {error}
            </Form.Text>
        </Form.Group>  
    );
}

export default FormInput;