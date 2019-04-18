import React, {Component} from 'react';

class ProfilePanel extends Component {
    render() {
        const {username} = this.props.user;
        return (<div className="profile-panel">
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
        </div>)
    }
}

export default ProfilePanel;