import { SyntheticEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector, RootStateOrAny } from 'react-redux';
import { addBoard, addBoardTeam } from '../../requests/boardRequests';
import { addTeam } from '../../requests/teamRequests';
import { addList } from '../../requests/listRequests';

import './styles.css';

// Check if name inputs is empty.
const correctInput = (name: string) => {
    return name.length > 0;
};

interface Props {
    namePlaceholder: string;
    descriptionPlaceholder: string;
    component: any
    setShow: any
    setReload: any
    boardId?: string
    teamID?: string
}

// Form component that includes name and description inputs.
export default function NameDescriptionForm(props: Props) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errMsg, setErrMsg] = useState<boolean>(false);

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (!correctInput(name)) {
            setErrMsg(true);
            
            return false;
        }

        props.setReload(true);

        if (props.component === 'board') {
            props.setShow(false);

            await addBoard(name, description, userInfo.token, userInfo.id);
        }
        else if (props.component === 'team') {
            props.setShow(false);

            await addTeam(name, description, userInfo.token, userInfo.id);
        }
        else if (props.component === 'list') {
            props.setShow(false);

           await addList(name, description, props.boardId || '', userInfo.token);
        }
        else if (props.component === 'boardTeam') {
            if (props.teamID) {
                props.setShow(false);
                await addBoardTeam(name, description, userInfo.token, props.teamID, userInfo.id);
            }
        }

        props.setReload(false);
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
            <Form.Control
                type="text"
                placeholder={props.descriptionPlaceholder} 
                onChange={ev => setDescription(ev.target.value)}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    )
};
