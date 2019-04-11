import React, { Component } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { Query } from "react-apollo";
import { comments } from "../../../queries/post/comment";

class CommentList extends Component {
    render() {
        return (
            <div className="comment-list">
                <Query
                    query={comments}
                    variables={{ postId: this.props.postId }}
                >
                    {({ loading, error, data: { comments } }) => {
                        if (loading) return <div />;
                        if (error) console.log(error);

                        return comments.map(comment => (
                            <div className="comment-list__wrapper" key={comment._id}>
                                <Comment comment={comment} />
                            </div>
                        ));
                    }}
                </Query>
                <CreateComment />
            </div>
        );
    }
}

export default CommentList;
