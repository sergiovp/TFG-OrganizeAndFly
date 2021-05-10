import { Row, Container } from 'react-bootstrap';
import group from '../../public/images/group.png';
import shared from '../../public/images/shared.png'
import personal from '../../public/images/personal.png'
import './style.css';

const COMP_NAME = 'HomeAuth';

export default function HomeAuthPage() {
    return (
        <>
            <Container className={`${COMP_NAME}__main-container`}>
                <Row className={`${COMP_NAME}__row-container`}>
                    <p><img src={personal} alt="icon"/>Personal Boards</p>
                </Row>
                <Row className={`${COMP_NAME}__row-container`}>
                    <p><img src={shared} alt="icon"/>Shared Boards</p>
                </Row>
                <Row className={`${COMP_NAME}__row-container`}>
                    <p><img src={group} alt="icon"/>Teams</p>
                </Row>
            </Container>
        </>
    );
}
