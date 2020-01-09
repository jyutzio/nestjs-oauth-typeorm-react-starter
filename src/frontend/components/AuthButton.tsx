import React, { ReactElement } from 'react';
import { UserDto } from '../../backend/users/users.entity';

interface Props {
  user: UserDto | null;
}

export function AuthButton({ user }: Props): ReactElement {
  if (user) {
    return (
      <div className="auth">
        Logged in as {user.username}.
        <a href="http://localhost:3000/auth/logout">Logout</a>
      </div>
    );
  }
  return (
    <div className="auth">
      <a href="/login">Login</a>
    </div>
  );
}
