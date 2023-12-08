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
        // console.log(restaurant);
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
            menu: req.body.menu.map((item) => ({
                category: item.category,
                dishes: [item.dishes],
                price: item.price,
            })),
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

        //console.log(`req.body.menu is ${req.body.menu}`);

        req.body.menu_name.forEach((menuItem, index) => {
            //restaurant.menu[index].name = req.body.menuItem;
            // console.log(index);
            //console.log(`${index} is ${req.body.price[index]}`);
            restaurant.menu[index].name = req.body.menu_name[index];
            restaurant.menu[index].price = req.body.menu_price[index];

            // console.log(restaurant.menu[index].name);
        });

        await restaurant.save();
        res.redirect(`${restaurant.id}`);
    } catch (err) {
        console.log(err);
    }
}

//         const restaurant = await Restaurant.findById(id);

//         // Convert menuData string to array
//         const menuDataArray = req.body.menu;
//         // const menuDataArray = menuDataString.split(',');
//         console.log(typeof menuDataArray);
//         console.log(`menuDataArray is ${menuDataArray}`);

//         // Clear existing menu
//         restaurant.menu = [];

//         let currentCategory = null;

//         // Iterate through menuDataArray and update the restaurant's menu
//         menuDataArray.forEach((data, index) => {
//             // Check if it's a dish name
//             if (index % 3 === 0) {
//                 currentCategory.dishes.push({
//                     name: data,
//                     price: parseFloat(menuDataArray[index + 1]) || 0,
//                     category: menuDataArray[index + 2],
//                 });
//             } else {
//                 // It's a category
//                 currentCategory = {
//                     category: data,
//                     dishes: [],
//                 };
//                 restaurant.menu.push(currentCategory);
//             }
//         });

//         await restaurant.save();
//         res.redirect(`${restaurant.id}`);
//     } catch (err) {
//         console.log(err);
//         // Handle errors and send an appropriate response
//         res.status(500).send('Internal Server Error');
//     }
// }

//  console.log(`req.body is ${req.body}`);
//  console.log(`menuData is ${menuData}`);
