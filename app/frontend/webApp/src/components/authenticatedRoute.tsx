import react from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

export default function AuthenticatedRoute({component: Component, path}: RouteProps) {
    const isLogged = useSelector((state: RootStateOrAny) => state.session.isLogged);

    return isLogged ? <Route component={Component} path={path} /> : <Redirect to='/login' />;

}
