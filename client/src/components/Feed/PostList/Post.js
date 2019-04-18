import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import CommentList from "./CommentList";
import Reaction from "./Reaction/Reaction";

const Post = ({ post, user }) => {
    return (
        <div className="post-item" key={post._id}>
            <div className="post-item__meta">
                <Link className="thumbnail" to={`/profile/${post.creator._id}`}>
                    <span>{post.creator.username[0]}</span>
                </Link>
                <div className="info">
                    <Link
                        className="username"
                        to={`/profile/${post.creator._id}`}
                    >
                        {post.creator.username}
                    </Link>
                    <span className="date">
                        {moment.utc(post.createdAt).fromNow()}
                    </span>
                </div>
            </div>
            <div className="post-item__wrapper" key={post._id}>
                <Link
                    className="post-item__tag"
                    to={`/hashtag/${post.headerTag}`}
                >
                    #{post.headerTag}
                </Link>
                <div
                    className="post-item__body"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />
            </div>
            <Reaction
                postId={post._id}
                user={user}
                reaction={post.reaction}
                isReacted={post.reaction.map(reaction => {
                    return reaction.liker._id === user._id
                        ? reaction._id
                        : false;
                })}
            />
            <CommentList postId={post._id} user={user} />
        </div>
    );
};

export default Post;
