const Post = require("../../models/Post");
const User = require("../../models/user");
const {user, postFormat} = require('./merge');

module.exports = {
    posts: async () => {
        try {
            const posts = await Post.find().sort({createdAt: -1});
            return posts.map(post => {
                return postFormat(post);
            })
            
        } catch (err) {
            throw err;
        }
    },
    post: async (args) => {
        try {
            const post = await Post.findById(args.postId).sort({createdAt: -1});
            return postFormat(post);
            
        } catch (err) {
            throw err;
        }
    },
    createPost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        console.log(req.userId);
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
