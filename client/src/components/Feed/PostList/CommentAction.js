import React, { Component } from "react";
import moment from "moment";
import { Mutation } from "react-apollo";
import { addCommentFeeling, getComments } from "../../../queries";

class CommentAction extends Component {
    ownFeeling = [];
    hasReacted = false;
    total = this.props.comment.feelings.length;

    componentWillMount() {
        const { feelings} = this.props.comment;
        const ownFeeling = feelings.filter(feeling => {
            return (
                feeling.creator._id === this.props.user._id ||
                feeling.isDeleted === false
            );
        });
        this.ownFeeling = ownFeeling;
        
        if(this.ownFeeling.length) {
            this.hasReacted = true; 
        }else {
            this.hasReacted = false; 
        }
    }
    render() {
        const { createdAt, _id, post } = this.props.comment;
        const { hasReacted, total, ownFeeling } = this;
        return (
            <Mutation
                mutation={addCommentFeeling}
                update={(cache, { data: { addCommentFeeling } }) => {
                    const data = cache.readQuery({
                        query: getComments,
                        variables: {
                            postId: post._id,
                            first: this.props.first,
                            skip: this.props.skip
                        }
                    });

                    data.comments.map(comment => {
                        if (comment._id === addCommentFeeling.comment._id) {
                            const feelingIndex = comment.feelings.findIndex(
                                feelingigId =>
                                    feelingigId._id === addCommentFeeling._id
                            );
                            if (feelingIndex !== -1) {
                                return comment.feelings.splice(feelingIndex, 1);
                            }
                            return comment.feelings.push(addCommentFeeling);
                        }
                    });

                    return cache.writeQuery({
                        query: getComments,
                        variables: {
                            postId: post._id,
                            first: this.props.first,
                            skip: this.props.skip
                        },
                        data
                    });
                }}
            >
                {(addCommentFeeling, { loading, error, data }) => {
                    if (error) console.log(error);
                    if (loading)
                        return (
                            <div className="comment-action">
                                <div className="comment-action__body">
                                    <div className="total">
                                        {moment.utc(createdAt).fromNow()} |{" "}
                                        {total} feelings
                                    </div>
                                    <button
                                        className={`action-btn ${
                                            !hasReacted ? "active" : ""
                                        }`}
                                    >
                                        <span>👏</span>
                                    </button>
                                </div>
                            </div>
                        );
                    return (
                        <div className="comment-action">
                            <div className="comment-action__body">
                                <div className="total">
                                    {moment.utc(createdAt).fromNow()} | {total}{" "}
                                    feelings
                                </div>
                                <button
                                    className={`action-btn ${
                                        !hasReacted ? "active" : ""
                                    }`}
                                    onClick={e => {
                                        e.preventDefault();
                                        addCommentFeeling({
                                            variables: {
                                                comment: _id,
                                                isDeleted: hasReacted,
                                                feelingId: data
                                                    ? data.addCommentFeeling._id
                                                    : ownFeeling.length &&
                                                      ownFeeling[0]._id
                                            }
                                        });
                                        this.props.activeComment(
                                            this.props.comment._id
                                        );
                                        this.hasReacted = !this.hasReacted;
                                        this.hasReacted ? this.total++ : this.total--;
                                    }}
                                >
                                    <span>👏</span>
                                </button>
                            </div>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}

export default CommentAction;
