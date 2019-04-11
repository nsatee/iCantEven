const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const { user, singlePost } = require("./merge");

module.exports = {
    comments: async ({ postId }) => {
        const comments = await Comment.find({ post: postId });
        console.log(comments);
        return comments.map(comment => {
            console.log(comment._id);
            return {
                ...comment._doc,
                createdAt: new Date(comment._doc.createdAt).toISOString(),
                creator: user.bind(this, comment._doc.creator),
                post: singlePost.bind(this, comment._doc.post)
            };
        });
    },

    addComment: async (args, req) => {
        const comment = new Comment({
            creator: req.userId,
            post: args.commentInput.post,
            isDeleted: args.commentInput.isDeleted,
            body: args.commentInput.body
        });
        const post = await Post.findById(args.commentInput.post);
        try {
            const result = await comment.save();
            await post.comments.push(result._id);
            await post.save();
            return {
                ...result._doc,
                creator: user.bind(this, result._doc.creator),
                post: singlePost.bind(this, result._doc.post)
            };
        } catch (err) {
            console.log(err);
        }
    }
};
