import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { createUser } from "../queries/auth";

class Signup extends Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    };
    render() {
        const { username, password, confirmPassword, email } = this.state;

        return (
            <Mutation mutation={createUser}>
                {(createUser, { data }) => (
                    <div className="auth-container">
                        <form
                            className="auth-form"
                            onSubmit={e => {
                                e.preventDefault();
                                createUser({
                                    variables: { username, password, email }
                                });
                                this.setState({
                                    username: "",
                                    password: "",
                                    email: "",
                                    confirmPassword: ""
                                });
                                this.props.history.push("/");
                            }}
                        >
                            <div className="form-control">
                                <input
                                    className="input-basic"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={e =>
                                        this.setState({
                                            username: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    className="input-basic"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={e =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    className="input-basic"
                                    type="password"
                                    name="pasword"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={e =>
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    className="input-basic"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={this.state.confirmPassword}
                                    onChange={e =>
                                        this.setState({
                                            confirmPassword: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit">
                                    Signup
                                </button>
                                <Link to="/" className="link-action">
                                    Alreadt had an account? Signin
                                </Link>
                            </div>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default Signup;
