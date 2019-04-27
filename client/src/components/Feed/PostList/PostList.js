import React, { Component } from "react";
import { Query } from "react-apollo";

import { getPosts } from "../../../queries";
import CreatePost from "../CreatePost";
import Post from "./Post";

class PostListContent extends Component {
    render() {
        const { user, createPost, posts } = this.props;
        return (
            <React.Fragment>
                {posts && createPost && <CreatePost user={user} />}
                {posts.map(post => {
                    return (
                        <Post
                            key={post._id}
                            user={user}
                            post={post}
                        />
                    );
                })}
            </React.Fragment>
        );
    }
}

class PostList extends Component {
    render() {
        return (
            <Query query={getPosts} variables={{ uid: this.props.userPost }}>
                {({ loading, error, data: { posts } }) => {
                    if (loading)
                        return (
                            <React.Fragment>
                                <div className="loading-post" />
                                <div className="loading-post" />
                            </React.Fragment>
                        );
                    return (
                        <PostListContent
                            posts={posts}
                            user={this.props.user}
                            createPost={this.props.createPost}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default PostList;
