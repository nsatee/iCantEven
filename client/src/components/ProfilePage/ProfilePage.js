import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getUser } from "../../queries/auth";
import { Link } from "react-router-dom";
import ProfilePanel from "../Feed/ProfilePanel";
import PostList from "../Feed/PostList/PostList";
import { Loading } from "../common/Loading";

const ProfileMarkup = props => {
    return (
        <div className="profile main-wrapper">
            <div className="profile_panel main-wrapper_panel">
                <ProfilePanel
                    getUser={props.getUser.bind(this)}
                    user={props.profileUser}
                    currentUser={props.currentUser}
                    isProfilePage={true}
                />
            </div>
            <div className="profile_content main-wrapper_content">
                <PostList user={props.currentUser} userPost={props.userPost} />
            </div>
        </div>
    );
};

class UserList extends Component {
    state = {
        selected: "following"
    };

    render() {
        console.log(this.props);
        return (
            <div className="userlist">
                <div
                    className="fade"
                    onClick={() => this.props.renderUserList()}
                />
                <div className="userlist-container">
                    <div className="header">
                        <ul>
                            <li
                                className={
                                    this.state.selected === "following"
                                        ? "active"
                                        : ""
                                }
                            >
                                <button
                                    onClick={() =>
                                        this.setState({
                                            selected: "following"
                                        })
                                    }
                                >
                                    Following
                                </button>
                            </li>
                            <li
                                className={
                                    this.state.selected === "follower"
                                        ? "active"
                                        : ""
                                }
                            >
                                <button
                                    onClick={() =>
                                        this.setState({
                                            selected: "follower"
                                        })
                                    }
                                >
                                    Follower
                                </button>
                            </li>
                        </ul>
                    </div>
                    {this.props[this.state.selected].map(user => {
                        return (
                            <Link
                                to={`/profile/${user._id}`}
                                className="user"
                                key={user._id}
                                onClick={() => this.props.renderUserList()}
                            >
                                <div className="info">
                                    <div className="thumbnail">
                                        <span>{user.username[0]}</span>
                                    </div>
                                    <div className="meta">
                                        <span className="username">
                                            {user.username}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

class ProfilePage extends Component {
    state = {
        following: [],
        follower: [],
        userListOpen: false
    };

    handleGetUser = (following, follower) => {
        console.log(following, follower);
        this.setState({ following, follower, userListOpen: true });
    };

    handleRenderUserList = () => {
        this.setState({ userListOpen: false });
    };

    render() {
        const { profileId } = this.props.match.params;
        const { loading, getUser } = this.props.getUser;
        if (loading) {
            return (
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Loading />
                </div>
            );
        }
        console.log(getUser, this.props.currentUser);
        return (
            <React.Fragment>
                {this.state.userListOpen && (
                    <UserList
                        following={this.state.following}
                        follower={this.state.follower}
                        renderUserList={this.handleRenderUserList.bind(this)}
                    />
                )}
                <ProfileMarkup
                    getUser={this.handleGetUser.bind(this)}
                    profileUser={getUser}
                    userPost={profileId}
                    currentUser={this.props.currentUser}
                />
            </React.Fragment>
        );
    }
}

export default compose(
    graphql(getUser, {
        name: "getUser",
        options: props => ({
            variables: { id: props.match.params.profileId }
        })
    })
)(ProfilePage);
