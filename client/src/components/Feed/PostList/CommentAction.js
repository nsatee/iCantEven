import React, { Component } from "react";
import moment from "moment";

class CommentAction extends Component {
    render() {
        const { createdAt } = this.props.comment;
        return (
            <div className="comment-action">
                <div className="comment-action__body">
                    <div className="total">
                        {moment.utc(createdAt).fromNow()} | 10 feelings
                    </div>
                    <button className="action-btn">
                        <span>👏</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default CommentAction;
