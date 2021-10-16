import { useState } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';

import DefaultModal from '../../components/defaultModal/DefaultModal';

import group from '../../public/images/group.png';
import shared from '../../public/images/shared.png'
import personal from '../../public/images/personal.png'

import './style.css';

const COMP_NAME = 'HomeAuth';

enum Component {
    'BOARD' = 'board',
    'TEAM' = 'team'
};

export default function HomeAuthPage() {
    const [showBoardModal, setShowBoardModal] = useState<boolean>(false);
    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

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
                    />
                </Row>
                <Row className={`${COMP_NAME}__row-container`}>
                    <p><img src={shared} alt="icon"/>Shared Boards</p>
                </Row>
                <Row className={`${COMP_NAME}__row-container`}>
                    <p><img src={group} alt="icon"/>Teams</p>
                </Row>
                <Row className={`${COMP_NAME}__row-dynamic`}>
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
                    />
                </Row>
            </Col>
        </Container>
    );
}
