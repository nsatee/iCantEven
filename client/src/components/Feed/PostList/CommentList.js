import React, { Component } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { Query } from "react-apollo";
import { getComments } from "../../../queries/post/comment";

class CommentList extends Component {
    render() {
        console.log(this.props.postId);
        return (
            <div className="comment-list">
                <Query
                    query={getComments}
                    variables={{ postId: this.props.postId }}
                >
                    {({ loading, error, data: { comments } }) => {
                        if (loading) return <div />;
                        if (error) console.log(error);

                        return comments.map(comment => (
                            <div
                                className="comment-list__wrapper"
                                key={comment._id}
                            >
                                <Comment comment={comment} user={this.props.user}/>
                            </div>
                        ));
                    }}
                </Query>
                <CreateComment
                    postId={this.props.postId}
                    user={this.props.user}
                />
            </div>
        );
    }
}

export default CommentList;
