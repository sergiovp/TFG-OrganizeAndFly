import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './components/authenticatedRoute';
import UnAuthenticatedRoute from './components/unAuthenticatedRoute';
import HomeNotAuthPage from './pages/homeNotAuth/HomeNotAuthPage';
import MainWrapperPage from './pages/mainWrapper/MainWrapperPage';
import LogInPage from './pages/logIn/LogInPage';
import SignUpPage from './pages/signUp/SignUpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import ProfilePage from './pages/profile/Profile';
import LegalTextsPage from './pages/legalTexts/LegalTexts';
import ErrorPage from './pages/error/errorPage';
import TestPage from './pages/testPage';

function App() {
	const store = generateStore();

	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<UnAuthenticatedRoute exact path={ '/' } component={ HomeNotAuthPage } />
					<UnAuthenticatedRoute exact path={ '/login' } component={ LogInPage } />
					<UnAuthenticatedRoute exact path={ '/signup' } component={ SignUpPage } />

					<AuthenticatedRoute exact path={ '/home' } component={ MainWrapperPage } />
					<AuthenticatedRoute exact path={ '/profile' } component={ ProfilePage } />

					<Route exact path={ '/legaltexts' } component={ LegalTextsPage } />
					<Route path={'*'} component={ ErrorPage } />
				</Switch>
			</Router>
		</Provider>
			
	);
}

export default App;
