import { useEffect, useState } from 'react';
import { getTeam } from '../../requests/teamRequests';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Row, Container, Col, Button, Card } from 'react-bootstrap';
import './styles.css';

interface Props {
    id: string;
}

export default function Team(props: Props) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [teamInfo, setTeamInfo] = useState<any>('');

    const handleOnClick = () => {
        console.log("Hola");
    }

    useEffect(() => {
        async function getTeamInfo(teamID: string) {
            const response = await getTeam(userInfo.token, teamID);
            setTeamInfo(response.data);
        }

        getTeamInfo(props.id);
    }, [])
    
    return (
        <Container className='board-container'>
            <Row className='name-row'>
                <h1>{teamInfo.team_name}</h1>
            </Row>
            <Row className='description-row'>
                <h5>{teamInfo.team_description}</h5>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="list-btn"
                        variant="primary" 
                        onClick={handleOnClick}
                    >
                        Add new board
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
