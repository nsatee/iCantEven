import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql, Query } from "react-apollo";

import "./components/common/momentFormat";
import { tokenLogin } from "./queries";
import OnlyNoAuthRoute from './components/common/OnlyNoAuthRoute';
import AuthPage from "./pages/Signin";
import Feed from "./pages/Feed";
import MainNavigation from "./components/Navigation/MainNotification";
import AuthContext from "./context/auth-context";
import Signup from "./pages/Signup";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import RouteOrigin from "./components/common/RouteOrigin";

class App extends Component {
    state = {
        token: null,
        userId: null,
        email: null,
        signedIn: false
    };

    login = (token, userId) => {
        this.setState({ token: token, userId: userId, signedIn: true });
        localStorage.setItem("token", token);
        window.location.href = "/";
    };

    render() {
        const token = localStorage.getItem("token");
        let signinRoute;
        return (
            <AuthContext.Provider
                value={{
                    token: this.state.token,
                    userId: this.state.userId,
                    login: this.login
                }}
            >
                <Query query={tokenLogin} variables={{ token }}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        !error ? (signinRoute = true) : (signinRoute = false);
                        return (
                            <BrowserRouter>
                                <React.Fragment>
                                    <MainNavigation
                                        signedIn={!error || false}
                                        user={data ? data.tokenLogin : {}}
                                    />
                                    <main className="main-content">
                                        <Switch>
                                            <Route
                                                exact
                                                path="/"
                                                render={() =>
                                                    signinRoute ? (
                                                        <Feed
                                                            user={
                                                                data.tokenLogin
                                                            }
                                                            createPost={true}
                                                        />
                                                    ) : (
                                                        <AuthPage />
                                                    )
                                                }
                                            />
                                            <OnlyNoAuthRoute
                                                auth={signinRoute}
                                                path="/signup"
                                                component={Signup}
                                            />
                                            <RouteOrigin
                                                path="/profile/:profileId?"
                                                component={ProfilePage}
                                                createPost={false}
                                                currentUser={data && data.tokenLogin}
                                            />
                                        </Switch>
                                    </main>
                                </React.Fragment>
                            </BrowserRouter>
                        );
                    }}
                </Query>
            </AuthContext.Provider>
        );
    }
}

export default graphql(tokenLogin, {
    options: ownProps => ({
        variables: { token: localStorage.getItem("token") }
    })
})(App);
