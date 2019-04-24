import React, { Component } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { Query } from "react-apollo";
import { getComments } from "../../../queries/post/comment";

class CommentList extends Component {
    state = {
        comments: [],
        skip: 0,
        first: 3,
        total: this.props.total - 3
    };

    activeComment(id) {
        console.log(id);
        let commentsData = [];
        this.state.comments.map(comment => {
            if (comment._id === id) {
                return commentsData.push({
                    ...comment,
                    isDeleted: !comment.isDeleted
                });
            }
            return commentsData.push(comment);
        });

        this.setState({ comments: commentsData });
        console.log(this.state.comments);
    }

    addedComment(newComment) {
        console.log(newComment);
        this.setState({ comments: [newComment, ...this.state.comments] });
        console.log(this.state.comments);
    }

    render() {
        console.log(this.state.comments);
        return (
            <div className="comment-list">
                <CreateComment
                    postId={this.props.postId}
                    user={this.props.user}
                    first={this.state.first}
                    skip={this.state.skip}
                    addedComment={this.addedComment.bind(this)}
                />
                <Query
                    query={getComments}
                    variables={{
                        postId: this.props.postId,
                        first: this.state.first,
                        skip: this.state.skip
                    }}
                >
                    {({ loading, error, data: { comments } }) => {
                        if (loading)
                            return (
                                <React.Fragment>
                                    {this.state.comments.map(comment => (
                                        <div
                                            className="comment-list__wrapper"
                                            key={comment._id}
                                        >
                                            <Comment
                                                comment={comment}
                                                user={this.props.user}
                                                activeComment={this.activeComment.bind(
                                                    this
                                                )}
                                            />
                                        </div>
                                    ))}
                                    <div className="loadmore-wrapper">
                                        <button className="load-comments">
                                            Loading
                                        </button>
                                    </div>
                                </React.Fragment>
                            );
                        if (error) console.log(error);
                        const commentsData = [
                            ...this.state.comments,
                            ...comments
                        ];
                        return (
                            <React.Fragment>
                                {commentsData.map(comment => (
                                    <div
                                        className="comment-list__wrapper"
                                        key={comment._id}
                                    >
                                        <Comment
                                            comment={comment}
                                            user={this.props.user}
                                            activeComment={this.activeComment.bind(
                                                this
                                            )}
                                            first={this.state.first}
                                            skip={this.state.skip}
                                        />
                                    </div>
                                ))}
                                {this.state.total > 0 && (
                                    <div className="loadmore-wrapper">
                                        <button
                                            className="load-comments"
                                            onClick={() =>
                                                this.setState({
                                                    first:
                                                        this.state.first === 3
                                                            ? this.state.first
                                                            : this.state.first +
                                                              10,
                                                    skip: this.state.skip + 10,
                                                    comments: [
                                                        ...this.state.comments,
                                                        ...comments
                                                    ],
                                                    total: this.state.total - 10
                                                })
                                            }
                                        >
                                            {`${this.state.total} more comment${
                                                this.state.total > 1 ? "s" : ""
                                            }`}
                                        </button>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default CommentList;
