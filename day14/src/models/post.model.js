const mongoose =require('mongoose');
const postShema = new mongoose.Schema({
    caption: {
        type: String,
        required: [true, "caption is require for make a post"],
        default: ''
    },
    img_url: {
        type: String,
        required: [true, 'img is required for make a post']
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required for creating a post"]
    },
});
const postModel = mongoose.model('postmodel', postShema);
module.exports = postModel;
