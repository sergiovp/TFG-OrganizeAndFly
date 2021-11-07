import Footer from '../../components/footer/Footer';
import NavAuth from '../../components/navAuth/NavAuth';
import HomeAuthPage from '../homeAuth/HomeAuth';

export default function MainWrapperPage() {

    return (
        <div className={'wrapper'}>
            <div className={'internal-wrapper'}>
                <NavAuth />
                <HomeAuthPage />
                <Footer />
            </div>
        </div>
    );
}
