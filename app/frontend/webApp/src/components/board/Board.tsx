import { SyntheticEvent, useEffect, useState } from 'react';
import { getBoard, deleteBoard, setBoard, isBoardTeam, leaveBoard } from '../../requests/boardRequests';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Row, Container, Col, Button, Modal, Form } from 'react-bootstrap';
import { validateEmail } from '../../helpers/helpers';
import { getUserEmail, getParticipantsBoard, insertParticipant } from '../../requests/userRequests';
import DefaultModal from '../../components/defaultModal/DefaultModal';
import { getBoardLists, deleteList, setList } from '../../requests/listRequests';
import Task from '../task/Task';
import './styles.css';
import { DatePicker } from 'react-rainbow-components';
import { addTask } from '../../requests/taskRequests';
import { getListTasks } from '../../requests/taskRequests';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router';

interface Props {
    id: string;
}

function ModalShow({show, handleCloseShowModal, boardID}: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [participants, setParticipants] = useState<any>({});

    useEffect(() => {
        async function getParticipants() {
            const res = await getParticipantsBoard(userInfo.token, boardID);
            setParticipants(res.data);
        }

        getParticipants();
    }, []);

    return (
        <Modal show={show} onHide={handleCloseShowModal}>
            <Modal.Header closeButton>
                <Modal.Title>Board participants</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {participants && participants.length > 1 ? participants.map(({email}: any) => {
                    return <p>{email}</p>
                }) : <p>There are no participants yet</p>}
            </Modal.Body>
        </Modal>
    );
}

