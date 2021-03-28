const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECREAT);
        req.user = user  //attach user in the request, so we can access user in next() 
        next();
    }
    else{
        return res.status(400).json({
            message: 'Authorization required',
        });
    }
    
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({
            message: 'User access Denied',
        });
    }
    next();
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message: 'Admin access Denied',
        });
    }
    next();
}