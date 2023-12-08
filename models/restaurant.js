const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['starters', 'maincourse', 'dessert', 'uncategorized'],
        required: false,
        default: 'uncategorized',
    },
    price: {
        type: Number,
        required: true,
    },
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    menu: [menuSchema],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
