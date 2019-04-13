const DataLoader = require("dataloader");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Reaction = require("../../models/Reaction");
const Comment = require("../../models/Comment");
const CommentFeeling = require("../../models/CommentFeeling");

//===== dataLoader ======//
const userLoader = new DataLoader(userIds => {
    return User.find({ _id: { $in: userIds } });
});

const commentLoader = new DataLoader(commentIds => {
    return comments(commentIds);
});

const postsLoader = new DataLoader(postIds => {
    return posts(postIds);
});

const feelingLoader = new DataLoader(feelingIds => {
    return feelings(feelingIds);
});

//========================//
//===== format gql schema ======//
const postFormat = post => {
    return {
        ...post._doc,
        createdAt: new Date(post._doc.createdAt).toISOString(),
        creator: user.bind(this, post._doc.creator),
        reaction: populateReactions.bind(this, post._doc.reaction),
        // comments: () => commentLoader.loadMany(post._doc.comments)
    };
};

const commentFormat = comment => {
    return {
        ...comment._doc,
        createdAt: new Date(comment._doc.createdAt).toISOString(),
        creator: user.bind(this, comment._doc.creator),
        post: singlePost.bind(this, comment._doc.post),
        feelings: () => feelingLoader.loadMany(comment._doc.feelings)
    };
};
//==============================//

const posts = async postIds => {
    try {
        const posts = await Post.find({ _id: { $in: postIds } });
        posts.sort((a, b) => {
            return (
                postIds.indexOf(a._id.toString()) -
                postIds.indexOf(b._id.toString())
            );
        });

        return posts.map(post => {
            return postFormat(post);
        });
    } catch (err) {
        throw err;
    }
};

const comments = async commentIds => {
    try {
        const comments = await Comment.find({ _id: { $in: commentIds } });
        
        return comments.map(comment => {
            return commentFormat(comment);
        });
    } catch (err) {
        throw err;
    }
};

const singleComment = async commentId => {
    try {
        const comment = await commentLoader.load(commentId.toString());
        return comment;
    } catch (err) {
        throw err;
    }
};

const feelings = async feelingIds => {
    try {
        const feelings = await CommentFeeling.find({
            _id: { $in: feelingIds }
        });
        return feelings.map(feeling => {
            return {
                ...feeling._doc,
                creator: user.bind(this, feeling._doc.creator),
                comment: singleComment.bind(this, feeling._doc.comment),
                createdAt: new Date(feeling._doc.createdAt).toISOString(),
            };
        });
    } catch (err) {
        throw err;
    }
};

const singlePost = async postId => {
    try {
        const post = await postsLoader.load(postId.toString());
        return post;
    } catch (err) {
        throw err;
    }
};

const populateReactions = async reactionIds => {
    try {
        const reactions = await Reaction.find({ _id: { $in: reactionIds } });
        return reactions.map(reaction => {
            return {
                ...reaction._doc,
                liker: user.bind(this, reaction.liker),
                post: singlePost.bind(this, reaction.post)
            };
        });
    } catch (err) {
        console.log(err);
    }
};

const user = async userId => {
    const user = await userLoader.load(userId.toString());
    try {
        return {
            ...user._doc,
            createdPosts: () => postsLoader.loadMany(user._doc.createdPosts)
        };
    } catch (err) {
        throw err;
    }
};

exports.user = user;
exports.posts = posts;
exports.singlePost = singlePost;
exports.populateReactions = populateReactions;
exports.feelings = feelings;

exports.commentFormat = commentFormat;
exports.postFormat = postFormat;
