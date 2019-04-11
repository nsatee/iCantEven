import React, { Component } from "react";
import CommentAction from "./CommentAction";
import moment from 'moment';

class Comment extends Component {
    render() {
        const {creator, body} = this.props.comment;
        return (
            <div className="comment">
                <div className="comment__wrapper">
                    <a href="/" className="thumbnail">
                        <span>{creator.username[0]}</span>
                    </a>
                    <div className="comment__body">
                        <a href="/" className="name">{creator.username}</a>
                        <div className="content">
                            {body}
                        </div>
                        <CommentAction comment={this.props.comment}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
