import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { User } from '../backend/users/users.entity';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<null | User>(null);
  React.useEffect(() => {
    fetch('http://localhost:3000/profile', {
      mode: 'cors',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then(json => setIsLoggedIn(json));
  }, []);

  const logoutButton = <a href="http://localhost:3000/auth/logout">Logout</a>;
  const info = isLoggedIn ? (
    <div>
      Logged in as {isLoggedIn.username} {logoutButton}
    </div>
  ) : (
    <a href="/login">Login</a>
  );
  return (
    <Router>
      {info}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
