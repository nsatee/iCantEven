const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentFeelingSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        expireAt: { type: Date }
    },
    { timestamps: true }
);

// commentFeelingSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 1 });

module.exports = mongoose.model("CommentFeeling", commentFeelingSchema);
