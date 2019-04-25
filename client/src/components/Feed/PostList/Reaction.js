import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { addReaction, getPosts } from "../../../queries";
import Icon from "../../svg/Icon";

class ReactionMutation extends Component {
    total = this.props.reaction.length;
    reacted = this.props.hasReacted.reacted;

    render() {
        const { hasReacted, postId, user } = this.props;
        return (
            <Mutation
                mutation={addReaction}
                update={(cache, { data: { addReaction } }) => {
                    const data = cache.readQuery({
                        query: getPosts,
                        variables: {
                            uid: ""
                        }
                    });

                    data.posts.map(post => {
                        if (post._id === addReaction.post._id) {
                            const reactionIndex = post.reaction.findIndex(
                                reaction => {
                                    return addReaction._id === reaction._id;
                                }
                            );
                            if (reactionIndex !== -1) {
                                return post.reaction.splice(reactionIndex, 1);
                            }
                            return post.reaction.push(addReaction);
                        }
                    });

                    return cache.writeQuery({
                        query: getPosts,
                        variables: {
                            uid: ""
                        },
                        data
                    });
                }}
            >
                {(addReaction, { loading, error, data }) => {
                    if (loading) {
                        return (
                            <div className="post-item__actions">
                                <span className="total-feeling">
                                    {`${this.total} feeling${
                                        this.total > 1 ? "s" : ""
                                    }`}
                                </span>
                                <button
                                    className={`reaction-btn love ${
                                        this.reacted ? "reacted" : ""
                                    }`}
                                >
                                    <span>
                                        <Icon
                                            name="heart"
                                            fill="#D94A38"
                                            width="100%"
                                        />
                                    </span>
                                </button>
                            </div>
                        );
                    }

                    return (
                        <div className="post-item__actions">
                            <span className="total-feeling">
                                {this.total} feeling
                                {this.total > 1 && "s"}
                            </span>
                            <button
                                className={`reaction-btn love ${
                                    this.reacted ? "reacted" : ""
                                }`}
                                onClick={e => {
                                    e.preventDefault();
                                    addReaction({
                                        variables: {
                                            type: 0,
                                            post: postId,
                                            date: new Date().toISOString(),
                                            hasReacted: this.reacted,
                                            reactionId: data
                                                ? data.addReaction._id
                                                : hasReacted.reactionId
                                        }
                                    });

                                    this.reacted = !this.reacted;
                                    this.reacted ? this.total++ : this.total--;
                                }}
                            >
                                <span>
                                    <Icon name="heart" fill="#D94A38" />
                                </span>
                            </button>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}

class Reaction extends Component {
    render() {
        return (
            <ReactionMutation
                total={this.props.total}
                hasReacted={this.props.isReacted}
                postId={this.props.postId}
                user={this.props.user}
                reaction={this.props.reaction}
            />
        );
    }
}

export default Reaction;
