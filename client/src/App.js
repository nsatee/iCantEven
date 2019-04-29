import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql, Query } from "react-apollo";
import "./components/common/momentFormat";

import { tokenLogin } from "./queries";
import AuthContext from "./context/auth-context";

import AuthPage from "./pages/Signin";
import Feed from "./pages/Feed";
import MainNavigation from "./components/Navigation/MainNotification";
import Signup from "./pages/Signup";
import Notfound from './pages/NotFound';

import ProfilePage from "./components/ProfilePage/ProfilePage";
import RouteOrigin from "./components/common/RouteOrigin";

class App extends Component {
    state = {
        token: null,
        userId: null,
        email: null,
        signedIn: false
    };

    signinRoute = false;

    login = (token, userId) => {
        this.setState({ token: token, userId: userId, signedIn: true });
        localStorage.setItem("token", token);
        window.location.href = "/";
    };

    render() {
        const token = localStorage.getItem("token");
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
                        console.log(data);
                        !error ? (this.signinRoute = true) : (this.signinRoute = false);
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
                                                    this.signinRoute ? (
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
                                            <RouteOrigin
                                                path="/signup"
                                                auth={this.signinRoute}
                                                component={Signup}
                                            />
                                            <RouteOrigin
                                                path="/profile/:profileId?"
                                                component={ProfilePage}
                                                createPost={false}
                                                currentUser={data && data.tokenLogin}
                                            />
                                            <Route render={() => <Notfound auth={this.signinRoute}/>} />
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
