const Restaurant = require('../models/restaurant');

module.exports = {
    edit,
    update,
    delete: deleteItem,
    new: newDish,
    create,
};

async function newDish(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        const title = 'Add Dish';
        res.render('menu/new', { title, restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function create(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        res.redirect(`/restaurants/${restaurant._id}`);
        const newDish = {
            name: req.body.menu_name,
            category: req.body.menu_category,
            price: req.body.menu_price,
            image: req.body.menu_image,
        };
        restaurant.menu.push(newDish);
        await restaurant.save();
    } catch (err) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteItem(req, res) {
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

async function edit(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        const menuItem = restaurant.menu.id(req.params.menuItemId);
        const title = 'Edit Dish';
        res.render('menu/edit', { title, restaurant, menuItem });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function update(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        const menuItem = restaurant.menu.id(req.params.menuItemId);
        menuItem.name = req.body.menu_name;
        menuItem.price = req.body.menu_price;
        menuItem.image = req.body.menu_image;

        await restaurant.save();
        res.redirect(`/restaurants/${req.params.restaurantId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
