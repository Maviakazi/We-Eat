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

        res.render('menu/new', { restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function create(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        res.redirect(`/restaurants/${restaurant._id}`);
        console.log(restaurant);
        const newDish = {
            name: req.body.menu_name,
            category: req.body.menu_category,
            price: req.body.menu_price,
        };
        restaurant.menu.push(newDish);
        await restaurant.save();
    } catch (err) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

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

async function edit(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        const menuItem = restaurant.menu.id(req.params.menuItemId);
        res.render('menu/edit', { restaurant, menuItem });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function update(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        const menuItem = restaurant.menu.id(req.params.menuItemId);

        console.log(`menuItem is ${menuItem}`);
        console.log(`req.body.name is ${req.body.menu_name}`);

        menuItem.name = req.body.menu_name;
        menuItem.price = req.body.menu_price;

        await restaurant.save();
        res.redirect(`/restaurants/${req.params.restaurantId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
