const mongoose = require('mongoose');

const product = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    offer: {
        type: Number,
    },
    productPictures: [
        {
            img: {
                type: String,
            },
        }
    ],
    reviews: [
      {
          userId: {
              type: mongoose.Schema.Types.ObjectId, ref: 'User',
          },
          type: String
      }  
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    updatedBy: Date,

}, {timestamps: true });

module.exports = mongoose.model('Product', product);
