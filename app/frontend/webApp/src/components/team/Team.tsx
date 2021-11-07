import { SyntheticEvent, useEffect, useState } from 'react';
import { getTeam, getTeamParticipantsBoard, setTeam, deleteTeam, leaveTeam } from '../../requests/teamRequests';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Row, Container, Col, Button, Modal, Form } from 'react-bootstrap';
import './styles.css';
import '../../pages/homeAuth/style.css';
import DefaultModal from '../defaultModal/DefaultModal';
import { GetCard } from '../../pages/homeAuth/HomeAuth';
import { getTeamBoards } from '../../requests/boardRequests';
import { validateEmail } from '../../helpers/helpers';
import { getUserEmail, insertTeamParticipant } from '../../requests/userRequests';
import { useHistory } from 'react-router';

interface Props {
    id: string;
}

const COMP_NAME = 'HomeAuth';

function EditTeamModal({ show, teamID, teamName, teamDescription, handleCloseModifyTeam, setReload }: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const savedName = teamName;
    const savedDescription = teamDescription;
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');    

    const onSubmit = async () => {
        setReload(true);
        await setTeam(userInfo.token, teamID, name || savedName, description || savedDescription || '');
        setReload(false);
        handleCloseModifyTeam();
    }

    return (
        <Modal show={show} onHide={handleCloseModifyTeam}>
        <Modal.Header closeButton>
          <Modal.Title>Edit '{teamName}' board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Team name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={savedName.toUpperCase()}
                    onChange={ev => { setName(ev.target.value); }} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Team description</Form.Label>
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

function InviteForm({ handleCloseInviteModal, teamID }: any) {
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

        await insertTeamParticipant(userInfo.token, email, teamID);

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

function ModalInvite({show, handleCloseInviteModal, teamID}: any) {
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
                    teamID={teamID}
                    handleCloseInviteModal={handleCloseInviteModal}
                />
            </Modal.Body>
        </Modal>
    );
}

function ModalShow({show, handleCloseShowModal, teamID}: any) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [participants, setParticipants] = useState<any>({});

    useEffect(() => {
        async function getTeamParticipants() {
            const res = await getTeamParticipantsBoard(userInfo.token, teamID);
            setParticipants(res.data);
        }

        getTeamParticipants();
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

export default function Team(props: Props) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);
    let history = useHistory();

    const teamID = props.id;

    const [teamInfo, setTeamInfo] = useState<any>('');
    const [teamBoards, setTeamBoards] = useState<any>({});
    const [showBoardModal, setShowBoardModal] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [showInvitedModal, setShowInviteModal] = useState<boolean>(false);
    const [showShowModal, setShowShowModal] = useState<boolean>(false);
    const [showModifyTeam, setShowModifyTeam] = useState<boolean>(false);

    useEffect(() => {
        async function getTeamInfo() {
            const response = await getTeam(userInfo.token, teamID);
            setTeamInfo(response.data);
        }

        // Get teamBoards
        async function getBoards() {
            const response = await getTeamBoards(userInfo.token, teamID);
            setTeamBoards(response.data);
        }

        getTeamInfo();
        getBoards();
    }, [reload])

    const handleOnClickBoard = () => {
        setShowBoardModal(true);
    }

    const handleCloseBoardModal = () => {
        setShowBoardModal(false);
    }

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

    const handleShowModifyTeam = () => {
        setShowModifyTeam(true);
    }

    const handleCloseModifyTeam = () => {
        setShowModifyTeam(false);
    }

    const deleteActualTeam = async () => {
        await deleteTeam(userInfo.token, teamID);

        history.push('/home');
    }

    const leaveActualTeam = async () => {
        await leaveTeam(userInfo.token, userInfo.id, teamID);

        history.push('/home');
    }
    
    return (
        <Container className='board-container'>
            <Row className='name-row'>
                <h1>{teamInfo.team_name}</h1>
            </Row>
            <Row className='description-row'>
                <h5>{teamInfo.team_description}</h5>
            </Row>
            <Button
                id={'btn'}
                variant="outline-success" 
                onClick={handleOnClickInvite}
            >
                Invite participant
            </Button>
            <Button
                id={'btn'}
                variant="outline-info" 
                onClick={handleOnclickShow}
                >
                Show participants
            </Button>
            <Button
                id={'btn'}
                variant="outline-primary"
                onClick={handleShowModifyTeam}
            >
                Modify team
            </Button>
            <Button
                id={'btn'}
                variant="outline-danger"
                onClick={deleteActualTeam}
            >
                Delete team
            </Button>
            <Button
                id={'btn'}
                variant="outline-dark"
                onClick={leaveActualTeam}
            >
                Leave team
            </Button>
            <ModalInvite 
                show={showInvitedModal}
                handleCloseInviteModal={handleCloseInviteModal}
                teamID={teamID}
            />
            <ModalShow 
                show={showShowModal}
                handleCloseShowModal={handleCloseShowModal}
                teamID={teamID}
            />
            <EditTeamModal
                show={showModifyTeam}
                teamID={teamID}
                teamName={teamInfo ? teamInfo.team_name : ''}
                teamDescription={teamInfo ? teamInfo.team_description : ''}
                handleCloseModifyTeam={handleCloseModifyTeam}
                setReload={setReload}
            />
            <Row className={`${COMP_NAME}__row-container`}>
                <p>Team Boards</p>
            </Row>
            <Row>
                { teamBoards && teamBoards.length > 0 && teamBoards.map(({ board_name, board_description, board_id }: any) => {
                    return (
                        <GetCard
                            name={board_name}
                            description={board_description}
                            id={board_id}
                            isBoard={true}
                        />
                    )
                })}
                <Col>
                    <Button
                        className="list-btn"
                        variant="primary" 
                        onClick={handleOnClickBoard}
                    >
                        Add new board
                    </Button>
                    <DefaultModal 
                        show={showBoardModal}
                        setShow={setShowBoardModal}
                        handleClose={handleCloseBoardModal}
                        modalTitle={'Add new board'}
                        namePlaceholder={'Enter board name'}
                        descriptionPlayholder={'Enter board description'}
                        component={'boardTeam'}
                        setReload={setReload}
                        teamID={teamID}
                    />
                </Col>
            </Row>
        </Container>
    );
}
