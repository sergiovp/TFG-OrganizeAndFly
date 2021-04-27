import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

export default function UnAuthenticatedRoute({component: Component, path}: RouteProps) {
    const isLogged = useSelector((state: RootStateOrAny) => state.session.isLogged);

    return isLogged ? <Redirect to='/home' /> : <Route component={Component} path={path} />;
}
