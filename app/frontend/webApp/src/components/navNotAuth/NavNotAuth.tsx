import react from 'react';
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import logo from '../../public/images/logo.png';
import './styles.css';

const COMP_NAME = 'NavNotAuth';

export default function NavNotAuth() {
    let history = useHistory();

    function handleSignUpClick() {
        history.push('/signup');
    }

    function handleLogInClick() {
        history.push('/login');
    }

    return (
        <div className={`${COMP_NAME}__main-container`}>
            <Row>
            <Navbar bg="light" fixed="top" expand="lg" className={`${COMP_NAME}__nav-container`}>
                <Navbar.Brand href="/"><img className={`${COMP_NAME}__nav-logo`} src={logo} alt="Logo"/></Navbar.Brand>
                <Navbar.Brand className={`${COMP_NAME}__nav-tittle`} href="/">Organize&amp;Fly</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Row>
                        <Col><Button variant="outlined" color="primary" onClick={handleLogInClick}>LogIn</Button></Col>
                        <Col><Button variant="outlined" onClick={handleSignUpClick}>SignUp</Button></Col>
                    </Row>
                </Navbar.Collapse>
            </Navbar>
            </Row>
        </div>
    );
}
