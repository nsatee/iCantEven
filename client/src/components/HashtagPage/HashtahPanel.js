import React from "react";
import { Link } from "react-router-dom";
import { hashtagInfo } from "../../queries/hashtag";
import { compose, graphql } from "react-apollo";
import { Loading } from "../common/Loading";

const HashtagPanel = props => {
    const { loading, getHashtag } = props.hashtagInfo;
    if (loading) return <Loading />;
    return (
        <div className="hashtag-panel__wrapper">
            {getHashtag.map(hashtag => {
                return (
                    <ul className="hashtag-panel__info" key={hashtag._id}>
                        <li>
                            <Link to={`/hashtag/${hashtag.displayTag[0]}`} className="hashtag-list">
                                <h1>#{hashtag.displayTag[0]}</h1>
                                <span>{hashtag.total} use</span>
                            </Link>
                        </li>
                    </ul>
                );
            })}
        </div>
    );
};

export default compose(
    graphql(hashtagInfo, {
        name: "hashtagInfo",
        options: {
            variables: {
                hashtag: ""
            }
        }
    })
)(HashtagPanel);
