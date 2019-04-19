import React, { Component } from "react";
import moment from "moment";
import { Mutation } from "react-apollo";
import { addCommentFeeling, getComments, getSingleComment } from "../../../queries";

class CommentAction extends Component {
    render() {
        const { createdAt, _id, feelings, post } = this.props.comment;
        let ownFeeling = feelings.filter(feeling => {
            return (
                feeling.creator._id === this.props.user._id ||
                feeling.isDeleted === false
            );
        });
        let hasReacted = ownFeeling.length ? true : false;
        let total = feelings.length;
        return (
            <Mutation mutation={addCommentFeeling} refetchQueries={[{query: getSingleComment, variables: {id: _id}}]}>
                {(addCommentFeeling, { loading, error, data }) => {

                    if (error) console.log(error);
                    if (loading) return (
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
                                >
                                    <span>👏</span>
                                </button>
                            </div>
                        </div>
                    )
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
                                        console.log(ownFeeling);
                                        addCommentFeeling({
                                            variables: {
                                                comment: _id,
                                                isDeleted: hasReacted,
                                                feelingId: data ?
                                                    data.addCommentFeeling._id :
                                                    ownFeeling.length && ownFeeling[0]._id
                                            }
                                        });
                                        hasReacted = !hasReacted;
                                        !hasReacted ? ownFeeling.push(data) : ownFeeling.pop();
                                        hasReacted ? total++ : total--;
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
