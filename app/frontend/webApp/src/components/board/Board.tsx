import { useEffect, useState } from 'react';
import { getBoard } from '../../requests/boardRequests';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Row, Container, Col, Button } from 'react-bootstrap';
import './styles.css';

interface Props {
    id: string;
}

export default function Board(props: Props) {
    // Retrieve the user session information.
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    const [boardInfo, setBoardInfo] = useState<any>('');

    const handleOnClick = () => {
        console.log("Hola");
    }

    useEffect(() => {
        async function getBoardInfo(boardID: string) {
            const response = await getBoard(userInfo.token, boardID);
            setBoardInfo(response.data);
        }

        getBoardInfo(props.id);
    }, [])
    
    return (
        <Container className='board-container'>
            <Row className='name-row'>
                <h1>{boardInfo.board_name}</h1>
            </Row>
            <Row className='description-row'>
                <h5>{boardInfo.board_description}</h5>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="list-btn"
                        variant="primary" 
                        onClick={handleOnClick}
                    >
                        Add new list
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
