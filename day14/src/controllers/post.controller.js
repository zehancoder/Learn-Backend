const postModel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const imageKit = new ImageKit({
    privateKey: process.env.image_kit_private_key
})
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
    const post =await postModel.create({
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
module.exports = { postController };    