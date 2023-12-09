const Restaurant = require('../models/restaurant');

module.exports = {
    // create,
    update,
    delete: deleteItem,
};

async function deleteItem(req, res) {
    // console.log(`req.params.menuItemId is ${req.params.id}`);
    // console.log('req.params:', req.params);

    try {
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.restaurantId,
            { $pull: { menu: { _id: req.params.menuItemid } } },
            { new: true }
        );
        res.redirect(`/restaurants/${restaurant.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function update(req, res) {}
