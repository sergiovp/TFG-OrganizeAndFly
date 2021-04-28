import Footer from '../../components/footer/Footer';
import NavAuth from '../../components/navAuth/NavAuth';
import NavNotAuth from '../../components/navNotAuth/NavNotAuth';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css';
import development from '../../public/images/underDevelopment.jpg'

const COMP_NAME = 'LegalTexts';

export default function LegalTexts() {
    const isLogged = useSelector((state: RootStateOrAny) => state.session.isLogged);

    return (
        <>
            {isLogged ? <NavAuth /> : <NavNotAuth />}
            <Container>
                <Row className={`${COMP_NAME}__main-container`}>
                    <Col md="6" sm="12" className={`${COMP_NAME}__img-container`}>
                        <img src={development} alt="development"/>
                    </Col>
                    <Col md="6" sm="12" className={`${COMP_NAME}__text-container`}>
                        <h1>This site is under development.</h1>
                        <h3>
                            This means Terms of usage,
                            privacy policy and cookies policy
                            will be written later on.
                        </h3>
                    </Col>
                </Row>
            </Container>      
            <Footer />
        </>
    );
}
