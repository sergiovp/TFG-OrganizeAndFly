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
                    <p id={'main-p'}>
                        In the middle of the technological era, it sounds like a “joke” to imaginehaving to carry an agenda with you 
                        at all times to keep organized and beable to plan your tasks. However, there is an element that almost everyonecarries 
                        with them daily, we refer to the mobile phone.
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
                    <p>
                        Organize&Fly is defined as an organization and planning web application. Not only aimed at individual people,
                        but also for small groups of peopleor even large work teams. From your daily tasks to the work of each personin
                        a company, through to the household chores together with the family, canbe organized with the application.
                    </p>
                    <p>
                        Create tasks and organize them in lists according to their progress. Youcan also create dashboards to keep your
                        tasks even more under control.
                    </p>
                    <p>
                        The best thing about it? It is accessible from any device with internetaccess.
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
