var jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email}); 

    if (userExists) {
        res.status(403).json({
            error: "Email đã tồn tại"
        });
    }
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({message: "Đăng ký thành công! Mời bạn đăng nhập"});
};

exports.signin = (req, res) => {
    const {_id, name, email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "Email này chưa đăng kí tài khoản. Đăng nhập lại"
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email và Password không đúng"
            });
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        res.cookie("t", token, {expire: new Date() + 9999});

        const {_id, name, email} = user;

        return res.json({token, user: {_id, email, name}})
    });
};