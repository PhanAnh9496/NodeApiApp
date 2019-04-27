const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');

exports.getPosts = (req, res) => {
    const post = Post.find()
        .select("_id title body")
        .then((posts) => {
            res.status(200).json({
                posts: posts
            })
        })
        .catch(err => console.log(err));
};

exports.createPost = (req, res, next) => {

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({
                error: "Ảnh không thể upload."
            });
        }

        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};