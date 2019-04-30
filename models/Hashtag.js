const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hastagSchema = new Schema(
    {
        total: {
            type: Number,
            default: 0,
            required: true
        },
        displayTag: [{ 
            type: String, 
            required: true 
        }],
        post: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        searchTag: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("hastagSchema", hastagSchema);
