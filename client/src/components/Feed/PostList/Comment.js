import React, { Component } from "react";
import CommentAction from "./CommentAction";
import { Link } from "react-router-dom";

class Comment extends Component {
    render() {
        const { creator, body } = this.props.comment;
        return (
            <div className="comment">
                <div className="comment__wrapper">
                    <Link to={`/profile/${creator._id}`} className="thumbnail">
                        <span>{creator.username[0]}</span>
                    </Link>
                    <div className="comment__body">
                        <div className="content-wrapper">
                            <Link
                                to={`/profile/${creator._id}`}
                                className="name"
                            >
                                {creator.username}
                            </Link>
                            <div
                                className="content"
                                dangerouslySetInnerHTML={{ __html: body }}
                            />
                        </div>
                        <CommentAction
                            comment={this.props.comment}
                            user={this.props.user}
                            activeComment={this.props.activeComment.bind(this)}
                            first={this.props.first}
                            skip={this.props.skip}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
