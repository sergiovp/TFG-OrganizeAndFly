import React, { SyntheticEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import './styles.css';

// Check if name inputs is empty.
const correctInput = (name: string) => {
    return name.length > 0;
};

interface Props {
    namePlaceholder: string;
    descriptionPlaceholder: string;
    component: any
}

// Form component that includes name and description inputs.
export default function NameDescriptionForm(props: Props) {
    const [name, setName] = useState<string>('');
    const [errMsg, setErrMsg] = useState<boolean>(false);

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!correctInput(name)) {
            setErrMsg(true);
            
            return false;
        }
        if (props.component === 'board') {
            console.log('BOARD');
        }
        else if (props.component === 'team') {
            console.log('TEAM');
        }
    }

    const clearError = () => {
        setErrMsg(false);
    }

    return (
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                type="text" 
                placeholder={props.namePlaceholder}
                onChange={ev => {setName(ev.target.value); clearError();}} />
                {errMsg && (
                    <Form.Text className="text-muted" id="required">
                        This input is required.
                    </Form.Text>
                )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder={props.descriptionPlaceholder} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    )
};
