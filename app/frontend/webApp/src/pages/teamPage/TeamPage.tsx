import Footer from '../../components/footer/Footer';
import NavAuth from '../../components/navAuth/NavAuth';
import Team from '../../components/team/Team';

export default function TeamPage({match}: any) {
    return (
        <>
            <NavAuth />
            <Team id={match.params.id} />
            <Footer />
        </>
    );
}
