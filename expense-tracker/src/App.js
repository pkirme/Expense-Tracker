import { Switch, Route, Redirect } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import WelcomePage from "./pages/WelcomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const authCtx = useContext(AuthContext);
  const isUserLoggedIn = authCtx.isLoggedIn;
  return (
    <Switch>
      {isUserLoggedIn && (
        <Route path="/" exact>
          <WelcomePage />
        </Route>
      )}
      {isUserLoggedIn && (
        <Route path="/profile">
          <ProfilePage />
        </Route>
      )}

      {!isUserLoggedIn && (
        <Route path="/" exact>
          <Login />
        </Route>
      )}

      {!isUserLoggedIn && (
        <Route path="/signup">
          <SignUp />
        </Route>
      )}

      {!isUserLoggedIn && (
        <Route>
          <Redirect to="/" />
        </Route>
      )}
    </Switch>
  );
}

export default App;
