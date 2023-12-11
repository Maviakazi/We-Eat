const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    image: {
        type: String,
        required: false,
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
    order: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    image: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
