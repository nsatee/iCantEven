import React from "react";
import { Route } from "react-router-dom";

const RouteOrigin = ({ component: Component, currentUser, createPost, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <Component {...props} currentUser={currentUser} createPost={createPost} auth={auth} />
        }
    />
);

export default RouteOrigin;
