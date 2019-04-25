import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { graphql } from "react-apollo";

import CommentList from "./CommentList";
import { deletePost, getPosts } from "../../../queries";
import Reaction from "./Reaction";

class Post extends Component {
    state = {
        confirmDelete: false,
        postMenu: false
    };
    handleDeletePost = postId => {
        this.props.deletePost({ variables: { postId } });
    };

    handleIsReacted() {
        const { post, user } = this.props;
        for (let i = 0; i < post.reaction.length; i++) {
            if (post.reaction[i].liker._id === user._id) {
                return { reacted: true, reactionId: post.reaction[i]._id };
            }
        }
        return { reacted: false, reactionId: null };
    }
    render() {
        const { post, user, updatePost } = this.props;
        const { confirmDelete } = this.state;
        return (
            <div className="post-item" key={post._id}>
                {confirmDelete && (
                    <div className="deletePost confirm">
                        <h3>Are you sure you want to delete the post?</h3>
                        <div className="action">
                            <button
                                onClick={() =>
                                    this.setState({ confirmDelete: false })
                                }
                            >
                                Nope
                            </button>
                            <button
                                className="delete"
                                onClick={() => this.handleDeletePost(post._id)}
                            >
                                Sure
                            </button>
                        </div>
                    </div>
                )}
                <div className={`post-wrapper ${confirmDelete && "blur"}`}>
                    <div className="post-item__meta">
                        <div className="post-item__meta__wrapper">
                            <Link
                                className="thumbnail"
                                to={`/profile/${post.creator._id}`}
                            >
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
                        {user._id === post.creator._id && (
                            <div className="btn-wrapper">
                                <button
                                    onClick={() =>
                                        this.setState({
                                            postMenu: !this.state.postMenu
                                        })
                                    }
                                    className="delete-pop-btn"
                                >
                                    <span className="dot" />
                                    <span className="dot" />
                                    <span className="dot" />
                                </button>
                                {this.state.postMenu && (
                                    <ul
                                        className="dropdown"
                                        onClick={() =>
                                            this.setState({ postMenu: false })
                                        }
                                    >
                                        <li>
                                            <button
                                                onClick={() =>
                                                    this.setState({
                                                        confirmDelete: true
                                                    })
                                                }
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="post-item__wrapper" key={post._id}>
                        {post.headerTag !== "" && (
                            <Link
                                className="post-item__tag"
                                to={`/hashtag/${post.headerTag}`}
                            >
                                #{post.headerTag}
                            </Link>
                        )}
                        <div
                            className="post-item__body"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                            style={{
                                fontSize: post.body.length < 80 ? 30 : 16,
                                lineHeight: post.body.length > 80 && 1.3
                            }}
                        />
                    </div>
                    <Reaction
                        postId={post._id}
                        user={user}
                        total={post.reaction.length}
                        reaction={post.reaction}
                        isReacted={this.handleIsReacted()}
                    />
                    <CommentList
                        postId={post._id}
                        user={user}
                        total={post.commentTotal}
                    />
                </div>
            </div>
        );
    }
}

export default graphql(deletePost, {
    name: "deletePost",
    options: props => ({
        update: (cache, { data: { deletePost } }) => {
            console.log(deletePost);
            const data = cache.readQuery({
                query: getPosts,
                variables: { uid: "" }
            });
            console.log(data);
            const newData = data.posts.filter(post => {
                return post._id !== deletePost._id;
            });
            console.log(newData);
            return cache.writeQuery({
                query: getPosts,
                variables: { uid: "" },
                data: { posts: newData }
            });
        }
    })
})(Post);
