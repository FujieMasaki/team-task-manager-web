import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedState } from '../recoil/auth';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
