import React from "react";
import { Route, Redirect } from "react-router-dom";

const OnlyNoAuthRoute = ({ component: Component, authed, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            
            {
                console.log(authed)
                return authed ? <Component {...props} /> : <Redirect to="/" />
            }
        }
    />
);

export default OnlyNoAuthRoute;
