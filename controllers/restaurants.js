const Restaurant = require('../models/restaurant');

const { findByIdAndDelete } = require('../models/user');

module.exports = {
    index,
    show,
    new: newRestaurant,
    create,
    delete: remove,
    edit,
    update,
};

async function index(req, res) {
    try {
        const restaurants = await Restaurant.find();
        res.render('restaurants/index', { restaurants });
    } catch (err) {
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId);
        console.log(restaurant);
        res.render('restaurants/show', { restaurant });
    } catch (err) {
        console.log(err);
    }
}

async function newRestaurant(req, res) {
    res.render('restaurants/new', { restaurant: new Restaurant() });
}

async function create(req, res) {
    try {
        const restaurantData = {
            name: req.body.name,
            address: req.body.address,
            menu: {
                starters: req.body['menu.starters']
                    .split(',')
                    .map((item) => item.trim()),
                maincourse: req.body['menu.maincourse']
                    .split(',')
                    .map((item) => item.trim()),
                dessert: req.body['menu.dessert']
                    .split(',')
                    .map((item) => item.trim()),
            },
        };

        const newRestaurant = await Restaurant.create(restaurantData);

        // Redirect or respond as needed
        res.redirect(`/restaurants/${newRestaurant._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function remove(req, res) {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        // await Menu.deleteOne({ _id: restaurant.menu._id });
        // res.redirect('/restaurants');
    } catch (err) {
        console.log(err);
    }
}

async function edit(req, res) {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findById(id);

        res.render('restaurants/edit', { restaurant });
    } catch (err) {
        console.log(err);
    }
}

async function update(req, res) {
    const id = req.params.id;
    try {
        const restaurant = await Restaurant.findById(id);

        restaurant.name = req.body.name;
        restaurant.address = req.body.address;

        await restaurant.save();
        res.redirect(`${restaurant.id}`);
    } catch (err) {
        console.log(err);
    }
}
