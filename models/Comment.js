const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        body: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        feelings: [
            {
                type: Schema.Types.ObjectId,
                ref: "CommentFeeling",
                required: true
            }
        ],
        total: {
            type: Number,
            default: 0,
            set: function(total) {
                return this.prevName = this.name;
            }
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        expireAt: { type: Date }
    },
    { timestamps: true }
);

commentSchema.index({ expireAt: 1 }, { expireAfterSeconds: 1 });

module.exports = mongoose.model("Comment", commentSchema);
