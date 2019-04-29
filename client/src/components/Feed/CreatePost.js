import React, { Component } from "react";
import { Mutation } from "react-apollo";
import ContentEditable from "react-contenteditable";
import $ from "jquery";

import { createPost, getPosts } from "../../queries";
import { Loading } from "../common/Loading";

export default class CreatePost extends Component {
    state = {
        headerTag: "",
        body: "",
        plainBody: "",
        date: new Date().toISOString(),
        error: false
    };

    noSpace = e => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/gi, "");
        this.setState({ headerTag: e.target.value });
    };

    componentDidMount() {
        document.querySelector("div").addEventListener("paste", function(e) {
            e.preventDefault();
            const text = (e.originalEvent || e).clipboardData.getData(
                "text/plain"
            );
            document.execCommand("insertHTML", false, text);
        });
    }

    render() {
        const { headerTag, date } = this.state;
        return (
            <Mutation
                mutation={createPost}
                update={(cache, { data: { createPost } }) => {
                    const { posts } = cache.readQuery({
                        query: getPosts,
                        variables: { uid: "" }
                    });
                    cache.writeQuery({
                        query: getPosts,
                        variables: { uid: "" },
                        data: { posts: [createPost, ...posts] }
                    });
                }}
            >
                {(createPost, { loading, data }) => {
                    return (
                        <div className="create-post">
                            <div
                                className={`error ${
                                    this.state.error ? "show" : ""
                                }`}
                            >
                                <span>Story cannot be blank</span>
                            </div>
                            <div className="create-post__header">
                                <h3>Create Post</h3>
                            </div>
                            <div className="create-post__container">
                                <form
                                    className="create-post__form"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        const plainText = this.state.body
                                            .split("<div><br></div>")
                                            .join("");
                                        const emptyTxtStart = plainText
                                            .split("<div>")
                                            .join("");
                                        const emptyTxt = emptyTxtStart
                                            .split("</div>")
                                            .join("");

                                        const noSpace = emptyTxt.split("&nbsp; ").join('').split("&nbsp;").join('');

                                        console.log(noSpace);
                                        if (!noSpace.length) {
                                            return this.setState({
                                                error: true
                                            });
                                        }
                                        createPost({
                                            variables: {
                                                headerTag,
                                                body: plainText,
                                                date
                                            }
                                        });
                                        this.setState({
                                            headerTag: "",
                                            body: ""
                                        });
                                    }}
                                >
                                    <div className="header-tag__wrapper">
                                        <div className="hash-wrapper">
                                            <span>#</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="headertag"
                                            className="header-tag"
                                            placeholder="HeaderTag"
                                            value={this.state.headerTag}
                                            onChange={e => {
                                                this.noSpace(e);
                                            }}
                                        />
                                    </div>
                                    <ContentEditable
                                        className="create-post__body"
                                        placeholder="What's going on?"
                                        html={this.state.body}
                                        onChange={e => {
                                            this.setState({
                                                body: e.target.value,
                                                formatedBody: e.target.value.replace(
                                                    "<br>",
                                                    ""
                                                ),
                                                error: false
                                            });
                                        }}
                                    />
                                    <div
                                        className="create-post__actions"
                                        style={{ opacity: loading && 0.5 }}
                                    >
                                        <div className="tools" />
                                        <button
                                            type="submit"
                                            className="create-btn btn-blue"
                                        >
                                            {loading ? <Loading /> : "Post"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}
