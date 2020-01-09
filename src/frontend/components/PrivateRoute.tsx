import React, { ReactElement } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { UserDto } from '../../backend/users/users.entity';

interface Props extends RouteProps {
  user: UserDto | null;
}

export function PrivateRoute({ user, ...rest }: Props): ReactElement {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return user ? <Route {...rest} /> : <Redirect to="/login" />;
}
