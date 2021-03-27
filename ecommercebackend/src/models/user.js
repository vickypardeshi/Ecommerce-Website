const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 25
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 25,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hashPassword: {
        type: String, 
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
}, {timestamps: true});

//add virtual field
user.virtual('password')
.set(function(password) {
    this.hashPassword = bcrypt.hashSync(password, 10);
});

user.virtual('fullName')
.get(function() {
    return `${this.firstName} ${this.lastName}`;
});


//create methods
user.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hashPassword);
    }
}


module.exports = mongoose.model('User', user); 