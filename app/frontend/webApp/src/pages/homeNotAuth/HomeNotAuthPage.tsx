import NavNotAuth from '../../components/navNotAuth/NavNotAuth';
import Footer from '../../components/footer/Footer';
import HomeNotAuthMainContent from '../../components/homeNotAuthMainContet/HomeNotAuthMainContent';

export default function HomeNotAuthPage() {
    return (
        <>
            <NavNotAuth />
            <HomeNotAuthMainContent />
            <Footer />
        </>
    );
}
