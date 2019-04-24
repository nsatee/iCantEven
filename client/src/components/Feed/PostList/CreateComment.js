import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import { graphql } from "react-apollo";
import { addComment } from "../../../queries";

class CreateComment extends Component {
    state = {
        comment: "",
        wTop: null
    };
    handleEnter = e => {
        if (!e) {
            e = window.event;
        }
        const keyCode = e.which || e.keyCode;
        const target = e.target || e.srcElement;

        if (keyCode === 13 && !e.shiftKey) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
            this.props.addComment({
                variables: {
                    body: this.state.comment,
                    post: this.props.postId,
                    isDeleted: false
                },
                update: (cache, { data: { addComment } }) => {
                    this.props.addedComment(addComment);
                }
            });
            target.blur();
            target.innerHTML = "";
            this.setState({ comment: "" });
        }
    };

    render() {
        return (
            <div className="comment-create">
                <div className="comment-create__wrapper">
                    <div className="thumbnail">
                        <span>{this.props.user.username[0]}</span>
                    </div>
                    <div className="comment-create__body">
                        <ContentEditable
                            placeholder="Comment..."
                            className="comment-input"
                            html={this.state.comment}
                            onKeyDown={e => this.handleEnter(e)}
                            onKeyUp={e =>
                                this.setState({
                                    comment: e.target.innerHTML
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(addComment, {
    name: "addComment"
})(CreateComment);
