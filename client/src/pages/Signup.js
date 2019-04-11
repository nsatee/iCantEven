import React, { Component } from "react";
import { Mutation } from "react-apollo";

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
                    <form
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
                            this.props.history.push('/');
                        }}
                    >
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={e =>
                                this.setState({ username: e.target.value })
                            }
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={e =>
                                this.setState({ email: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            name="pasword"
                            placeholder="password"
                            value={this.state.password}
                            onChange={e =>
                                this.setState({ password: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={this.state.confirmPassword}
                            onChange={e =>
                                this.setState({ confirmPassword: e.target.value })
                            }
                        />
                        <div>
                            <div className="tools" />
                            <button type="submit" className="create-btn">
                                Create an acount
                            </button>
                        </div>
                    </form>
                )}
            </Mutation>
        );
    }
}

export default Signup;
