import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider } from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

export const App = ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route exact path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}