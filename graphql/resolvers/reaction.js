const Reaction = require("../../models/Reaction");
const Post = require("../../models/Post");
const User = require("../../models/User");
const { user, singlePost, populateReactions } = require("./merge");

module.exports = {
    reaction: async ({ postId }, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }

        try {
            const post = await Post.findById(postId);
            return populateReactions(post.reaction);
        } catch (err) {
            throw err;
        }
    },

    addReaction: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
        try {
            const post = await Post.findById(args.post);
            if (!args.hasReacted) {
                const reaction = new Reaction({
                    type: args.type,
                    post: args.post,
                    liker: req.userId,
                    date: new Date(args.date)
                });
                
                post.reaction.push(reaction);
                await post.save();

                const result = await reaction.save();
                return {
                    ...result._doc,
                    liker: user.bind(this, result._doc.liker),
                    post: singlePost.bind(this, result._doc.post)
                };
            } else {
                
                const result = await Reaction.findOneAndUpdate(
                    { _id: args.reactionId },
                    {
                        isDeleted: true,
                        expireAt: new Date(new Date().toISOString())
                    }
                );

                await Post.findOneAndUpdate(
                    { _id: args.post },
                    { $pull: { reaction: result._id } }
                );

                return {
                    ...result._doc,
                    liker: user.bind(this, result._doc.liker),
                    post: singlePost.bind(this, result._doc.post)
                };
            }
        } catch (err) {
            throw err;
        }
    }
};
