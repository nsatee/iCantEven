import React, { Component } from "react";
import { Query, graphql, compose } from "react-apollo";
import { getUser } from "../../queries/auth";
import ProfilePanel from "../Feed/ProfilePanel";
import PostList from "../Feed/PostList/PostList";

const ProfileMarkup = props => {
    return (
        <div className="profile main-wrapper">
            <div className="profile_panel main-wrapper_panel">
                <ProfilePanel user={props.profileUser} />
            </div>
            <div className="profile_content main-wrapper_content">
                <PostList user={props.currentUser} userPost={props.userPost} />
            </div>
        </div>
    );
};

class ProfilePage extends Component {
    state = {
        user: {}
    };
    render() {
        // console.log(this.props);
        const { profileId } = this.props.match.params;
        const { loading, getUser } = this.props.getUser;
        if (loading) return "loading";
        return (
            <ProfileMarkup
                profileUser={getUser}
                userPost={profileId}
                currentUser={this.props.currentUser}
            />
        );
    }
}

export default compose(
    graphql(getUser, {
        name: "getUser",
        options: props => ({
            variables: { id: props.match.params.profileId },
        })
    })
)(ProfilePage);
