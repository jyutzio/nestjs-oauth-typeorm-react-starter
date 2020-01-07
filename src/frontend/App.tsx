import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/common/PrivateRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { PrivatePage } from './components/PrivatePage';
import { NotFoundPage } from './components/NotFoundPage';
import { AuthButton } from './components/common/AuthButton';
import { useProfile } from './hooks/useProfile';

function App(): ReactElement {
  const [user, userIsLoading] = useProfile();

  if (userIsLoading) {
    return <div>Loading</div>;
  }

  return (
    <Router>
      <AuthButton user={user} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute
          user={user}
          exact
          path="/private"
          component={PrivatePage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
