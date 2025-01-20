const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            sucess: false,
            message: 'Something went wrong',
            data: {},
            err: 'Email or password missing in the request'
        })
    }
    next();
}

module.exports= {
    validateUserAuth
}