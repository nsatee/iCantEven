import React, { Component } from "react";
import ProfileAction from "../ProfilePage/ProfileAction";

class ProfilePanel extends Component {
    render() {
        return (
            <div className="profile-panel">
                {this.props.children}
                {this.props.isProfilePage && (
                    <React.Fragment>
                        {console.log('yo')}
                        <div className="profile-panel__wrapper">
                            <div className="thumbnail">
                                <span>{this.props.user.username[0]}</span>
                            </div>
                            <div className="profile-panel__body">
                                <div className="username">
                                    <span>{this.props.user.username}</span>
                                </div>
                            </div>
                        </div>
                        <ProfileAction
                            getUser={this.props.getUser.bind(this)}
                            user={this.props.user}
                            currentUser={this.props.currentUser}
                        />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default ProfilePanel;
