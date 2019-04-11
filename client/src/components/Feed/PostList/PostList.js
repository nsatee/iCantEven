import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";

import { getPosts } from "../../../queries";
import Reaction from "./Reaction/Reaction";
import moment from "moment";
import CreatePost from "../CreatePost";
import CommentList from "./CommentList";

class PostList extends Component {
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Query query={getPosts}>
                        {({ loading, error, data: { posts } }) => {
                            if (loading) return "Loading...";

                            return (
                                <React.Fragment>
                                    {this.props.user._id && <CreatePost />}
                                    {posts.map(post => {
                                        console.log(post._id);
                                        return (
                                            <div
                                                className="post-item"
                                                key={post._id}
                                            >
                                                <div className="post-item__meta">
                                                    <div className="thumbnail">
                                                        <span>
                                                            {
                                                                post.creator
                                                                    .username[0]
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="info">
                                                        <span className="username">
                                                            {
                                                                post.creator
                                                                    .username
                                                            }
                                                        </span>
                                                        <span className="date">
                                                            {console.log(
                                                                "date",
                                                                post.createdAt
                                                            )}
                                                            {moment
                                                                .utc(
                                                                    post.createdAt
                                                                )
                                                                .fromNow()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="post-item__wrapper"
                                                    key={post._id}
                                                >
                                                    <span className="post-item__tag">
                                                        #{post.headerTag}
                                                    </span>
                                                    <div className="post-item__body">
                                                        {post.body}
                                                    </div>
                                                </div>
                                                <Reaction
                                                    postId={post._id}
                                                    user={this.props.user}
                                                    reaction={post.reaction}
                                                    isReacted={post.reaction.map(
                                                        reaction => {
                                                            return reaction
                                                                .liker._id ===
                                                                this.props.user
                                                                    ._id
                                                                ? reaction._id
                                                                : false;
                                                        }
                                                    )}
                                                />
                                                <CommentList postId={post._id}/>
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        }}
                    </Query>
                )}
            </ApolloConsumer>
        );
    }
}

export default PostList;