function InviteForm({ handleCloseInviteModal, boardID }: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [email, setEmail] = useState<string>('');
    const [showErrMsg, setShowErrMsg] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');
    
    const invalidEmailMsg = 'The entered email is not valid.'
    const invalidUser = 'There is no user with that email asociated.'
    const currentUser = 'You are already part of this board. '

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setShowErrMsg(true);
            setErrMsg(invalidEmailMsg);

            return;
        }

        const existEmail = await getUserEmail(userInfo.token, email);

        if (existEmail.status === 404) {
            setShowErrMsg(true);
            setErrMsg(invalidUser);

            return;
        }

        if (userInfo.email === existEmail.data?.email) {
            setShowErrMsg(true);
            setErrMsg(currentUser);

            return;
        }

        await insertParticipant(userInfo.token, email, boardID);

        window.location.reload();

        handleCloseInviteModal();
    }

    const clearError = () => {
        setShowErrMsg(false);
        setErrMsg('');
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User email</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={'Enter user email'}
                    onChange={ev => {setEmail(ev.target.value); clearError();}} 
                />
                {showErrMsg && (
                    <Form.Text className="text-muted" id="required">
                        {errMsg}
                    </Form.Text>
                )}
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

function ModalInvite({show, handleCloseInviteModal, boardID}: any) {
    return (
        <Modal
            show={show}
            onHide={handleCloseInviteModal}
            backdrop="static"
        >
            <Modal.Header closeButton>
            <Modal.Title>{'Invite a participant'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InviteForm
                    boardID={boardID}
                    handleCloseInviteModal={handleCloseInviteModal}
                />
            </Modal.Body>
        </Modal>
    );
}

function TaskForm({ handleCloseTaskModal, listID, setReloadList }: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [deadLine, setDeadLine] = useState<any>(new Date());
    const [showError, setShowError] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');

    const noTaskNameError = 'Task name input must be entered'

    const clearError = () => {
        setShowError(false);
    }

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        setReloadList(true);

        if (taskName.length === 0) {
            setShowError(true);
            setErrMsg(noTaskNameError);

            return;
        }

        await addTask(taskName, taskDescription, taskPriority, deadLine, listID, userInfo.token);

        setReloadList(false);

        handleCloseTaskModal();
    }


    return (
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task name</Form.Label>
            <Form.Control 
                type="text" 
                placeholder={'Enter task name'}
                onChange={ev => { setTaskName(ev.target.value); clearError(); }} 
            />
            {showError && (
                <p className="error-msg">{errMsg}</p>
            )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task description</Form.Label>
            <Form.Control 
                type="text" 
                placeholder={'Enter task description'}
                onChange={ev => { setTaskDescription(ev.target.value); }} 
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task priority</Form.Label>
            <Form.Control 
                type="text" 
                placeholder={'Enter task priority'}
                onChange={ev => { setTaskPriority(ev.target.value); }} 
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter task deadline</Form.Label>
            <DatePicker
                value={deadLine}
                onChange={(value) => setDeadLine(value)}
                isCentered={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    );
}

function ModalTask({ show, handleCloseTaskModal, listID, boardID, setReloadList }: any) {
    return (
        <Modal
            show={show}
            onHide={handleCloseTaskModal}
            backdrop="static"
            
        >
            <Modal.Header closeButton>
            <Modal.Title>{'Insert a new task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TaskForm
                    listID={listID}
                    handleCloseTaskModal={handleCloseTaskModal}
                    boardID={boardID}
                    setReloadList={setReloadList}
                />
            </Modal.Body>
        </Modal>
    );
}

function ModalEditList({ show, handleCloseEditListModal, listID, listName, listDescription, setReloadList }: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const savedName = listName;
    const savedDescription = listDescription;

    const onSubmit = async () => {
        const hola = await setList(userInfo.token, listID, name || listName, description || listDescription);
        window.location.reload();
    };

    const deleteActualList = async () => {
        setReloadList(true);
        await deleteList(userInfo.token, listID);
        setReloadList(false);
        handleCloseEditListModal();
        window.location.reload();
        return false;
    }

    return (
        <Modal
            show={show}
            onHide={handleCloseEditListModal}
            backdrop="static"
            
        >
            <Modal.Header closeButton>
            <Modal.Title>{'Edit the list'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>List name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={savedName.toUpperCase()}
                            onChange={ev => { setName(ev.target.value); }} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>List description</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={savedDescription}
                            onChange={ev => { setDescription(ev.target.value); }} 
                        />
                    </Form.Group>
                    <div className="buttons">
                        <Button variant="primary" onClick={onSubmit}>
                            Submit
                        </Button>
                        <Button
                            variant="danger"
                            onClick={deleteActualList}
                        >
                            Delete list
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

function List({ listName, listDescription, key, listID, boardID}: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
    const [tasks, setTasks] = useState<any>({});
    const [reloadList, setReloadList] = useState<boolean>(false);
    const [showEditListModal, setShowEditModal] = useState<boolean>(false);

    useEffect(() => {
        async function getTasks() {
            const response = await getListTasks(userInfo.token, listID);
            setTasks(response.data);
        }

        getTasks();
    }, [reloadList]);

    const handleTask = () => {
        setShowTaskModal(true);
    }

    const handleCloseTaskModal = () => {
        setShowTaskModal(false);
    }

    
    const handleOpenEditListModal = () => {
        setShowEditModal(true);
    }
    
    const handleCloseEditListModal = () => {
        setShowEditModal(false);
    }
    
    return (
            <Col lg={4} md={6} sm={12} key={key} className={'list-col'}>
                <div className={'edit-title'}>
                <h3 className={'list-name'}>{listName.toUpperCase()}</h3>
                    <IconButton color="primary" onClick={handleOpenEditListModal}>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                <ModalEditList 
                    show={showEditListModal}
                    handleCloseEditListModal={handleCloseEditListModal}
                    listID={listID}
                    listName={listName}
                    listDescription={listDescription}
                    setReloadList={setReloadList}
                />
                <h5>{listDescription}</h5>
                {tasks && tasks.length > 0 && tasks.map(({ task_name, task_description, task_priority, deadline, task_id }: any): any => {
                    return (
                        <Task
                            key={task_id}
                            taskName={task_name}
                            taskDescription={task_description}
                            taskPriority={task_priority}
                            deadLine={deadline}
                            taskID={task_id}
                            boardID={boardID}
                            listName={listName}
                            listID={listID}
                        />
                    );
                })}
                <Button
                    className={'btn-task'}
                    onClick={handleTask}
                >
                    Add new task
                </Button>
                <ModalTask
                    show={showTaskModal}
                    handleCloseTaskModal={handleCloseTaskModal}
                    listID={listID}
                    boardID={boardID}
                    setReloadList={setReloadList}
                />
            </Col>

    );
}

function EditBoardModal({ show, boardID, boardName, boardDescription, handleCloseModifyBoard, setReload }: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);
    let history = useHistory();

    const savedName = boardName;
    const savedDescription = boardDescription;
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');    

    const onSubmit = async () => {
        setReload(true);
        await setBoard(userInfo.token, boardID, name || savedName, description || savedDescription || '');
        setReload(false);
        handleCloseModifyBoard();
    }

    return (
        <Modal show={show} onHide={handleCloseModifyBoard}>
        <Modal.Header closeButton>
          <Modal.Title>Edit '{boardName}' board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Board name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={savedName.toUpperCase()}
                    onChange={ev => { setName(ev.target.value); }} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Board description</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={savedDescription}
                    onChange={ev => { setDescription(ev.target.value); }} 
                />
            </Form.Group>
            <Button variant="primary" onClick={onSubmit}>
                Submit
            </Button>
        </Form>
        </Modal.Body>
      </Modal>
    );
}

export default function Board(props: Props) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);
    let history = useHistory();

    const [showInvitedModal, setShowInviteModal] = useState<boolean>(false);
    const [showShowModal, setShowShowModal] = useState<boolean>(false);
    const [showListModal, setShowListModal] = useState<boolean>(false);
    const [lists, setLists] = useState<Array<any>>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [boardInfo, setBoardInfo] = useState<any>('');
    const [showModifyBoard, setShowModifyBoard] = useState<boolean>(false);
    const [isBoardOfTeam, setIsBoardOfTeam] = useState<boolean>(false);

    useEffect(() => {
        async function getBoardInfo(boardID: string) {
            const response = await getBoard(userInfo.token, boardID);
            setBoardInfo(response.data);
        }

        async function getLists(boardID: string) {
            const response = await getBoardLists(userInfo.token, boardID);
            setLists(response.data);
        }

        async function isBoardOfATeam() {
            const response = await isBoardTeam(userInfo.token, props.id);
            setIsBoardOfTeam(response.data);
        }

        getLists(props.id);
        getBoardInfo(props.id);
        isBoardOfATeam();
    }, [reload])

    const handleOnClickInvite = () => {
        setShowInviteModal(true);
    };

    const handleOnclickShow = () => {
        setShowShowModal(true);
    };

    const handleCloseInviteModal = () => {
        setShowInviteModal(false);
    }

    const handleCloseShowModal = () => {
        setShowShowModal(false);
    }

    const handleOnclickList = () => {
        setShowListModal(true);
    }

    const handleCloseListModal = () => {
        setShowListModal(false);
    }

    const deleteActualBoard = async () => {
        await deleteBoard(userInfo.token, props.id);

        history.push('/home');
    }

    const leaveActualBoard = async () => {
        await leaveBoard(userInfo.token, userInfo.id, props.id);

        history.push('/home');
    }

    const handleShowModifyBoard = () => {
        setShowModifyBoard(true);
    }

    const handleCloseModifyBoard = () => {
        setShowModifyBoard(false);
    }
    
    return (
        <Container className='board-container'>
            <Row className='name-row'>
               <Col>
                    <h1>{boardInfo.board_name}</h1>
                </Col>
            </Row>
            <Row className='description-row'>
                <Col>
                    <h5>{boardInfo.board_description}</h5>
                    {!isBoardOfTeam && (
                        <>
                            <Button
                                className="list-btn"
                                variant="outline-success" 
                                onClick={handleOnClickInvite}
                            >
                                Invite participant
                            </Button>
                            <Button
                                className="list-btn"
                                variant="outline-info" 
                                onClick={handleOnclickShow}
                                >
                                Show participants
                            </Button>
                        </>
                    )}
                    <ModalInvite 
                        show={showInvitedModal}
                        handleCloseInviteModal={handleCloseInviteModal}
                        boardID={props.id}
                    />
                     <ModalShow 
                        show={showShowModal}
                        handleCloseShowModal={handleCloseShowModal}
                        boardID={props.id}
                    />
                    <Button
                        variant="outline-primary"
                        onClick={handleShowModifyBoard}
                    >
                        Modify board
                    </Button>
                    <EditBoardModal 
                        show={showModifyBoard}
                        boardID={props.id}
                        boardName={boardInfo ? boardInfo.board_name : ''}
                        boardDescription={boardInfo ? boardInfo.board_description : ''}
                        handleCloseModifyBoard={handleCloseModifyBoard}
                        setReload={setReload}
                    />
                    <Button
                        variant="outline-danger"
                        onClick={deleteActualBoard}
                    >
                        Delete board
                    </Button>
                    {!isBoardOfTeam && (
                        <Button
                            variant="outline-dark"
                            onClick={leaveActualBoard}
                        >
                            Leave board
                        </Button>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="list-btn"
                        variant="primary" 
                        onClick={handleOnclickList}
                    >
                        Add new list
                    </Button>
                    <DefaultModal 
                        show={showListModal}
                        setShow={setShowListModal}
                        handleClose={handleCloseListModal}
                        modalTitle={'Add new list'}
                        namePlaceholder={'Enter list name'}
                        descriptionPlayholder={'Enter list description'}
                        component={'list'}
                        setReload={setReload}
                        boardId={props.id}
                    />
                </Col>
            </Row>
            <Row className={'list-row'}>
                {lists && lists.map(({ list_name, list_description, list_id }): any => {
                    return (
                        <List
                            key={list_id}
                            listName={list_name}
                            listDescription={list_description}
                            listID={list_id}
                            boardID={props.id}
                        />
                    );
                })}
            </Row>
        </Container>
    );
}
