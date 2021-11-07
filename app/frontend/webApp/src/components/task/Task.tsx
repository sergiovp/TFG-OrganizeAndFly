import { Button, Card, Form, Modal } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './styles.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import { getBoardLists } from '../../requests/listRequests';
import { DatePicker } from 'react-rainbow-components';
import { RootStateOrAny, useSelector } from 'react-redux';
import { setTask, deleteTask } from '../../requests/taskRequests';

const COMP_NAME = 'Task';

interface Props {
    key: string;
    taskName: string;
    taskDescription: string;
    taskPriority: string;
    deadLine: string;
    taskID: string;
    boardID: string;
    listID: string;
    listName: string;
}

function EditTaskForm({
    taskName,
    taskDescription,
    taskPriority,
    taskDeadline,
    boardID,
    listID,
    listName,
    taskID}: any) {
        // Retrieve the user session information.
        const userInfo = useSelector((state: RootStateOrAny) => state.session);

        const savedName = taskName;
        const savedDescription = taskDescription;
        const savedPriority = taskPriority;
        const savedDeadline = taskDeadline;
        const [newName, setNewName] = useState('');
        const [newDescription, setNewDescription] = useState('');
        const [newPriority, setNewPriority] = useState('');
        const [newDeadline, setNewDeadline] = useState(savedDeadline);
        const [lists, setLists] = useState<any>({});
        const [newList, setNewList] = useState<any>({});

        useEffect(() => {
            async function getLists() {
                const response = await getBoardLists(userInfo.token, boardID);
                setLists(response.data);
            }

            getLists();
        }, []);

        const deleteActuaTask = async () => {
            await deleteTask(userInfo.token, taskID);
            window.location.reload();
        }

        const onSubmit = async (event: SyntheticEvent) => {
            event.preventDefault();

            await setTask(
                userInfo.token,
                taskID,
                newName || savedName,
                newDescription || savedDescription,
                newPriority || savedPriority,
                newDeadline || savedDeadline,
                newList && newList.length > 0 ? newList : listID
            );
            window.location.reload();
        }

        return (
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Task name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={savedName}
                    onChange={ev => { setNewName(ev.target.value); }} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Task description</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={savedDescription ? savedDescription : 'Enter task description'}
                    onChange={ev => { setNewDescription(ev.target.value); }} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Task priority</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={savedPriority ? savedPriority : 'Enter task priority'}
                    onChange={ev => { setNewPriority(ev.target.value); }} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter task deadline</Form.Label>
                <DatePicker
                    value={newDeadline}
                    onChange={(value) => setNewDeadline(value)}
                    isCentered={true}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter new list</Form.Label>
                <Form.Control as="select"
                    onChange={ev => {setNewList(ev.target.value)}}
                >
                    <option value={listID}>{listName}</option>
                    {lists.length > 0 && lists.map(({list_name, list_id}: any): any => {
                        return <option value={list_id}>{list_name}</option>
                    })}
                </Form.Control>
            </Form.Group>
            <div className="buttons">
                <Button variant="primary" type="submit">
                        Submit
                </Button>
                <Button
                    variant="danger"
                    onClick={deleteActuaTask}
                >
                    Delete task
                </Button>
            </div>
            </Form>
        )
}

function EditTaskModal(
    {
        show,
        handleClose,
        taskName,
        taskDescription,
        taskPriority,
        taskDeadline,
        boardID,
        listID,
        listName,
        taskID
    }: any) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit your task named "{taskName}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditTaskForm
                        taskName={taskName}
                        taskDescription={taskDescription}
                        taskPriority={taskPriority}
                        taskDeadline={taskDeadline}
                        boardID={boardID}
                        listID={listID}
                        listName={listName}
                        taskID={taskID}
                    />
                </Modal.Body>
            </Modal>
        );
}

export default function Task(props: Props) {
    const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);

    const handleShow = () => setShowEditTaskModal(true);

    const handleClose = () => setShowEditTaskModal(false);

    const date = props.deadLine;

    let parsedDate = '';

    if (date) {
        parsedDate = date.split('T')[0];
    }


    return (
        <Card key={props.key} style={{ width: '18rem' }} className={`${COMP_NAME}__main-card`}>
            <Card.Body className={`${COMP_NAME}__body-card`}>
                <Card.Text className={`${COMP_NAME}__text-card`}>
                    <div className={`${COMP_NAME}__scroll-bar`}>
                        <h4>Task: {props.taskName}</h4>
                        {props.taskDescription ? <h6>Description: {props.taskDescription}</h6> : ''}
                        {props.taskPriority ? <h6>Priority: {props.taskPriority}</h6> : ''}
                        {parsedDate ? <h6>Deadline: {parsedDate}</h6> : ''}
                    </div> 
                </Card.Text>
                <IconButton onClick={handleShow} className={`${COMP_NAME}__more-button`} aria-label="show task details" color="primary">
                    <AddCircleOutlineIcon />
                </IconButton>
                <EditTaskModal 
                    show={showEditTaskModal}
                    handleClose={handleClose}
                    taskName={props.taskName}
                    taskDescription={props.taskDescription}
                    taskPriority={props.taskPriority}
                    taskDeadline={props.deadLine}
                    boardID={props.boardID}
                    listName={props.listName}
                    listID={props.listID}
                    taskID={props.taskID}
                />
            </Card.Body>
        </Card>
    );
}
