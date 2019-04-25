import React, { Component } from "react";

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
                    <div className="profile-panel__only">
                        <div className="stalker-total">
                            <h2>
                                Stalking <span>20</span>
                            </h2>
                            <h2>
                                Stalker <span>40</span>
                            </h2>
                        </div>
                        {this.props.currentUser._id !== this.props.user._id && (
                            <div className="profile-panel__action">
                                <button className="btn btn-blue">Stalk</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default ProfilePanel;
