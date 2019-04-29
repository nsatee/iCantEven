import React, { Component } from "react";

import PostList from "../components/Feed/PostList/PostList";
import ProfilePanel from "../components/Feed/ProfilePanel";

class Feed extends Component {
    state = {
        creating: false,
        posts: [],
        isLoading: false
    };

    render() {
        return (
            <div className="feed main-wrapper">
                <div className="feed_panel main-wrapper_panel">
                    <ProfilePanel user={this.props.user}/>
                </div>
                <div className="feed_content main-wrapper_content">
                    <PostList user={this.props.user} createPost={this.props.createPost} userPost={""}/>
                </div>
            </div>
        );
    }
}

export default Feed;
