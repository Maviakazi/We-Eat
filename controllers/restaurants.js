const Restaurant = require('../models/restaurant');

const User = require('../models/user');
const axios = require('axios');

module.exports = {
    index,
    show,
    new: newRestaurant,
    create,
    delete: remove,
    edit,
    update,
};

async function calculateDeliveryTime(userAddress, restaurantAddress) {
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/distancematrix/json',
            {
                params: {
                    origins: userAddress,
                    destinations: restaurantAddress,
                    mode: 'driving',
                    key: 'AIzaSyB62IrY1Ntte3dBc-2XWzSBjD3sfKPucuw',
                },
            }
        );

        const distanceMatrix = response.data;
        if (distanceMatrix.status === 'OK') {
            const element = distanceMatrix.rows[0].elements[0];
            if (element.status === 'OK') {
                const durationText = element.duration.text;
                return durationText;
            } else {
                console.error(
                    'Error calculating delivery time:',
                    element.status
                );
            }
        } else {
            console.error(
                'Distance Matrix request failed:',
                distanceMatrix.status
            );
        }
    } catch (error) {
        console.error('Error calculating delivery time:', error.message);
    }
}

async function index(req, res) {
    const title = 'Restaurants';
    try {
        const userAddress =
            req.query.userAddress ||
            '45 Bunnett Street, Sunshine North VIC 3020';
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

        const deliveryTimesPromises = restaurants.map(async (restaurant) => {
            const deliveryTime = await calculateDeliveryTime(
                userAddress,
                restaurant.address
            );
            return deliveryTime;
        });

        const deliveryTimes = await Promise.all(deliveryTimesPromises);

        // Combine restaurant data with calculated delivery times
        const restaurantsWithDeliveryTimes = restaurants.map(
            (restaurant, index) => ({
                ...restaurant.toObject(),
                deliveryTime: deliveryTimes[index],
            })
        );
        // console.log(restaurantsWithDeliveryTimes);

        res.render('restaurants/index', {
            title,
            restaurants,
            menuItems,
            searchOptions: req.query,
            userAddress,
            restaurantsWithDeliveryTimes,
        });
    } catch (err) {
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId);
        const userAddress = '45 Bunnett Street, Sunshine North VIC 3020';
        const title = restaurant.name;
        // console.log(userAddress);
        res.render('restaurants/show', { title, restaurant, userAddress });
    } catch (err) {
        console.log(err);
    }
}

async function newRestaurant(req, res) {
    const title = 'Add New Restaurant';
    res.render('restaurants/new', { title, restaurant: new Restaurant() });
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
        const title = 'Edit Restaurant';
        res.render('restaurants/edit', { title, restaurant });
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
