import React from "react";

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
};

const MainNavigation = props => {
    return (
        <header className="main-navigation">
            <nav className="main-navigation__items">
                <div className="main-navigation__logo">
                    <h1>ICANTEVEN</h1>
                </div>
                <ul>
                    {props.signedIn && (
                        <React.Fragment>
                            <li className="logout">
                                <button onClick={logout} className="btn-blue">Logout</button>
                            </li>
                            <li className="profile">
                                <div className="profile-thumbnail">
                                    <span>{props.user.username[0]}</span>
                                </div>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
