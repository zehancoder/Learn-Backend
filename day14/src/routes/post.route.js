const express = require('express');
const multer = require('multer');
const postController = require('../controllers/post.controller');
const upload = multer({ storage: multer.memoryStorage() })
const postRouter = express.Router();
postRouter.post('/', upload.single('image'), postController.postController);

postRouter.get('/', postController.getPostsController);
//geeting indevisuals post details
postRouter.get('/:postId', postController.postDetailController)
module.exports = postRouter 