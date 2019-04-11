const DataLoader = require("dataloader");

const Post = require("../../models/Post");
const User = require("../../models/user");
const {user, posts, populateReactions} = require('./merge');

module.exports = {
    posts: async () => {
        try {
            const posts = await Post.find();
            return posts.map(post => {
                return {
                    ...post._doc,
                    createdAt: new Date(post.createdAt).toISOString(),
                    creator: user.bind(this, post.creator),
                    reaction: populateReactions.bind(this, post.reaction)
                }
            })
            
        } catch (err) {
            throw err;
        }
    },
    createPost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const post = new Post({
            body: args.postInput.body,
            headerTag: args.postInput.headerTag,
            date: new Date(args.postInput.date),
            creator: req.userId
        });
        try {
            const result = await post.save();
            const creator = await User.findById(req.userId);

            if (!creator) {
                throw new Error("User not found");
            }
            
            creator.createdPosts.push(post);
            await creator.save();
            console.log(result)
            return {
                ...result._doc,
                createdAt: new Date(post.createdAt).toISOString(),
                creator: user.bind(this, result.creator)
            };

        } catch (err) {
            throw err;
        }
    }
};
