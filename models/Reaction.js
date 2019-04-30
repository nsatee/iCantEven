const mongoose = require("mongoose");
const Schema = mongoose.Schema;
delete mongoose.connection.models['Reaction'];
const reactionSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        liker: {
            type: Schema.Types.ObjectId,
            ref: "User",
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

reactionSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 1 });

module.exports = mongoose.model('Reaction', reactionSchema);
