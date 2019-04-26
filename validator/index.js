exports.createPostValidator = (req, res, next) => {

    //title
    req.check("title", "Nhập tiêu đề").notEmpty();
    req.check("title", "Tiêu đề từ 4 đến 150 ký tự").isLength({
        min: 4,
        max: 150
    });
    
    //body
    req.check("body", "Viết nội dung").notEmpty();
    req.check("body", "Nội từ 4 đến 2000 ký tự").isLength({
        min: 4,
        max: 2000
    });

    //check
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};

exports.userSignupValidator = (req, res, next) => {
    
    req.check("name", "Nhập tên người dùng").notEmpty();
    
    req.check("email", "Nhập địa chỉ email").matches(/.+\@.+\..+/)
        .withMessage("Email phải có dấu @")
        .isLength({
            min: 4,
            max: 600
        });

    req.check("password", "Nhập password").notEmpty();
    req.check("password", "Nhập password").isLength({min: 6,}).withMessage("Password phải lớn hơn 6 ký tự")
        .matches(/\d/).withMessage("Password có ký tự số");

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};