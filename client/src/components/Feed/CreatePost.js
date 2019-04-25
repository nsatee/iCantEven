import React, { Component } from "react";
import { Mutation } from "react-apollo";
import ContentEditable from "react-contenteditable";

import { createPost, getPosts } from "../../queries";

export default class CreatePost extends Component {
    state = {
        headerTag: "",
        body: "",
        date: new Date().toISOString()
    };

    noSpace = e => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/gi, "");
        this.setState({ headerTag: e.target.value });
    };
    render() {
        const { headerTag, body, date } = this.state;
        return (
            <Mutation
                mutation={createPost}
                update={(cache, { data: { createPost } }) => {
                    const { posts } = cache.readQuery({ query: getPosts, variables: {uid: ""} });
                    cache.writeQuery({
                        query: getPosts,
                        variables: {uid: ""},
                        data: { posts: [createPost, ...posts] }
                    });
                }}
            >
                {(createPost, { loading, data }) => {
                    return (
                        <div className="create-post">
                            <div className="create-post__header">
                                <h3>Create Post</h3>
                            </div>
                            <div className="create-post__container">
                                <form
                                    className="create-post__form"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        createPost({
                                            variables: { headerTag, body, date, creator: this.props.user._id }
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
                                        onChange={e =>
                                            this.setState({
                                                body: e.target.value
                                            })
                                        }
                                    />
                                    <div className="create-post__actions" style={{opacity: loading&& .5}}>
                                        <div className="tools" />
                                        <button
                                            type="submit"
                                            className="create-btn btn-blue"
                                        >
                                            {loading ? "Loading" : "Post"}
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
