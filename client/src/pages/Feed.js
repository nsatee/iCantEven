import React, { Component } from "react";

import AuthContext from "../context/auth-context";

import CreatePost from "../components/Feed/CreatePost";
import PostList from "../components/Feed/PostList/PostList";
import ProfilePanel from "../components/Feed/ProfilePanel";

class Feed extends Component {
    state = {
        creating: false,
        posts: [],
        isLoading: false
    };

    static contextType = AuthContext;

    render() {
        return (
            <div className="feed">
                <div className="feed_panel">
                    <ProfilePanel />
                </div>
                <div className="feed_content">
                    <PostList user={this.props.user} />
                </div>
            </div>
        );
    }
}

export default Feed;
