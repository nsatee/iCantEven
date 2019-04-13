import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import {Link} from 'react-router-dom';

import "./Auth.css";
import { login } from "../queries";
import AuthContext from '../context/auth-context'

class AuthPage extends Component {
    state = { email: "", password: "" };

    static contextType = AuthContext;

    handleLogin = ({login}) => {
        console.log(login);
        this.context.login(
            login.token,
            login.userId,
            login.email
        )
    };

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <form
                        className="auth-form"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const { data } = await client.query({
                                query: login,
                                variables: { email: this.state.email, password: this.state.password }
                            });
                            this.handleLogin(data);
                        }}
                    >
                        <div className="form-control">
                            <label htmlFor="email">E-Mail</label>
                            <input
                                type="text"
                                id="email"
                                onChange={e =>
                                    this.setState({ email: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={e =>
                                    this.setState({
                                        password: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit">Submit</button>
                            <Link to="/signup">Signup</Link>
                        </div>
                    </form>
                )}
            </ApolloConsumer>
        );
    }
}

export default AuthPage;
