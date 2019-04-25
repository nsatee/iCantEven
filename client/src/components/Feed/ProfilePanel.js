import React, { Component } from "react";
import ProfileAction from "../ProfilePage/ProfileAction";

class ProfilePanel extends Component {
    render() {
        const { username } = this.props.user;
        return (
            <div className="profile-panel">
                <div className="profile-panel__wrapper">
                    <div className="thumbnail">
                        <span>{username[0]}</span>
                    </div>
                    <div className="profile-panel__body">
                        <div className="username">
                            <span>{username}</span>
                        </div>
                    </div>
                </div>
                {this.props.isProfilePage && (
                    <ProfileAction
                        user={this.props.user}
                        currentUser={this.props.currentUser}
                    />
                )}
            </div>
        );
    }
}

export default ProfilePanel;
