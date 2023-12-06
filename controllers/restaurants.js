const Restaurant = require('../models/restaurant');

module.exports = {
    index,
    show,
    new: newRestaurant,
    create,
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
