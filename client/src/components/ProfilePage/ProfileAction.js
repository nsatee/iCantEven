import React, { Component } from "react";

class ProfileAction extends Component {
    render() {
        const {following, follower} = this.props.user;
        return (
            <div className="profile-panel__only">
                <div className="stalker-total">
                    <h2>
                        Stalking <span>{following.length}</span>
                    </h2>
                    <h2>
                        Stalker <span>{follower.length}</span>
                    </h2>
                </div>
                {this.props.currentUser._id !== this.props.user._id && (
                    <div className="profile-panel__action">
                        <button className="btn btn-blue">Stalk</button>
                    </div>
                )}
            </div>
        );
    }
}

export default ProfileAction;
