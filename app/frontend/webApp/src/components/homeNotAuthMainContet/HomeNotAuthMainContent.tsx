import { Col, Container, Row } from 'react-bootstrap';
import space from '../../public/images/space.png';
import home from '../../public/images/home.png';
import participant from '../../public/images/participant.png';
import showparticipant from '../../public/images/showparticipants.png';
import lists from '../../public/images/lists.png';
import './styles.css';

const COMP_NAME = 'HomeNotAuthMainContent';

export default function HomeNotAuthMainContent() {
    return (
        <Container className={`${COMP_NAME}__main-container`}>
            <Row className={`${COMP_NAME}__up-container`}>
                <Col md="7" className={`${COMP_NAME}__txt-container`}>
                    <h2>Hi, there!</h2>
                    <h3>Welcome to Organize&amp;Fly</h3>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse 
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                        anim id est laborum."
                    </p>
                </Col>
                <Col md="5" sm="12" className={`${COMP_NAME}__img-container`}>
                    <img src={space} alt="Cohete"/>
                </Col>
            </Row>
            <Row className={'secundario'}>
                <Col md="7" sm="12" className={'col-secundary'}>
                    <img id="home" src={home} alt="Home"/>
                </Col>
                <Col md="5" className={'text-secundary'}>
                    <h2>Hi, there!</h2>
                    <h3>Welcome to Organize&amp;Fly</h3>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse 
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                        anim id est laborum."
                    </p>
                </Col>
            </Row>
            <Row className="images">
                <Col md="4" sm="12">
                    <img src={lists} alt="Home"/>
                </Col>
                <Col md="4" sm="12">
                    <img src={participant} alt="Home"/>
                </Col>
                <Col md="4" sm="12">
                    <img src={showparticipant} alt="Home"/>
                </Col>
            </Row>
        </Container>
    );
}
