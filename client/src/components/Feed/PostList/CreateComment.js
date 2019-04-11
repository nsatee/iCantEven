import React, { Component } from "react";
import ContentEditable from "react-contenteditable";

class CreateComment extends Component {
    state = {
        comment: ""
    };
    handleEnter = (e) => {
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
            target.innerHTML = "";
        }
    }
    render() {
        return (
            <div className="comment-create">
                <div className="comment-create__wrapper">
                    <div className="thumbnail">
                        <span>G</span>
                    </div>
                    <div className="comment-create__body">
                        <ContentEditable
                            placeholder="Comment..."
                            className="comment-input"
                            html={this.state.comment}
                            onKeyDown={e => this.handleEnter(e)}
                            onKeyUp={e => this.setState({comment: e.target.innerHTML})}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateComment;
