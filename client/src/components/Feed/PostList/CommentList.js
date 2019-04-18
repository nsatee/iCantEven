import React, { Component } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { Query } from "react-apollo";
import { getComments } from "../../../queries/post/comment";

class CommentList extends Component {
    state = {
        comments: [],
        skip: null,
        first: null
    };

    render() {
        console.log(this.state);
        return (
            <div className="comment-list">
                <CreateComment
                    postId={this.props.postId}
                    user={this.props.user}
                    first={this.state.first}
                    skip={this.state.skip}
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
                        if (loading) return <div />

                        if (error) console.log(error);
                        const commentsData = [...this.state.comments, ...comments]
                        console.log(comments)
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
                                        />
                                    </div>
                                ))}
                                {/* <button
                                    onClick={() =>
                                        this.setState({
                                            first:
                                                this.state.first === 3
                                                    ? this.state.first
                                                    : this.state.first + 3,
                                            skip: this.state.skip + 3,
                                            comments: [...this.state.comments, ...comments]
                                        })
                                    }
                                >
                                    more comments
                                </button> */}
                            </React.Fragment>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default CommentList;
