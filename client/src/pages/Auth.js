import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import {Link} from 'react-router-dom';

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
                            <input
                                type="text"
                                id="email"
                                className="input-basic"
                                placeholder="Username or email"
                                onChange={e =>
                                    this.setState({ email: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="password"
                                id="password"
                                className="input-basic"
                                placeholder="Password"
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
