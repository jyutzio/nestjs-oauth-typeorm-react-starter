import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, NotFound, Private } from './pages';
import { PrivateRoute, AuthButton } from './components';
import { useProfile } from './hooks';

function App(): ReactElement {
  const [user, userIsLoading] = useProfile();

  if (userIsLoading) {
    return <div>Loading</div>;
  }

  return (
    <Router>
      <AuthButton user={user} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute user={user} exact path="/private" component={Private} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
