import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, NotFound, Private } from './pages';
import { PrivateRoute, AuthButton } from './components';
import { useProfile } from './hooks';
import './App.css';

function App(): ReactElement {
  const [user, userIsLoading] = useProfile();

  if (userIsLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
      <h1>nestjs-typeorm-react-starter</h1>
      <Router>
        <AuthButton user={user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute user={user} exact path="/private" component={Private} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
