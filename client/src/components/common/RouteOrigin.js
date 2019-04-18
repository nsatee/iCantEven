import React from "react";
import { Route } from "react-router-dom";

const RouteOrigin = ({ component: Component, currentUser, createPost, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <Component {...props} currentUser={currentUser} createPost={createPost} />
        }
    />
);

export default RouteOrigin;
