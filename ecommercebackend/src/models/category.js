const mongoose = require('mongoose');

const category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
    },
    categoryImage: {
        type: String,
    },
    parentId: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
}, {timestamps: true });

module.exports = mongoose.model('Category', category);
