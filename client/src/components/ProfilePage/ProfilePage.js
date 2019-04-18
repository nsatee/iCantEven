import React, { Component } from "react";
import { Query } from "react-apollo";
import { getUser } from "../../queries/auth";
import ProfilePanel from "../Feed/ProfilePanel";
import PostList from "../Feed/PostList/PostList";

const ProfileMarkup = props => {
    console.log(props.getUser)
    return (
        <div className="profile main-wrapper">
            <div className="profile_panel main-wrapper_panel">
                <ProfilePanel user={props.profileUser} />
            </div>
            <div className="profile_content main-wrapper_content">
                <PostList user={props.currentUser} userPost={props.userPost}/>
            </div>
        </div>
    );
};

class ProfilePage extends Component {
    render() {
        const {profileId} = this.props.match.params;
        return (
            <Query
                query={getUser}
                variables={{ id: profileId }}
            >
                {({ loading, error, data: { getUser } }) => {
                    console.log(getUser);
                    if (loading) return "Loading";
                    return <ProfileMarkup profileUser={getUser} userPost={profileId} currentUser={this.props.currentUser}/>;
                }}
            </Query>
        );
    }
}

export default ProfilePage;
