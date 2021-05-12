import { Redirect, Route } from "react-router";
import { useAuth } from "../services/auth";

export function PrivateRoute({ component: Component, ...rest }) {
  let auth = useAuth();

  return (
    <Route {...rest} render={props => (
      auth.isLogin ?
        <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
};