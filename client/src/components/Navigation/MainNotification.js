import React, { Component } from "react";

const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
};



class MainNavigation extends Component {
    state = {
        isOpen: false
    }
    render() {
        const {props} = this;
        return (
            <header className="main-navigation">
                <nav className="main-navigation__items">
                    <div className="main-navigation__logo">
                        <h1>ICANTEVEN</h1>
                    </div>
                    <ul>
                        {props.signedIn && (
                            <React.Fragment>
                                <li className="profile">
                                    <div
                                        className="profile-thumbnail"
                                        onClick={() => this.setState({isOpen: !this.state.isOpen})}
                                    >
                                        <span>{props.user.username[0]}</span>
                                    </div>
                                    {this.state.isOpen && (
                                        <ul className="dropdown">
                                            <li className="logout">
                                                <a
                                                    href="/"
                                                    onClick={e => logout(e)}
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default MainNavigation;
