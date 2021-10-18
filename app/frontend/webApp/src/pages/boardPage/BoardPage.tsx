import Footer from '../../components/footer/Footer';
import NavAuth from '../../components/navAuth/NavAuth';
import Board from '../../components/board/Board';

export default function BoardPage({match}: any) {
    return (
        <>
            <NavAuth />
            <Board id={match.params.id} />
            <Footer />
        </>
    );
}
