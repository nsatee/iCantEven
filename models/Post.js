const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        headerTag: {
            type: String
        },
        body: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        commentTotal: {
            type: Number,
            default: 0
        },
        reaction: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reaction"
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comments"
            }
        ],
        isDeleted: { type: Boolean, required: true, default: false },
        expireAt: Date,
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

postSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 200 });

module.exports = mongoose.model("Post", postSchema);
