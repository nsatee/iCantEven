import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { addReaction, getReaction } from "../../../../queries";

class Reaction extends Component {
    render() {
        return (
            <Query
                query={getReaction}
                variables={{ postId: this.props.postId }}
            >
                {({ loading, error, data: { reaction } }) => {
                    if (loading) return "Loading...";
                    console.log(reaction);
                    let hasReacted = false;
                    let total = 0;
                    reaction.map(item => {
                        if (
                            item.liker._id === this.props.user._id &&
                            !item.isDeleted
                        ) {
                            hasReacted = true;
                        }
                        if (!item.isDeleted) {
                            total++;
                        }

                        return hasReacted;
                    });
                    console.log(hasReacted);

                    return (
                        <Mutation mutation={addReaction}>
                            {(addReaction, { loading, error, data }) => {
                                if (loading) {
                                    return (
                                        <div className="post-item__actions">
                                            <span className="total-feeling">
                                                {total} feeling
                                                {total > 1 && "s"}
                                            </span>
                                            <button
                                                className={`meh ${
                                                    hasReacted ? "reacted" : ""
                                                }`}
                                            >
                                                <span>❤️</span>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                    <div className="post-item__actions">
                                        <span className="total-feeling">
                                            {total} feeling{total > 1 && "s"}
                                        </span>
                                        <button
                                            className={`meh ${
                                                hasReacted ? "reacted" : ""
                                            }`}
                                            onClick={e => {
                                                e.preventDefault();
                                                addReaction({
                                                    variables: {
                                                        type: 0,
                                                        post: this.props.postId,
                                                        date: new Date().toISOString(),
                                                        hasReacted: hasReacted,
                                                        reactionId: data
                                                            ? data.addReaction
                                                                  ._id
                                                            : this.props
                                                                  .isReacted[0]
                                                    }
                                                });
                                                hasReacted = !hasReacted;
                                                hasReacted ? total++ : total--;
                                            }}
                                        >
                                            <span>❤️</span>
                                        </button>
                                    </div>
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default Reaction;
