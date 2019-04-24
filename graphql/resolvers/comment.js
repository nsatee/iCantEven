const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const CommentFeeling = require("../../models/CommentFeeling");
const { user, singlePost, commentFormat } = require("./merge");

module.exports = {
    comments: async ({ postId, first = null, skip = null }) => {
        const comments = await Comment.find({ post: postId })
            .skip(skip)
            .limit(first)
            .exec();
        return comments.map(comment => {
            return commentFormat(comment);
        });
    },

    comment: async ({ id }) => {
        const comment = await Comment.findById(id);
        console.log(comment);
        return commentFormat(comment);
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
            await post.commentTotal++;
            await post.save();
            return commentFormat(comment);
        } catch (err) {
            console.log(err);
        }
    },

    addCommentFeeling: async (args, req) => {
        const feeling = new CommentFeeling({
            comment: args.comment,
            creator: req.userId,
            isDeleted: args.isDeleted
        });

        try {
            if (!args.isDeleted) {
                const result = await feeling.save();
                const comment = await Comment.findById(result.comment);
                comment.feelings.push(result._id);
                await comment.save();

                return {
                    ...result._doc,
                    createdAt: new Date(result._doc.createdAt).toISOString(),
                    creator: user.bind(this, result._doc.creator),
                };
            } else {
                const result = await CommentFeeling.findOneAndUpdate(
                    { _id: args.feelingId },
                    {
                        isDeleted: true,
                        expireAt: new Date(new Date().toISOString())
                    }
                );

                console.log(result);

                await Comment.findOneAndUpdate(
                    { _id: args.comment },
                    { $pull: { feelings: args.feelingId } }
                );

                return {
                    ...result._doc,
                    createdAt: new Date(result._doc.createdAt).toISOString(),
                    creator: user.bind(this, result._doc.creator),
                };
            }
        } catch (err) {
            console.log(err);
        }
    }
};
