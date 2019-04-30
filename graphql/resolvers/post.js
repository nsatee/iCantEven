const Post = require("../../models/Post");
const User = require("../../models/user");
const Comment = require("../../models/Comment");
const Reaction = require("../../models/Reaction");
const CommentFeeling = require("../../models/CommentFeeling");
const Hashtag = require("../../models/Hashtag");
const { user, postFormat, hashtagFormat } = require("./merge");

module.exports = {
    posts: async ({ uid }) => {
        function hasUid(uid) {
            if (uid) {
                return { creator: uid, isDeleted: false };
            }
            return { isDeleted: false };
        }
        try {
            const posts = await Post.find(hasUid(uid)).sort({ createdAt: -1 });
            return posts.map(post => {
                return postFormat(post);
            });
        } catch (err) {
            throw err;
        }
    },
    post: async args => {
        try {
            const post = await Post.findById(args.postId).sort({
                createdAt: -1
            });
            return postFormat(post);
        } catch (err) {
            throw err;
        }
    },

    createPost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
        const post = new Post({
            body: args.postInput.body,
            headerTag: args.postInput.headerTag,
            date: new Date(args.postInput.date),
            creator: req.userId
        });
        try {
            console.log(args.postInput.creator);
            const result = await post.save();
            const creator = await User.findById(req.userId);
            const hashtag = await Hashtag.findOne({
                searchTag: args.postInput.headerTag.toLowerCase()
            });
            console.log(hashtag);
            if (hashtag) {
                await Hashtag.findOneAndUpdate(
                    { searchTag: args.postInput.headerTag.toLowerCase() },
                    {
                        $inc: { total: 1 },
                        $addToSet: {
                            displayTag: args.postInput.headerTag,
                            post: result._id
                        }
                    }
                );
            } else {
                const hashtagData = new Hashtag({
                    total: 1,
                    displayTag: args.postInput.headerTag,
                    post: [result._id],
                    searchTag: args.postInput.headerTag.toLowerCase()
                });

                await hashtagData.save();
            }

            creator.createdPosts.push(post);
            await creator.save();
            return {
                ...result._doc,
                createdAt: new Date(post.createdAt).toISOString(),
                creator: user.bind(this, result.creator)
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    deletePost: async ({ postId }) => {
        try {
            const result = await Post.findOneAndUpdate(
                { _id: postId },
                {
                    isDeleted: true,
                    expireAt: new Date(new Date().toISOString())
                }
            );

            await User.findOneAndUpdate(
                { _id: result.creator },
                { $pull: { createdPosts: postId } }
            );

            await Hashtag.findOneAndUpdate(
                { searchTag: result.headerTag.toLowerCase() },
                {
                    $inc: { total: -1 },
                    $pull: {
                        post: postId
                    }
                }
            );

            await Comment.updateMany(
                { _id: { $in: result.comments } },
                {
                    isDeleted: true,
                    expireAt: new Date(new Date().toISOString())
                }
            );

            const comments = await Comment.find({
                _id: { $in: result.comments }
            });
            comments.map(async comment => {
                await CommentFeeling.updateMany(
                    { _id: { $in: comment.feelings } },
                    {
                        isDeleted: true,
                        expireAt: new Date(new Date().toISOString())
                    }
                );
            });
            await Reaction.updateMany(
                { _id: { $in: result.reaction } },
                {
                    isDeleted: true,
                    expireAt: new Date(new Date().toISOString())
                }
            );
            return { ...result._doc, isDeleted: true };
        } catch (err) {
            console.log(err);
        }
    },
    getHashtag: async () => {
        const hashtags = await Hashtag.find({})
            .limit(5)
            .sort({ total: 1 });
        
        return hashtags.map(hashtag => hashtagFormat(hashtag));
    },
    getPostsByHashtag: async ({ hashtag }) => {
        try {
            const posts = await Post.find({searchTag: hashtag});
            return posts.map(post => {
                return postFormat(post);
            });
        } catch (err) {
            throw err;
        }
    }
};
