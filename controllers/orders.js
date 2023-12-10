const Restaurant = require('../models/restaurant');
const Order = require('../models/order');

module.exports = {
    index,
    addToOrder,
    addToRestaurant,
};

async function index(req, res) {
    try {
        console.log(req.user._id);
        const userId = req.user._id;
        const user = req.user;
        const userOrder = await Order.find({ userId });
        console.log(userOrder);
        res.render('orders/index', { userOrder, user });
    } catch (error) {
        console.log(error);
    }
}

async function addToOrder(req, res) {
    try {
        const restaurantId = req.params.restaurantId;
        const menuItemId = req.params.menuItemId;
        console.log(`menuItemId is ${req.params.menuItemId}`);
        const restaurant = await Restaurant.findById(restaurantId);
        const menuItem = restaurant.menu.id(menuItemId);
        const userId = req.user._id;

        console.log(`menuItem is ${menuItem}`);

        const newOrder = await Order.create({
            name: menuItem.name,
            price: +menuItem.price,
            user: userId,
        });
        console.log(`neworderId is ${newOrder._id}`);
        // Push the order ID to the restaurant's order array
        restaurant.order.push(newOrder);

        // Save the updated restaurant
        await restaurant.save();
        console.log(`restaurant.order is ${restaurant.order}`);
        // restaurant.order.push(req.body.orderId);

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
