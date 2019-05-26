const express = require('express');
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment
} = require('../controllers/post');

const {
    requireSignin
} = require('../controllers/auth');

const {
    userById
} = require('../controllers/user');

const {
    createPostValidator
} = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

//Like Unlike
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);
// comments
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment)

router.get("/post/:postId", singlePost);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);


//Image Post
router.get("/post/photo/:postId", photo);

router.param('userId', userById);

router.param('postId', postById);

module.exports = router;