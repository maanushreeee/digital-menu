const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['coffee', 'bakery', 'flowers', 'combos', 'gifting']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);