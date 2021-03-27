exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECREAT);
    req.user = user  //attach user in the request, so we can access user in next() 
    next();
}