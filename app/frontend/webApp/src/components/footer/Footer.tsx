import { Link } from 'react-router-dom';
import { Container, Col, Row} from 'react-bootstrap';
import './styles.css';
const { SocialIcon } = require('react-social-icons');

const COMP_NAME = 'Footer';

export default function Footer() {
    return (
        <div className={`${COMP_NAME}__main-container`}>
            <Container className={`${COMP_NAME}__info-container`}>
                <Row>
                    <Col sm="12" md="5">
                        <h6>About</h6>
                        <p className={`${COMP_NAME}__info-text`}>
                            Final thesis in computer engineering at University of Granada.
                            Organize&amp;Fly is an open source web and mobile app for organising and planning
                            made with love by his author.
                        </p>
                        <p className={`${COMP_NAME}__thanks-text`}>Special thanks to everyone who has supported me. <a href="/thanks">❤</a></p>
                    </Col>
                    <Col sm="12" md="3">
                    </Col>
                    <Col sm="12" md="4">
                        <h6>Quick Links</h6>
                        <ul className={`${COMP_NAME}__links`}>
                            <li><Link to="/legaltexts">Terms of Usage</Link></li>
                            <li><Link to="/legaltexts">Privacy Policy</Link></li>
                            <li><Link to="/legaltexts">Cookies Policy</Link></li>
                            <li>Icons downloaded from <a target="_blank" href="https://www.flaticon.es">flaticon</a></li>
                        </ul>
                    </Col>
                </Row>
                <hr></hr>
            </Container>

            <Container className={`${COMP_NAME}__copyright-container`}>
                <Row>
                    <Col md="7">
                        <p className={`${COMP_NAME}__copyright`}>Copyright &copy; 2021 All Rights Reserved by Sergio Vela Pelegrina.</p>
                    </Col>
                    <Col md="5" sm="12">
                        <ul className={`${COMP_NAME}__social-icons`}>
                            <li>
                                <SocialIcon target="_blank" url="https://t.me/sergiovela" network="telegram" />
                            </li>
                            <li>
                                <SocialIcon target="_blank" url="https://www.github.com/sergiovp/" bgColor="#ffff" />
                            </li>
                            <li>
                                <SocialIcon target="_blank" url="https://www.linkedin.com/in/sergio-vela-pelegrina-8015721b4/"/>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
