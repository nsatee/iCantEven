import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { followAction, getUser } from "../../queries";
import UserListContext from "../../context/userList-context";
import ProfileInfo from "../Feed/ProfileInfo";

class ProfileAction extends Component {
    state = {
        follow: this.props.getUserQuery.getUser.follower.some(
            user => user._id === this.props.currentUser._id
        ),
        followingTotal: this.props.getUserQuery.getUser.following.length,
        followerTotal: this.props.getUserQuery.getUser.follower.length
    };

    static contextType = UserListContext;
    handleFollow = () => {
        if (this.props.loading) return;

        this.props.followAction({
            variables: {
                uid: this.props.user._id,
                follow: !this.state.follow
            },
            update: (cache, { data: { followAction } }) => {
                const data = cache.readQuery({
                    query: getUser,
                    variables: {
                        id: this.props.getUserQuery.getUser._id
                    }
                });
                if (this.state.follow) {
                    data.getUser.follower.push(followAction);
                    console.log(data);
                } else {
                    const uIndex = data.getUser.follower.findIndex(
                        user => this.props.currentUser._id === user._id
                    );
                    data.getUser.follower.splice(uIndex, 1);
                }
                console.log(data, followAction);
                cache.writeQuery({
                    query: getUser,
                    variables: {
                        id: this.props.user._id
                    },
                    data
                });
            },
            refetchQueries: [
                {
                    query: getUser,
                    variables: { id: this.props.currentUser._id }
                }
            ]
        });

        this.setState({ follow: !this.state.follow });
        if (this.state.follow) {
            this.setState({ followerTotal: this.state.followerTotal - 1 });
        } else {
            this.setState({ followerTotal: this.state.followerTotal + 1 });
        }
    };

    componentWillReceiveProps = nextProps => {
        nextProps.getUserQuery.refetch();
        if (nextProps.getUserQuery.getUser._id !== this.props.user._id) {
            this.setState({
                follow: nextProps.getUserQuery.getUser.follower.some(
                    user => user._id === this.props.currentUser._id
                ),
                followingTotal: nextProps.getUserQuery.getUser.following.length,
                followerTotal: nextProps.getUserQuery.getUser.follower.length
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="profile-panel__only" key={this.props.user._id}>
                    <div
                        className="stalker-total"
                        onClick={() =>
                            this.props.getUser(
                                this.props.getUserQuery.getUser.following,
                                this.props.getUserQuery.getUser.follower
                            )
                        }
                    >
                        <h2>
                            Stalking <span>{this.state.followingTotal}</span>
                        </h2>
                        <h2>
                            Stalker <span>{this.state.followerTotal}</span>
                        </h2>
                    </div>
                    {this.props.currentUser._id !== this.props.user._id && (
                        <div className="profile-panel__action">
                            <button
                                className={`btn btn-blue ${
                                    this.state.follow ? "active" : ""
                                }`}
                                onClick={() => this.handleFollow()}
                            >
                                {!this.state.follow ? "Stalk" : "Unstalk"}
                            </button>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
export default compose(
    graphql(followAction, {
        name: "followAction"
    }),
    graphql(getUser, {
        name: "getUserQuery",
        options: props => ({
            variables: {
                id: props.user._id
            }
        })
    })
)(ProfileAction);
