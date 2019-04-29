import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "../svg/Icon";

const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
};

class MainNavigation extends Component {
    state = {
        isOpen: false
    };
    render() {
        const { props } = this;
        return (
            <header className="main-navigation">
                <nav className="main-navigation__items">
                    <Link to="/">
                        <div className="main-navigation__logo">
                            <h1>LETStalk</h1>
                        </div>
                    </Link>
                    <ul>
                        {props.signedIn && (
                            <React.Fragment>
                                <li
                                    className="menu-item"
                                    onClick={() =>
                                        this.setState({
                                            isOpen: false
                                        })
                                    }
                                >
                                    <NavLink exact to="/">
                                        <Icon name="feed" />
                                    </NavLink>
                                </li>
                                <li className="profile">
                                    <div
                                        className="nav-profile__wrapper"
                                        onClick={() =>
                                            this.setState({
                                                isOpen: !this.state.isOpen
                                            })
                                        }
                                    >
                                        <div className="profile-thumbnail">
                                            <span>
                                                {props.user.username[0]}
                                            </span>
                                        </div>
                                        <span className="username">
                                            {props.user.username}
                                        </span>
                                    </div>
                                    {this.state.isOpen && (
                                        <ul
                                            className="dropdown"
                                            onMouseLeave={() => this.setState({
                                                isOpen: false
                                            })}
                                            onClick={() =>
                                                this.setState({
                                                    isOpen: !this.state.isOpen
                                                })
                                            }
                                        >
                                            <li>
                                                <Link
                                                    to={`/profile/${
                                                        props.user._id
                                                    }`}
                                                >
                                                    Profile
                                                </Link>
                                            </li>
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
