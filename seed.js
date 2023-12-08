require('dotenv').config();
require('./config/database');
const Restaurant = require('./models/restaurant');

const restaurantData = [
    {
        name: 'Culinary Delight',
        address: '123 Main Street, Cityville',
        menu: [
            { name: 'Bruschetta', category: 'starters', price: 8 },
            { name: 'Shrimp Cocktail', category: 'starters', price: 12 },
            { name: 'Caprese Salad', category: 'starters', price: 10 },
            {
                name: 'Chicken Alfredo',
                category: 'maincourse',
                price: 18,
            },
            {
                name: 'Grilled Salmon',
                category: 'maincourse',
                price: 22,
            },
            {
                name: 'Vegetable Lasagna',
                category: 'maincourse',
                price: 16,
            },
            {
                name: 'Chicken Curry',
                category: 'maincourse',
                price: 15,
            },
            { name: 'Beef Biryani', category: 'maincourse', price: 18 },
            {
                name: 'Eggplant Masala',
                category: 'maincourse',
                price: 12,
            },
            { name: 'Tiramisu', category: 'dessert', price: 9 },
            {
                name: 'Chocolate Fondue',
                category: 'dessert',
                price: 12,
            },
            {
                name: 'New York Cheesecake',
                category: 'dessert',
                price: 10,
            },
        ],
    },
    // {
    //     name: 'Spice Avenue',
    //     address: '456 Oak Street, Townsville',
    //     menu: [
    //         {
    //             dishes: [
    //                 { name: 'Samosa', category: 'starters', price: 6 },
    //                 { name: 'Paneer Tikka', category: 'starters', price: 10 },
    //                 {
    //                     name: 'Vegetable Spring Rolls',
    //                     category: 'starters',
    //                     price: 8,
    //                 },
    //             ],
    //         },
    //         {
    //             dishes: [],
    //         },
    //         {
    //             dishes: [
    //                 { name: 'Gulab Jamun', category: 'dessert', price: 7 },
    //                 { name: 'Rasmalai', category: 'dessert', price: 9 },
    //                 { name: 'Mango Kulfi', category: 'dessert', price: 8 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     name: 'Mediterranean Delight',
    //     address: '789 Pine Avenue, Seaside',
    //     menu: {
    //         starters: [
    //             { dish: 'Hummus with Pita Bread', price: 8 },
    //             { dish: 'Spanakopita', price: 12 },
    //             { dish: 'Bruschetta', price: 10 },
    //         ],
    //         maincourse: [
    //             { dish: 'Greek Salad', price: 14 },
    //             { dish: 'Chicken Souvlaki', price: 16 },
    //             { dish: 'Seafood Paella', price: 20 },
    //         ],
    //         dessert: [
    //             { dish: 'Baklava', price: 7 },
    //             { dish: 'Tiramisu', price: 9 },
    //             { dish: 'Lemon Sorbet', price: 6 },
    //         ],
    //     },
    // },
    // {
    //     name: 'Sushi Haven',
    //     address: '101 Sakura Street, Zen City',
    //     menu: {
    //         starters: [
    //             { dish: 'Edamame', price: 6 },
    //             { dish: 'Agedashi Tofu', price: 8 },
    //             { dish: 'Spicy Tuna Roll', price: 12 },
    //         ],
    //         maincourse: [
    //             { dish: 'Sashimi Platter', price: 18 },
    //             { dish: 'Dragon Roll', price: 16 },
    //             { dish: 'Vegetarian Udon', price: 14 },
    //         ],
    //         dessert: [
    //             { dish: 'Green Tea Ice Cream', price: 5 },
    //             { dish: 'Mochi', price: 7 },
    //             { dish: 'Red Bean Dorayaki', price: 8 },
    //         ],
    //     },
    // },
    // {
    //     name: 'Burger Bistro',
    //     address: '789 Patty Parkway, Sizzleburg',
    //     menu: {
    //         starters: [
    //             { dish: 'Cheese Fries', price: 8 },
    //             { dish: 'Mozzarella Sticks', price: 10 },
    //             { dish: 'Onion Rings', price: 7 },
    //         ],
    //         maincourse: [
    //             { dish: 'Classic Burger', price: 12 },
    //             { dish: 'BBQ Bacon Burger', price: 14 },
    //             { dish: 'Veggie Burger', price: 11 },
    //         ],
    //         dessert: [
    //             { dish: 'Chocolate Shake', price: 6 },
    //             { dish: 'Apple Pie', price: 8 },
    //             { dish: 'Brownie Sundae', price: 9 },
    //         ],
    //     },
    // },
    // {
    //     name: 'Sushi Delight',
    //     address: '101 Sashimi Street, Nori City',
    //     menu: {
    //         starters: [
    //             { dish: 'Edamame', price: 5 },
    //             { dish: 'Spicy Tuna Roll', price: 12 },
    //             { dish: 'Miso Soup', price: 6 },
    //         ],
    //         maincourse: [
    //             { dish: 'Sashimi Platter', price: 18 },
    //             { dish: 'Dragon Roll', price: 15 },
    //             { dish: 'Vegetarian Sushi', price: 14 },
    //         ],
    //         dessert: [
    //             { dish: 'Green Tea Ice Cream', price: 7 },
    //             { dish: 'Mochi', price: 8 },
    //             { dish: 'Red Bean Cake', price: 6 },
    //         ],
    //     },
    // },

    // {
    //     name: 'Taco Haven',
    //     address: '202 Queso Blvd, Guacamole Town',
    //     menu: {
    //         starters: [
    //             { dish: 'Guacamole & Chips', price: 8 },
    //             { dish: 'Queso Fundido', price: 10 },
    //             { dish: 'Nachos Supreme', price: 12 },
    //         ],
    //         maincourse: [
    //             { dish: 'Chicken Tacos', price: 14 },
    //             { dish: 'Beef Burrito', price: 16 },
    //             { dish: 'Vegetarian Enchiladas', price: 13 },
    //         ],
    //         dessert: [
    //             { dish: 'Churros', price: 6 },
    //             { dish: 'Tres Leches Cake', price: 9 },
    //             { dish: 'Flan', price: 7 },
    //         ],
    //     },
    // },
    // {
    //     name: 'Pasta Paradise',
    //     address: '303 Alfredo Avenue, Marinara City',
    //     menu: {
    //         starters: [
    //             { dish: 'Bruschetta', price: 9 },
    //             { dish: 'Caprese Salad', price: 11 },
    //             { dish: 'Stuffed Mushrooms', price: 10 },
    //         ],
    //         maincourse: [
    //             { dish: 'Spaghetti Bolognese', price: 15 },
    //             { dish: 'Chicken Alfredo', price: 18 },
    //             { dish: 'Vegetarian Lasagna', price: 14 },
    //         ],
    //         dessert: [
    //             { dish: 'Tiramisu', price: 8 },
    //             { dish: 'Cannoli', price: 7 },
    //             { dish: 'Panna Cotta', price: 6 },
    //         ],
    //     },
    // },

    // {
    //     name: 'BBQ Junction',
    //     address: '404 Grill Street, Smokeville',
    //     menu: {
    //         starters: [
    //             { dish: 'Smoked Wings', price: 12 },
    //             { dish: 'Pulled Pork Sliders', price: 14 },
    //             { dish: 'Jalapeno Poppers', price: 10 },
    //         ],
    //         maincourse: [
    //             { dish: 'Brisket Platter', price: 20 },
    //             { dish: 'Baby Back Ribs', price: 18 },
    //             { dish: 'Grilled Sausages', price: 16 },
    //         ],
    //         dessert: [
    //             { dish: 'Peach Cobbler', price: 8 },
    //             { dish: 'Banana Pudding', price: 7 },
    //             { dish: 'Key Lime Pie', price: 6 },
    //         ],
    //     },
    // },

    // {
    //     name: 'Mediterranean Delight',
    //     address: '505 Olive Street, Gyro Town',
    //     menu: {
    //         starters: [
    //             { dish: 'Hummus & Pita', price: 8 },
    //             { dish: 'Greek Salad', price: 10 },
    //             { dish: 'Spanakopita', price: 12 },
    //         ],
    //         maincourse: [
    //             { dish: 'Chicken Souvlaki', price: 16 },
    //             { dish: 'Moussaka', price: 18 },
    //             { dish: 'Vegetarian Falafel Wrap', price: 14 },
    //         ],
    //         dessert: [
    //             { dish: 'Baklava', price: 7 },
    //             { dish: 'Rice Pudding', price: 6 },
    //             { dish: 'Turkish Delight', price: 5 },
    // ],
    // },
    // },
];

async function seedData() {
    try {
        // Delete existing data
        await Restaurant.deleteMany();

        // Create new restaurants
        const createdRestaurants = await Restaurant.create(restaurantData);

        console.log('Successfully seeded restaurant data:');
        console.log(createdRestaurants);
        console.log(JSON.stringify(createdRestaurants, null, 2));
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Ensure a clean exit
        process.exit();
    }
}

seedData();
