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
        let restaurants = [];
        let menuItems = [];

        // Fetch all restaurants when no search query is provided
        if (!req.query.name || req.query.name.trim() === '') {
            restaurants = await Restaurant.find();
        } else {
            // Search for restaurants
            restaurants = await Restaurant.find({
                name: { $regex: new RegExp(req.query.name, 'i') },
            });

            // Search for menu items
            menuItems = await Restaurant.aggregate([
                {
                    $unwind: '$menu',
                },
                {
                    $match: {
                        'menu.name': {
                            $regex: new RegExp(req.query.name, 'i'),
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        restaurantId: '$_id',
                        restaurantName: '$name',
                        restaurantAddress: '$address',
                        menuItem: '$menu',
                    },
                },
            ]);
        }

        res.render('restaurants/index', {
            restaurants,
            menuItems,
            searchOptions: req.query,
        });
    } catch (err) {
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId);
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
        // console.log(`req.body.name is ${req.body.name}`);
        // console.log(`req.body.menu_name is ${req.body.menu_name}`);

        const restaurantData = {
            name: req.body.name,
            address: req.body.address,
            image: req.body.image,
            menu: req.body.menu_name.map((name, index) => ({
                name,
                price: req.body.menu_price[index],
                category: req.body.menu_category[index],
                image: req.body.menu_image[index],
            })),
        };

        const newRestaurant = await Restaurant.create(restaurantData);
        res.redirect(`/restaurants/${newRestaurant._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function remove(req, res) {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        res.redirect(`/restaurants`);
    } catch (err) {
        console.log(err);
    }
}

async function edit(req, res) {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findById(id);
        // console.log(restaurant);

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
        restaurant.image = req.body.image;

        req.body.menu_name.forEach((menuItem, index) => {
            restaurant.menu[index].name = req.body.menu_name[index];
            restaurant.menu[index].price = req.body.menu_price[index];
            restaurant.menu[index].image = req.body.menu_image[index];
        });

        await restaurant.save();
        res.redirect(`/restaurants/${restaurant.id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}
