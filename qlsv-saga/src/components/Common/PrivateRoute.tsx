import routes from 'config/routes';
import { useEffect } from 'react';
import { Outlet, RouteProps, useNavigate } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate(`/${routes.login}`);
  }, [localStorage]);

  return <Outlet context={props} />;
}
