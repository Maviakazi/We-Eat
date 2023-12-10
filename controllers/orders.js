const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const User = require('../models/order');

module.exports = {
    index,
    addToOrder,
    addToRestaurant,
    removeFromOrder,
    checkout,
};

async function checkout(req, res) {
    const userId = req.user._id;
    const user = req.user;

    res.render('orders/checkout');
}

async function index(req, res) {
    try {
        // console.log(`UserID is ${req.user._id}`);
        const userId = req.user._id;
        const user = req.user;
        let userOrder = [];
        userOrder = await Order.find({ user: userId });

        const restaurantId =
            userOrder.length > 0 ? userOrder[0].restaurant : null;

        const restaurant = await Restaurant.findById(restaurantId);
        console.log(`Restaurant is ${restaurant}`);
        res.render('orders/index', { userOrder, user, restaurant });
    } catch (error) {
        console.log(error);
        res.status(500).send('Login to retrieve order page');
    }
}

async function removeFromOrder(req, res) {
    try {
        const userId = req.user._id;
        const orderItemId = req.params.orderId;

        // Find and delete the order with the provided ID and associated with the user
        const result = await Order.deleteOne({
            _id: orderItemId,
            user: userId,
        });

        // Check the result to see if any documents were deleted
        if (result.deletedCount === 0) {
            // If no documents were deleted, the order was not found
            return res.status(404).send('Order not found');
        }

        // Redirect or respond as needed
        res.redirect('/order');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function addToOrder(req, res) {
    try {
        const restaurantId = req.params.restaurantId;
        const menuItemId = req.params.menuItemId;
        const userId = req.user._id;

        // Check if the user already has an order for a different restaurant
        const existingOrder = await Order.findOne({
            user: userId,
            restaurant: { $ne: restaurantId }, // Check if the restaurant is not the same
        });

        if (existingOrder) {
            return res
                .status(400)
                .send('Cannot order from multiple restaurants');
        }

        const restaurant = await Restaurant.findById(restaurantId);
        const menuItem = restaurant.menu.id(menuItemId);

        const newOrder = await Order.create({
            name: menuItem.name,
            price: +menuItem.price,
            user: userId,
            restaurant: restaurantId,
        });

        // Push the order ID to the restaurant's order array
        restaurant.order.push(newOrder._id);

        // Save the updated restaurant
        await restaurant.save();

        res.redirect(`/restaurants/${restaurantId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function addToRestaurant(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        restaurant.order.push(req.body.orderId);
        // await restaurant.save();
        res.redirect(`/restaurants/${restaurantId}`);
    } catch (error) {
        console.log(error);
    }
}
