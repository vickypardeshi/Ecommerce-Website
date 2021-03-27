const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({
        email: req.body.email,
    })
    .exec((error, user) => {
        if(user) {
            return res.status(400).json({
                message: 'User already exist',
            });
        }

        const { 
            firstName, lastName, email, password 
        } = req.body;

        const _user = new User({
            firstName, lastName, 
            userName: Math.random().toString(),
            email, password,
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong',
                });
            }
            if(data){
                return res.status(201).json({
                    message: 'User created successfully...!',
                });
            }
        
        })
    });
}

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .exec((error, user) => {
        if(error){
            return res.status(400).json({ error });
        }
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECREAT, {expiresIn: '1h'});
                const { 
                    _id, firstName, lastName, email, role, fullName 
                } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                });
            }
            else{
                return res.status(400).json({
                    message: 'Invalid username/password',
                });
            }
        }
    });
}

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECREAT);
    req.user = user  //attach user in the request, so we can access user in next() 
    next();
}