import React from 'react';
import { Form } from 'react-bootstrap';


const FormInput = (props) => {
    const {
        label, type, placeholder,
        value, onChange, error,
        options, inputType,
    } = props;

    let input = null;
    switch (inputType) {
        case 'select':
            input = <Form.Group>
                        {label && <Form.Label>{label}</Form.Label>}
                        <select
                            className="form-control"
                            value={value}
                            onChange={onChange}
                        >
                            <option value="">{placeholder}</option>
                            {
                                options.length > 0 ?
                                    options.map((option, index) =>
                                        <option key={index} value={option.value}>
                                            {option.name}
                                        </option>
                                    )
                                :   null
                            }
                        </select>
                    </Form.Group>
            break;
        case 'text':
        default: 
            input = <Form.Group>
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
    }

    return input;
}

export default FormInput;