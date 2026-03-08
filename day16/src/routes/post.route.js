const express = require('express');
const multer = require('multer');
const postController = require('../controllers/post.controller');
const userIdentifyMiddleware = require('../middleware/auth.middleware');
const upload = multer({ storage: multer.memoryStorage() })
const postRouter = express.Router();
// create posts
postRouter.post('/', userIdentifyMiddleware,upload.single('image'), postController.postController);
// geeting user posts
postRouter.get('/',userIdentifyMiddleware, postController.getPostsController);
//geeting indevisuals post details
postRouter.get('/:postId',userIdentifyMiddleware, postController.postDetailController)
module.exports = postRouter 