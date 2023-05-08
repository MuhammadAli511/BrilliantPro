const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    customer: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    price : {
        type: Number,
        required: true,
        default: 0
    },
});

module.exports = mongoose.model('Cart', cartSchema);
