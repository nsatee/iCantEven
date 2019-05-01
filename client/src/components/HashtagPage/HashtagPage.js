import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getPostsByHashtag, hashtagInfo } from "../../queries/hashtag";
import Post from "../Feed/PostList/Post";

class HashtagPage extends Component {
    render() {
        const { loading, getPostsByHashtag } = this.props.getPostsByHashtag;
        const { getHashtag } = this.props.hashtagInfo;
        if (loading) return "Loading...";
        console.log(getHashtag);
        return (
            <div className="hashtag-container">
                <div className="hashtag-header">
                    <h1 className="header">
                        <span className="hash-sign">#</span>{this.props.match.params.hashtagQuery}
                    </h1>
                    <div className="info">
                        <span className="text">{`${getHashtag[0].total} ${
                            getHashtag[0].total > 1 ? "users use" : "user uses"
                        } this hashtag`}</span>
                    </div>
                </div>
                <div className="hastag-post__container">
                    {getPostsByHashtag.map(post => {
                        return (
                            <Post
                                key={post._id}
                                user={this.props.currentUser}
                                post={post}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getPostsByHashtag, {
        name: "getPostsByHashtag",
        options: props => ({
            variables: {
                hashtag: props.match.params.hashtagQuery.toLowerCase()
            }
        })
    }),
    graphql(hashtagInfo, {
        name: "hashtagInfo",
        options: props => ({
            variables: {
                hashtag: props.match.params.hashtagQuery.toLowerCase()
            }
        })
    })
)(HashtagPage);
