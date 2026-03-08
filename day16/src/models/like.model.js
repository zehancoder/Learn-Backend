const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, 'post id is required for like post']
    },
    user: {
        type: String,
        required: [true, 'username is required for like']
    }
}, {timestamps: true});
const likeModel = mongoose.model('likeModel', likeSchema);
likeSchema.index({post: 1, user: 1}, {unique: true});
module.exports = likeModel;