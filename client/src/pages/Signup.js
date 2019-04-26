import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link, Redirect } from "react-router-dom";

import { createUser } from "../queries/auth";
import { Loading } from "../components/common/Loading";

class Signup extends Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        loading: false
    };

    render() {
        const { username, password, confirmPassword, email } = this.state;
        if (this.props.auth) return <Redirect to="/" />;
        return (
            <Mutation mutation={createUser}>
                {(createUser, { data }) => (
                    <div className="auth-container">
                        {data && <Redirect to="/" />}
                        <form
                            className="auth-form"
                            onSubmit={e => {
                                e.preventDefault();
                                createUser({
                                    variables: { username, password, email }
                                });
                                this.setState({ loading: true });
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
                                    {this.state.loading ? (
                                        <Loading />
                                    ) : (
                                        "Signup"
                                    )}
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
