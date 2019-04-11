const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    headerTag: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    reaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);


