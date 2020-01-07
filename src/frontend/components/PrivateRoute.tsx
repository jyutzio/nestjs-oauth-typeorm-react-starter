import React, { ReactElement } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { User } from '../../backend/users/users.entity';

interface Props extends RouteProps {
  user: User | null;
}

export function PrivateRoute({ user, ...rest }: Props): ReactElement {
  if (user) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...rest} />;
  }
  return <Redirect to="/login" />;
}
