import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { addReaction, getPosts, getReaction } from "../../../queries";
import Icon from "../../svg/Icon";

class ReactionMutation extends Component {
    render() {
        const { total, hasReacted, postId } = this.props;
        let reacted = hasReacted.reacted;
        let dynamicTotal = total;
        
        return (
            <Mutation
                mutation={addReaction}
                refetchQueries={[
                    { query: getPosts, variables: { uid: "" } }
                ]}
            >
                {(addReaction, { loading, error, data }) => {
                    if (loading) {
                        return (
                            <div className="post-item__actions">
                                <span className="total-feeling">
                                    {dynamicTotal} feeling
                                    {total > 1 && "s"}
                                </span>
                                <button
                                    className={`reaction-btn love ${
                                        reacted ? "reacted" : ""
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
                                {dynamicTotal} feeling
                                {total > 1 && "s"}
                            </span>
                            <button
                                className={`reaction-btn love ${
                                    reacted ? "reacted" : ""
                                }`}
                                onClick={e => {
                                    e.preventDefault();
                                    addReaction({
                                        variables: {
                                            type: 0,
                                            post: postId,
                                            date: new Date().toISOString(),
                                            hasReacted: reacted,
                                            reactionId: data
                                                ? data.addReaction._id
                                                : hasReacted.reactionId
                                        }
                                    });

                                    reacted = !reacted;
                                    reacted ? dynamicTotal++ : dynamicTotal--
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
