import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

import Header from './components/Header';
import Progress from './components/Progress';

const ProfileLazy = lazy(() => import('./components/Profile'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default () => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn])

  window.addEventListener('userLogin', (event) => {
    setUser(event.detail.message.email)
  });
  return (
    <Router history={history}>
      <div>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
          user={user}
        />
        <Suspense fallback={<Progress />}>
          <Switch>

            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>

            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>
            
            <Route path="/perfil">
              {!isSignedIn && <Redirect to="/" />}
              <ProfileLazy user={user} />
            </Route>

            <Route path="/" component={MarketingLazy} />
          </Switch>
          {/* <div id="wc"></div> */}
        </Suspense>
      </div>
    </Router>
  )
}
