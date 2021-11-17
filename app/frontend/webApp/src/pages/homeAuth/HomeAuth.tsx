import { useEffect, useState } from 'react';
import { Row, Container, Col, Button, Card } from 'react-bootstrap';
import { useSelector, RootStateOrAny } from 'react-redux';

import DefaultModal from '../../components/defaultModal/DefaultModal';

import group from '../../public/images/group.png';
import personal from '../../public/images/personal.png'

import './style.css';
import { getUserTeams } from '../../requests/teamRequests';
import { getUserBoards } from '../../requests/boardRequests';

const COMP_NAME = 'HomeAuth';

enum Component {
    'BOARD' = 'board',
    'TEAM' = 'team'
};

export function GetCard({name, description, id, isBoard}: any) {
    return (
        <Card
            className="full-card text-center"
            style={{ width: '18rem' }}
            border="secondary"
            key={name}
        >
            <Card.Header as="h5">{name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Link href={isBoard ? '/board/' + id : '/team/' + id}>Go to "{name}"</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default function HomeAuthPage() {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [showBoardModal, setShowBoardModal] = useState<boolean>(false);
    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
    const [teams, setTeams] = useState<Array<any>>([]);
    const [boards, setBoards] = useState<Array<any>>([]);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        async function getTeams() {
            const response = await getUserTeams(userInfo.token, userInfo.id);
            setTeams(response.data);
        }

        async function getBoards() {
            const response = await getUserBoards(userInfo.token, userInfo.id);
            setBoards(response.data);
        }

        getTeams();
        getBoards();
    }, [reload]);

    const handleOnClickBoard = () => {
        setShowBoardModal(true);
    };

    const handleOnclickTeam = () => {
        setShowTeamModal(true);
    };

    const handleCloseBoardModal = () => {
        setShowBoardModal(false);
    }

    const handleCloseTeamModal = () => {
        setShowTeamModal(false);
    }

    return (
        <Container className={`${COMP_NAME}__main-container`}>
            <Col>
                <Row className={`${COMP_NAME}__row-container`}>
                    <p><img src={personal} alt="icon"/>Personal Boards</p>
                </Row>
                <Row className={`${COMP_NAME}__row-dynamic`}>
                { boards && boards.map(({ board_name, board_description, board_id }) => {
                    return (
                        <GetCard
                            name={board_name}
                            description={board_description}
                            id={board_id}
                            isBoard={true}
                        />
                    )
                })}
                    <Button
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
                        component={Component.BOARD}
                        setReload={setReload}
                    />
                </Row>
                <Row className={`${COMP_NAME}__row-container`}>
                    <p><img src={group} alt="icon"/>Teams</p>
                </Row>
                <Row className={`${COMP_NAME}__row-dynamic`}>
                    { teams && teams.map(({ team_name, team_description, team_id }) => {
                        return (
                            <GetCard
                                name={team_name}
                                description={team_description}
                                id={team_id}
                                isBoard={false}
                            />
                        )
                    })}
                    <Button
                        variant="primary"
                        onClick={handleOnclickTeam}
                    >
                        Add new team
                    </Button>
                    <DefaultModal 
                        show={showTeamModal}
                        setShow={setShowTeamModal}
                        handleClose={handleCloseTeamModal}
                        modalTitle={'Add new team'}
                        namePlaceholder={'Enter team name'}
                        descriptionPlayholder={'Enter team description'}
                        component={Component.TEAM}
                        setReload={setReload}
                    />
                </Row>
            </Col>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Container>
    );
}
