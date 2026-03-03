const postModel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const imageKit = new ImageKit({
    privateKey: process.env.image_kit_private_key
});
// post making controller
async function postController(req, res) {

    const userToken = req.cookies.token;
    if (!userToken) {
        return res.status(401).json({
            message: "Token not provided"
        });
    }
    let decode;
    try {
        decode = jwt.verify(userToken, process.env.jwt_secrets);
    } catch (error) {
        return res.status(401).json({
            message: "user unauthorize access"
        })
    }
    const user = await userModel.findById(decode.id);
    console.log(user);

    const caption = req.body.caption;
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "test"
    });
    const post = await postModel.create({
        caption: caption,
        img_url: file.url,
        user: decode.id

    });
    res.status(201).json({
        message: "post create successfully",
        post,
        user
    })
}
// geeting user posts
async function getPostsController(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.jwt_secrets);
    } catch (error) {
        return res.status(401).json({
            message: "unauthorized user"
        });
    }
    const userId = decoded.id;
    const posts = await postModel.find({
        user: userId
    });
    res.status(200).json({
        message: "post fetch succcess",
        posts
    })
}
/// getting post details
async function postDetailController(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorize user"
        });
    }
    let decode;
    try {
        decode = jwt.verify(token, process.env.jwt_secrets);
    } catch (error) {
        return res.status(401).json({
            message: "Token not found"
        });
    }
    const userId = decode.id;
    let postId = req.params.postId;

    let postDetails;
    try {
        postDetails = await postModel.findById(postId);
    } catch (error) {
        return res.status(404).json({
            message: "this post not created"
        });
    }
    console.log(postDetails.user.toString(), userId);
    
    if (postDetails.user.toString() !== userId) {
        return res.status(403).json({
            message: 'you cannot view this post'
        })
    }
    res.status(200).json({
        message: "you can view this post",
        postDetails
    })

}
module.exports = { postController, getPostsController, postDetailController };    