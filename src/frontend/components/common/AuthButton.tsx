import React, { ReactElement } from 'react';
import { User } from '../../../backend/users/users.entity';

interface Props {
  user: User | null;
}

export function AuthButton({ user }: Props): ReactElement {
  if (user) {
    return (
      <div>
        Logged in as {user.username}.
        <a href="http://localhost:3000/auth/logout">Logout</a>
      </div>
    );
  }
  return <a href="/login">Login</a>;
}
