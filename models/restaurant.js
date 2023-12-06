const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    starters: {
        type: [String],
    },
    maincourse: {
        type: [String],
        required: true,
    },
    dessert: {
        type: [String],
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
