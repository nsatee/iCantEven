import React, { Component } from "react";

class ProfilePage extends Component {
    render() {
        return (
            <div className="profile">
                <div className="profile__wrapper main-container">
                    <div className="profile__info-section">
                        <div className="thumnail">
                            <span>G</span>
                        </div>
                        <div className="meta">
                            <span className="username">Golfie</span>
                        </div>
                    </div>
                </div>
                <div className="profile__post-section">
                    
                </div>
            </div>
        );
    }
}

export default ProfilePage;
