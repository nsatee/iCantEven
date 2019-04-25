import React, { Component } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { Query } from "react-apollo";
import { getComments } from "../../../queries/post/comment";

class CommentList extends Component {
    comments = [];
    first = 3;
    skip = 0;
    total = this.props.total - 3;

    state = {
        comments: this.comments,
        skip: this.skip,
        first: this.first,
        total: this.total
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
        console.log(this.state);
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

                        const fetchComments = [...this.state.comments, ...comments];

                        return (
                            <React.Fragment>
                                {fetchComments.map(comment => (
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
                                            first={this.first}
                                            skip={this.skip}
                                        />
                                    </div>
                                ))}
                                {this.state.total > 0 && (
                                    <div className="loadmore-wrapper">
                                        <button
                                            className="load-comments"
                                            onClick={() => {
                                                this.setState({first: this.state.first <= 3 ? 5 : this.state.first})
                                                this.setState({skip: this.state.skip <= 0 ? 3 : this.state.skip + 5})
                                                this.setState({comments: [...this.state.comments, ...comments]});
                                                this.setState({total: this.state.total - 5});
                                            }}
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
