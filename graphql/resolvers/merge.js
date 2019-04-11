const DataLoader = require("dataloader");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Reaction = require("../../models/Reaction");

const userLoader = new DataLoader(userIds => {
    return User.find({ _id: { $in: userIds } });
});

const postsLoader = new DataLoader(postIds => {
    return posts(postIds);
});

const posts = async postIds => {
    try {
        const posts = await Post.find({ _id: { $in: postIds } });
        return posts.map(post => {
            return {
                ...post._doc,
                creator: user.bind(this, post.creator),
                reaction: populateReactions.bind(this, post.reaction)
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
