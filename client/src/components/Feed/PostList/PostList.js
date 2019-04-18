import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";

import { getPosts } from "../../../queries";
import CreatePost from "../CreatePost";
import Post from "./Post";

const PostListContent = props => {
    const { posts, user, createPost } = props;
    return (
        <React.Fragment>
            {user._id && createPost && <CreatePost user={user} />}
            {posts.map(post => {
                return <Post key={post._id} user={user} post={post} />;
            })}
        </React.Fragment>
    );
};

class PostList extends Component {
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Query
                        query={getPosts}
                        variables={{ uid: this.props.userPost }}
                    >
                        {({ loading, error, data: { posts } }) => {
                            console.log(posts);
                            if (loading)
                                return (
                                    <React.Fragment>
                                        <div className="loading-post" />
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
                )}
            </ApolloConsumer>
        );
    }
}

export default PostList;
