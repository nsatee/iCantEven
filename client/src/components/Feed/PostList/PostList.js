import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";

import { getPosts } from "../../../queries";
import Reaction from "./Reaction/Reaction";
import moment from "moment";
import CreatePost from "../CreatePost";
import CommentList from "./CommentList";

const Post = ({post, user }) => {
    return (
        <div className="post-item" key={post._id}>
            <div className="post-item__meta">
                <Link className="thumbnail" to={`/profile/${post.creator._id}`}>
                    <span>{post.creator.username[0]}</span>
                </Link>
                <div className="info">
                    <Link
                        className="username"
                        to={`/profile/${post.creator._id}`}
                    >
                        {post.creator.username}
                    </Link>
                    <span className="date">
                        {moment.utc(post.createdAt).fromNow()}
                    </span>
                </div>
            </div>
            <div className="post-item__wrapper" key={post._id}>
                <Link
                    className="post-item__tag"
                    to={`/hashtag/${post.headerTag}`}
                >
                    #{post.headerTag}
                </Link>
                <div
                    className="post-item__body"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />
            </div>
            <Reaction
                postId={post._id}
                user={user}
                reaction={post.reaction}
                isReacted={post.reaction.map(reaction => {
                    return reaction.liker._id === user._id
                        ? reaction._id
                        : false;
                })}
            />
            <CommentList postId={post._id} user={user} />
        </div>
    );
};

const PostListContent = props => {
    const { posts, user } = props;
    console.log(posts);
    return (
        <React.Fragment>
            {user._id && <CreatePost />}
            {posts.map(post => {
                return (
                    <Post user={user} post={post}/>
                );
            })}
        </React.Fragment>
    );
};

class PostList extends Component {
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Query query={getPosts}>
                        {({ loading, error, data: { posts } }) => {
                            if (loading) return "Loading...";

                            return (
                                <PostListContent
                                    posts={posts}
                                    user={this.props.user}
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
