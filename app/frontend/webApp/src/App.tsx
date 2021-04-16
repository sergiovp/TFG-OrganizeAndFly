import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeAuthPage from './pages/homeAuth/homeAuth';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path={ '/' } component={ HomeAuthPage } />
			</Switch>
		</Router>
	);
}

export default App;
