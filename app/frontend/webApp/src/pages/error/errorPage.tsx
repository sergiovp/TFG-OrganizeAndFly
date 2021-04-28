import { Container, Row, Col, Button} from 'react-bootstrap';
import Footer from '../../components/footer/Footer';
import errorImg from '../../public/images/404_1.jpg';
import { useSelector, RootStateOrAny } from 'react-redux';
import './styles.css';
import NavAuth from '../../components/navAuth/NavAuth';
import NavNotAuth from '../../components/navNotAuth/NavNotAuth';

const COMP_NAME = 'error';

export default function ErrorPage() {
    const isLogged = useSelector((state: RootStateOrAny) => state.session.isLogged);

    return (
        <>
            {isLogged ? <NavAuth /> : <NavNotAuth />}
            <Container>
                <Row className={`${COMP_NAME}__main-container`}>
                    <Col md="6" sm="12" className={`${COMP_NAME}__img-container`}>
                        <img src={errorImg} alt="error"/>
                    </Col>
                    <Col md="6" sm="12" className={`${COMP_NAME}__text-container`}>
                        <h1>Page not found.</h1>
                        <h3>This is not the web page you are loking for.</h3>
                        <div className={`${COMP_NAME}__anchor-container`}>
                            { 
                                isLogged 
                                ? <a href="/home">Take me back.</a>
                                : <a href="/">Take me back.</a>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
