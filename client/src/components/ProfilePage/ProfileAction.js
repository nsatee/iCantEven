import React, { Component } from "react";

class ProfileAction extends Component {
    render() {
        return (
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
        );
    }
}

export default ProfileAction;
