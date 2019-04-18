import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { addReaction, getReaction, getPosts } from "../../../../queries";
import Icon from "../../../svg/Icon";

const ReactionMutation = ({ total, hasReacted, isReacted, postId, reaction }) => {
    return (
        <Mutation
            mutation={addReaction}
            refetchQueries={[
                { query: getReaction, variables: { postId: postId } },
                {query: getPosts, variables: {uid: reaction.liker}}
            ]}
        >
            {(addReaction, { loading, error, data }) => {
                if (loading) {
                    return (
                        <div className="post-item__actions">
                            <span className="total-feeling">
                                {total} feeling
                                {total > 1 && "s"}
                            </span>
                            <button
                                className={`reaction-btn love ${
                                    hasReacted ? "reacted" : ""
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
                            {total} feeling{total > 1 && "s"}
                        </span>
                        <button
                            className={`reaction-btn love ${
                                hasReacted ? "reacted" : ""
                            }`}
                            onClick={e => {
                                e.preventDefault();
                                addReaction({
                                    variables: {
                                        type: 0,
                                        post: postId,
                                        date: new Date().toISOString(),
                                        hasReacted: hasReacted,
                                        reactionId: data
                                            ? data.addReaction._id
                                            : isReacted[0]
                                    }
                                });
                                hasReacted = !hasReacted;
                                hasReacted ? total++ : total--;
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
};

class Reaction extends Component {
    render() {
        return (
            <Query
                query={getReaction}
                variables={{ postId: this.props.postId }}
            >
                {({ loading, error, data: { reaction } }) => {
                    if (loading) return <ReactionMutation
                    total={0}
                    hasReacted={false}
                    postId={this.props.postId}
                    user={this.props.user}
                    isReacted={this.props.isReacted}
                    reaction={this.props.reaction}
                />
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

                    return (
                        <ReactionMutation
                            total={total}
                            hasReacted={hasReacted}
                            postId={this.props.postId}
                            user={this.props.user}
                            isReacted={this.props.isReacted}
                            reaction={this.props.reaction}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default Reaction;
