const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    follower: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}); 

module.exports = (mongoose.models && mongoose.models.User
    ? mongoose.models.User
    : mongoose.model('User', userSchema));


