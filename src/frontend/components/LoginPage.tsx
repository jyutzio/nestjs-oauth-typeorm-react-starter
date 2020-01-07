import React, { ReactElement } from 'react';

export function LoginPage(): ReactElement {
  return (
    <ul>
      <li>
        <a href="http://localhost:3000/auth/google">Google</a>
      </li>
      <li>
        <a href="http://localhost:3000/auth/github">Github</a>
      </li>
    </ul>
  );
}
