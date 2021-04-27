import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import logo from '../../public/images/logo.png';
import notificationOn from '../../public/images/notificationOn.png';
import profile from '../../public/images/profile.png';
import settins from '../../public/images/settins.png';
import { useHistory } from "react-router-dom";
import { logOut } from '../../requests/userRequests';
import './styles.css';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { deleteUserAction } from '../../redux/sessionDucks';
import { parseEmail } from '../../helpers/helpers';

const COMP_NAME = 'NavAuth';

interface Props {
    userEmail: string,
}

export default function NavAuth() {
    const dispatch = useDispatch();
    let history = useHistory();
    
    async function handleSignOutClick() {
        dispatch(deleteUserAction());
        logOut();
        history.push('/');
    }

    const email = parseEmail(useSelector((state: RootStateOrAny) => state.session.email));

    return (
        <Navbar bg="light" expand="lg" className={`${COMP_NAME}__nav-container`}>
            <Navbar.Brand href="/home"><img className={`${COMP_NAME}__nav-logo`} src={logo} alt="Logo"/></Navbar.Brand>
            <Navbar.Brand className={`${COMP_NAME}__nav-tittle`} href="/home">Organize&amp;Go</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className={`${COMP_NAME}__nav-message`}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <p id={`${COMP_NAME}__nav-welcome`} className="nav-link active">Welcome <span>{email}</span></p>
                </li>
            </ul>
            </Navbar.Collapse>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Row className={`${COMP_NAME}__nav-items`}>
                    <Navbar.Brand href="/profile"><img src={profile} alt="profile icon"/></Navbar.Brand>
                    <Navbar.Brand href="/"><img src={notificationOn} alt="notification icon"/></Navbar.Brand>
                    <Navbar.Brand href="/"><img src={settins} alt="Logo"/></Navbar.Brand>
                    <Col><Button variant="outlined" color="secondary" onClick={handleSignOutClick}>SignOut</Button></Col>
                </Row>
            </Navbar.Collapse>
        </Navbar>
    );
}
