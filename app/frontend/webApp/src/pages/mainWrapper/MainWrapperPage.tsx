import Footer from '../../components/footer/Footer';
import NavAuth from '../../components/navAuth/NavAuth';
import HomeAuthPage from '../homeAuth/HomeAuth';

export default function MainWrapperPage() {

    return (
        <>
            <NavAuth />
            <HomeAuthPage />
            <Footer />
        </>
    );
}
